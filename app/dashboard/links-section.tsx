import { createClient } from "@/lib/supabase/server";
import { LinksPanel } from "./links-panel";

export async function LinksSection({ profileId }: { profileId: string }) {
  const supabase = await createClient();
  const { data: links } = await supabase
    .from("links")
    .select("id, title, url, is_active, position")
    .eq("profile_id", profileId)
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  return <LinksPanel profileId={profileId} initialLinks={links ?? []} />;
}
