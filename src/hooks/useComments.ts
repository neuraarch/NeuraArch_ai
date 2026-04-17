import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface DBComment {
  id: string;
  text: string;
  user_id: string;
  created_at: string;
  parent_id: string | null;
  author_name?: string;
}

interface UseCommentsArgs {
  articleId?: string;
  postId?: string;
}

const formatTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

export const useComments = ({ articleId, postId }: UseCommentsArgs) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<DBComment[]>([]);
  const [loading, setLoading] = useState(true);

  const targetCol = articleId ? "article_id" : "post_id";
  const targetId = articleId ?? postId;

  const enrich = async (rows: any[]): Promise<DBComment[]> => {
    if (rows.length === 0) return [];
    const userIds = [...new Set(rows.map((r) => r.user_id))];
    const { data: profs } = await supabase
      .from("profiles")
      .select("user_id, name")
      .in("user_id", userIds);
    const nameMap = new Map((profs ?? []).map((p) => [p.user_id, p.name ?? "User"]));
    return rows.map((r) => ({ ...r, author_name: nameMap.get(r.user_id) ?? "User" }));
  };

  useEffect(() => {
    if (!targetId) {
      setLoading(false);
      return;
    }
    let mounted = true;

    (async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq(targetCol, targetId)
        .order("created_at", { ascending: true });
      if (error) {
        setLoading(false);
        return;
      }
      const enriched = await enrich(data ?? []);
      if (mounted) {
        setComments(enriched);
        setLoading(false);
      }
    })();

    const channel = supabase
      .channel(`comments-${targetId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments", filter: `${targetCol}=eq.${targetId}` },
        async (payload) => {
          const enriched = await enrich([payload.new]);
          setComments((prev) => (prev.some((c) => c.id === enriched[0].id) ? prev : [...prev, ...enriched]));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "comments", filter: `${targetCol}=eq.${targetId}` },
        (payload) => setComments((prev) => prev.filter((c) => c.id !== (payload.old as any).id))
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [targetId, targetCol]);

  const addComment = async (text: string, parentId?: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please log in to comment." });
      return false;
    }
    if (!targetId) return false;
    const { error } = await supabase.from("comments").insert({
      text,
      user_id: user.id,
      parent_id: parentId ?? null,
      [targetCol]: targetId,
    } as any);
    if (error) {
      toast({ title: "Could not post", description: error.message, variant: "destructive" });
      return false;
    }
    return true;
  };

  return { comments: comments.map((c) => ({ ...c, timestamp: formatTime(c.created_at) })), loading, addComment, isAuthed: !!user };
};
