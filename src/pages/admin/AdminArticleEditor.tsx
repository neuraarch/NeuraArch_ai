import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContentBlockEditor, { type ContentBlock } from "@/components/admin/ContentBlockEditor";
import { toast } from "sonner";
import { ArrowLeft, Save, Send } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const AdminArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [readTime, setReadTime] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [status, setStatus] = useState("draft");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (!isNew) {
      supabase.from("articles").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setSlug(data.slug);
          setExcerpt(data.excerpt || "");
          setCoverImage(data.cover_image || "");
          setReadTime(data.read_time || "");
          setYoutubeId(data.youtube_id || "");
          setStatus(data.status);
          setBlocks((data.content as unknown as ContentBlock[]) || []);
          setAutoSlug(false);
        }
      });
    }
  }, [id, isNew]);

  useEffect(() => {
    if (autoSlug && title) setSlug(slugify(title));
  }, [title, autoSlug]);

  const save = async (publishStatus?: string) => {
    if (!title || !slug) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    const payload = {
      title,
      slug,
      excerpt: excerpt || null,
      cover_image: coverImage || null,
      read_time: readTime || null,
      youtube_id: youtubeId || null,
      status: publishStatus || status,
      content: blocks as unknown as Json,
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("articles").insert(payload));
    } else {
      ({ error } = await supabase.from("articles").update(payload).eq("id", id));
    }

    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(publishStatus === "published" ? "Article published!" : "Article saved!");
      navigate("/admin/articles");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/articles")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-heading font-bold flex-1">{isNew ? "New Article" : "Edit Article"}</h1>
        <Button variant="outline" onClick={() => save()} disabled={saving} className="gap-2">
          <Save className="h-4 w-4" /> Save Draft
        </Button>
        <Button onClick={() => save("published")} disabled={saving} className="gap-2">
          <Send className="h-4 w-4" /> Publish
        </Button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title..."
            className="text-lg font-heading bg-card"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Slug</label>
            <Input
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }}
              className="font-mono text-sm bg-card"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-card"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-1.5 block">Excerpt</label>
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short description..." className="bg-card" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Cover Image URL</label>
            <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." className="bg-card" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Read Time</label>
            <Input value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="5 min" className="bg-card" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">YouTube ID</label>
            <Input value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} placeholder="dQw4w9WgXcQ" className="bg-card" />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-3 block">Content Blocks</label>
          <ContentBlockEditor blocks={blocks} onChange={setBlocks} />
        </div>
      </div>
    </div>
  );
};

export default AdminArticleEditor;
