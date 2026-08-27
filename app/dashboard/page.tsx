import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio, status")
    .eq("id", user.id)
    .single();

  return (
    <main className="dashboard-shell">
      <section className="dashboard-card">
        <p className="eyebrow">Your Veya</p>
        <h1>Welcome{profile?.display_name ? `, ${profile.display_name}` : ""}.</h1>
        <p className="copy">Your account is connected. Profile editing and links are the next V1 layer.</p>
        {profile && (
          <div className="profile-summary">
            <strong>@{profile.username}</strong>
            <span>{profile.status}</span>
          </div>
        )}
      </section>
    </main>
  );
}
