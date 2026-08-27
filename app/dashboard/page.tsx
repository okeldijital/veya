import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";
import { LinksSection } from "./links-section";
import { PublishControl } from "./publish-control";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("username, display_name, bio, status").eq("id", user.id).single();
  if (!profile) redirect("/signup");

  return <main className="dashboard-shell">
    <section className="dashboard-card">
      <p className="eyebrow">Your Veya</p><h1>Profile</h1><p className="copy">Keep your public identity up to date.</p>
      <ProfileForm userId={user.id} username={profile.username} displayName={profile.display_name} bio={profile.bio} />
      <div className="profile-summary"><strong>@{profile.username}</strong><span>{profile.status}</span></div>
      <PublishControl profileId={user.id} username={profile.username} initialStatus={profile.status} />
    </section>
    <section className="dashboard-card links-card"><LinksSection profileId={user.id} /></section>
  </main>;
}
