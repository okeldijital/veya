"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type LinkItem = { id: string; title: string; url: string; is_active: boolean; position: number };

export function LinksPanel({ profileId, initialLinks }: { profileId: string; initialLinks: LinkItem[] }) {
  const [links, setLinks] = useState(initialLinks);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
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

  function startEdit(link: LinkItem) { setEditingId(link.id); setEditTitle(link.title); setEditUrl(link.url); setMessage(null); }

  async function saveEdit(id: string) {
    if (!editTitle.trim() || !/^https?:\/\//i.test(editUrl.trim())) return;
    setSaving(true); setMessage(null);
    const supabase = createClient();
    const { error } = await supabase.from("links").update({ title: editTitle.trim(), url: editUrl.trim() }).eq("id", id);
    if (error) setMessage(error.message);
    else { setLinks(links.map((link) => link.id === id ? { ...link, title: editTitle.trim(), url: editUrl.trim() } : link)); setEditingId(null); setMessage("Link updated."); }
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

  async function moveLink(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= links.length) return;
    const next = [...links];
    [next[index], next[target]] = [next[target], next[index]];
    const supabase = createClient();
    const updates = next.map((link, position) => ({ id: link.id, position }));
    const results = await Promise.all(updates.map((item) => supabase.from("links").update({ position: item.position }).eq("id", item.id)));
    if (results.some((result) => result.error)) { setMessage("Could not reorder links."); return; }
    setLinks(next.map((link, position) => ({ ...link, position })));
  }

  return <section className="links-panel">
    <div><p className="eyebrow">Links</p><h2>Your links</h2></div>
    <form className="link-add-form" onSubmit={addLink}>
      <input aria-label="Link title" placeholder="Link title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} required />
      <input aria-label="Link URL" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} type="url" required />
      <button className="button primary" disabled={saving}>{saving ? "Adding…" : "Add link"}</button>
    </form>
    <div className="link-list">{links.map((link, index) => <article className="link-row" key={link.id}>
      {editingId === link.id ? <div className="link-edit"><input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} maxLength={100} /><input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} type="url" /><div className="link-actions"><button type="button" onClick={() => saveEdit(link.id)} disabled={saving}>Save</button><button type="button" onClick={() => setEditingId(null)}>Cancel</button></div></div> : <><div><strong>{link.title}</strong><span>{link.url}</span></div><div className="link-actions"><button type="button" onClick={() => moveLink(index, -1)} disabled={index === 0}>↑</button><button type="button" onClick={() => moveLink(index, 1)} disabled={index === links.length - 1}>↓</button><button type="button" onClick={() => startEdit(link)}>Edit</button><button type="button" onClick={() => toggleLink(link)}>{link.is_active ? "Disable" : "Enable"}</button><button type="button" onClick={() => deleteLink(link.id)}>Delete</button></div></>}
    </article>)}</div>
    {message && <p className="form-message">{message}</p>}
  </section>;
}
