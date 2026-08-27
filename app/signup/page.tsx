import Link from "next/link";

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
        <form className="form" action="#">
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
          <button className="button primary" type="submit">Create account</button>
        </form>
        <p className="form-footer">Already have an account? <Link href="/login">Log in</Link></p>
      </section>
    </main>
  );
}
