import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="login-title">
        <Link className="brand-mark" href="/">Veya</Link>
        <div className="auth-heading">
          <p className="eyebrow">Welcome back</p>
          <h1 id="login-title">Log in to Veya</h1>
          <p className="copy">Manage your profile, links and appearance from one simple place.</p>
        </div>
        <LoginForm />
        <p className="form-footer">Don&apos;t have an account? <Link href="/signup">Create your Veya</Link></p>
      </section>
    </main>
  );
}
