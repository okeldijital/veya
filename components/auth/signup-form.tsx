"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignupForm() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const displayName = String(form.get("name") ?? "").trim();
    const username = String(form.get("username") ?? "").trim().toLowerCase();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username, display_name: displayName } },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Check your email to confirm your account, then log in.");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Display name</label>
      <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name or brand" required />
      <label htmlFor="username">Username</label>
      <div className="username-field">
        <span aria-hidden="true">@</span>
        <input id="username" name="username" type="text" autoComplete="username" placeholder="yourname" minLength={3} maxLength={30} pattern="[A-Za-z0-9_-]+" required />
      </div>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" minLength={8} required />
      {error && <p className="form-message error" role="alert">{error}</p>}
      {message && <p className="form-message success" role="status">{message}</p>}
      <button className="button primary" type="submit" disabled={loading}>{loading ? "Creating account…" : "Create account"}</button>
    </form>
  );
}
