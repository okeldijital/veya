import type { Metadata } from "next";
import { StatusNotice } from "@/components/ui/status-notice";

export const metadata: Metadata = {
  title: "StatusNotice acceptance test | Veya",
  robots: { index: false, follow: false },
};

export default function StatusNoticeAcceptancePage() {
  return (
    <main className="dashboard-shell">
      <section className="dashboard-card" aria-labelledby="status-notice-heading">
        <h1 id="status-notice-heading" style={{ fontSize: 32 }}>StatusNotice</h1>
        <p className="copy">All four variants of the StatusNotice component.</p>
        <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
          <StatusNotice variant="info">Your profile changes are saved as a draft.</StatusNotice>
          <StatusNotice variant="success" title="Published">Your Veya page is now live.</StatusNotice>
          <StatusNotice variant="warning">Your session will expire in 5 minutes.</StatusNotice>
          <StatusNotice variant="error" title="Could not save">Please check your connection and try again.</StatusNotice>
        </div>
      </section>
    </main>
  );
}
