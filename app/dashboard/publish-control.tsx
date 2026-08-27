"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function PublishControl({ profileId, username, initialStatus }: { profileId: string; username: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const published = status === "published";

  async function togglePublish() {
    setSaving(true); setMessage(null);
    const nextStatus = published ? "unpublished" : "published";
    const supabase = createClient();
    const { error } = await supabase.from("profiles").update({ status: nextStatus }).eq("id", profileId);
    if (error) setMessage(error.message);
    else { setStatus(nextStatus); setMessage(nextStatus === "published" ? "Your Veya page is live." : "Your Veya page is now unpublished."); }
    setSaving(false);
  }

  return <div className="publish-control">
    <div><strong>{published ? "Published" : "Not published"}</strong><span>{published ? `veya profile: /${username}` : "Your page is private until you publish it."}</span></div>
    <button className="button primary" type="button" onClick={togglePublish} disabled={saving}>{saving ? "Saving…" : published ? "Unpublish" : "Publish"}</button>
    {message && <p className="form-message">{message}</p>}
  </div>;
}
