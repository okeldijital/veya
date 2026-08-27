import Link from "next/link";

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
        <form className="form" action="#">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Your password" required />
          <button className="button primary" type="submit">Log in</button>
        </form>
        <p className="form-footer">Don&apos;t have an account? <Link href="/signup">Create your Veya</Link></p>
      </section>
    </main>
  );
}
