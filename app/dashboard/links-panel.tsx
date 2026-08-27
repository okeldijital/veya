"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type LinkItem = { id: string; title: string; url: string; is_active: boolean; position: number };

export function LinksPanel({ profileId, initialLinks }: { profileId: string; initialLinks: LinkItem[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function addLink(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !/^https?:\/\//i.test(url.trim())) return;
    setSaving(true); setMessage(null);
    const supabase = createClient();
    const nextPosition = links.length ? Math.max(...links.map((link) => link.position)) + 1 : 0;
    const { data, error } = await supabase.from("links").insert({ profile_id: profileId, title: title.trim(), url: url.trim(), position: nextPosition }).select("id, title, url, is_active, position").single();
    if (error) setMessage(error.message);
    else if (data) { setLinks([...links, data]); setTitle(""); setUrl(""); setMessage("Link added."); }
    setSaving(false);
  }

  async function toggleLink(link: LinkItem) {
    const supabase = createClient();
    const { error } = await supabase.from("links").update({ is_active: !link.is_active }).eq("id", link.id);
    if (!error) setLinks(links.map((item) => item.id === link.id ? { ...item, is_active: !item.is_active } : item));
  }

  async function deleteLink(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from("links").delete().eq("id", id);
    if (!error) setLinks(links.filter((link) => link.id !== id));
  }

  return <section className="links-panel">
    <div><p className="eyebrow">Links</p><h2>Your links</h2></div>
    <form className="link-add-form" onSubmit={addLink}>
      <input aria-label="Link title" placeholder="Link title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} required />
      <input aria-label="Link URL" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} type="url" required />
      <button className="button primary" disabled={saving}>{saving ? "Adding…" : "Add link"}</button>
    </form>
    <div className="link-list">{links.map((link) => <article className="link-row" key={link.id}>
      <div><strong>{link.title}</strong><span>{link.url}</span></div>
      <div className="link-actions"><button type="button" onClick={() => toggleLink(link)}>{link.is_active ? "Disable" : "Enable"}</button><button type="button" onClick={() => deleteLink(link.id)}>Delete</button></div>
    </article>)}</div>
    {message && <p className="form-message">{message}</p>}
  </section>;
}
