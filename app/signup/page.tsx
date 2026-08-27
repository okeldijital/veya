import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="signup-title">
        <Link className="brand-mark" href="/">Veya</Link>
        <div className="auth-heading">
          <p className="eyebrow">Start simply</p>
          <h1 id="signup-title">Create your Veya</h1>
          <p className="copy">Set up your page, add your links and share one simple URL.</p>
        </div>
        <SignupForm />
        <p className="form-footer">Already have an account? <Link href="/login">Log in</Link></p>
      </section>
    </main>
  );
}
