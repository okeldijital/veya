"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ProfileFormProps = {
  userId: string;
  username: string;
  displayName: string;
  bio: string;
};

export function ProfileForm({ userId, username, displayName, bio }: ProfileFormProps) {
  const [form, setForm] = useState({ username, displayName, bio });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        username: form.username.trim().toLowerCase(),
        display_name: form.displayName.trim(),
        bio: form.bio.trim(),
      })
      .eq("id", userId);

    if (error) {
      setMessage(error.code === "23505" ? "That username is already taken." : error.message);
    } else {
      setForm((current) => ({ ...current, username: current.username.trim().toLowerCase() }));
      setMessage("Profile saved.");
    }

    setSaving(false);
  }

  return (
    <form className="profile-form" onSubmit={saveProfile}>
      <label>
        Username
        <div className="username-field">
          <span>@</span>
          <input
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "") })}
            minLength={3}
            maxLength={30}
            required
          />
        </div>
      </label>
      <label>
        Display name
        <input value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} maxLength={80} />
      </label>
      <label>
        Bio
        <textarea value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} maxLength={160} rows={4} />
      </label>
      <button className="button primary" type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save profile"}
      </button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}
