import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PublicProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, avatar_url, status")
    .ilike("username", username)
    .eq("status", "published")
    .single();

  if (!profile) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("id, title, url")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <main className="public-profile">
      <section className="public-profile-card">
        {profile.avatar_url ? <img className="profile-avatar" src={profile.avatar_url} alt="" /> : <div className="profile-avatar profile-avatar-placeholder">{(profile.display_name || profile.username).charAt(0).toUpperCase()}</div>}
        <h1>{profile.display_name || `@${profile.username}`}</h1>
        {profile.display_name && <p className="public-username">@{profile.username}</p>}
        {profile.bio && <p className="public-bio">{profile.bio}</p>}
        <div className="public-links">
          {(links ?? []).map((link) => <a className="public-link" href={link.url} key={link.id} target="_blank" rel="noreferrer">{link.title}</a>)}
        </div>
        <footer className="veya-mark">Veya</footer>
      </section>
    </main>
  );
}
