import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DataTable from "@/components/admin/DataTable";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

const AdminPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [headline, setHeadline] = useState("");
  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!headline) { toast.error("Headline is required"); return; }
    setSaving(true);
    const blocks: Json = content ? [{ type: "paragraph", text: content }] : [];
    const { error } = await supabase.from("posts").insert({ headline, preview: preview || null, content: blocks });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Post published!");
    setHeadline(""); setPreview(""); setContent(""); setShowForm(false);
    load();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this post?")) return;
    await supabase.from("posts").delete().eq("id", id);
    toast.success("Post deleted");
    load();
  };

  const columns = [
    { header: "Headline", accessor: (r: any) => <span className="font-medium text-foreground">{r.headline}</span> },
    { header: "Preview", accessor: (r: any) => <span className="text-muted-foreground text-sm truncate max-w-[300px] block">{r.preview || "—"}</span> },
    { header: "Created", accessor: (r: any) => new Date(r.created_at).toLocaleDateString() },
    {
      header: "",
      accessor: (r: any) => (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => handleDelete(r.id, e)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      ),
      className: "w-16",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Posts</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" /> New Post
        </Button>
      </div>

      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <Input placeholder="Headline..." value={headline} onChange={(e) => setHeadline(e.target.value)} className="bg-background/50 text-lg font-heading" />
          <Input placeholder="Preview text..." value={preview} onChange={(e) => setPreview(e.target.value)} className="bg-background/50" />
          <Textarea placeholder="Content..." value={content} onChange={(e) => setContent(e.target.value)} className="bg-background/50 min-h-[100px]" />
          <div className="flex gap-2">
            <Button onClick={handleCreate} disabled={saving}>Publish Post</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default AdminPosts;
