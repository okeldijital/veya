export default function Home() {
  return (
    <main className="landing">
      <section className="card">
        <p className="eyebrow">VEYА</p>
        <h1>A simple home for everything you want people to find.</h1>
        <p className="copy">Veya is being built as a lightweight, user-friendly link-in-bio platform.</p>
        <div className="actions">
          <a className="button primary" href="/login">Log in</a>
          <a className="button secondary" href="/signup">Create your Veya</a>
        </div>
      </section>
    </main>
  );
}
