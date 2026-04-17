import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SearchResult = {
  id: string;
  type: "tutorial" | "insight" | "course" | "event";
  title: string;
  description: string;
  slug: string;
  thumbnail: string | null;
  tags: string[];
  href: string;
  created_at: string;
};

const escapeIlike = (q: string) => q.replace(/[%_,()]/g, " ").trim();

export const useGlobalSearch = (query: string, selectedTags: string[]) =>
  useQuery({
    queryKey: ["global-search", query, [...selectedTags].sort()],
    queryFn: async (): Promise<SearchResult[]> => {
      const q = escapeIlike(query);
      const like = q ? `%${q}%` : null;

      // Run all 4 queries in parallel
      const [articlesRes, postsRes, coursesRes, eventsRes] = await Promise.all([
        (() => {
          let req = supabase
            .from("articles")
            .select("id, title, excerpt, slug, cover_image, created_at, article_tags(tags(name, slug))")
            .eq("status", "published")
            .order("created_at", { ascending: false })
            .limit(20);
          if (like) req = req.or(`title.ilike.${like},excerpt.ilike.${like}`);
          return req;
        })(),
        (() => {
          let req = supabase
            .from("posts")
            .select("id, headline, preview, created_at, post_tags(tags(name, slug))")
            .order("created_at", { ascending: false })
            .limit(20);
          if (like) req = req.or(`headline.ilike.${like},preview.ilike.${like}`);
          return req;
        })(),
        (() => {
          let req = supabase
            .from("courses")
            .select("id, title, description, slug, cover_image, created_at, course_tags(tags(name, slug))")
            .order("created_at", { ascending: false })
            .limit(20);
          if (like) req = req.or(`title.ilike.${like},description.ilike.${like}`);
          return req;
        })(),
        (() => {
          let req = supabase
            .from("events")
            .select("id, title, description, slug, cover_image, created_at")
            .order("event_date", { ascending: true })
            .limit(20);
          if (like) req = req.or(`title.ilike.${like},description.ilike.${like}`);
          return req;
        })(),
      ]);

      const extractTags = (rel: any): string[] =>
        (rel ?? []).map((r: any) => r?.tags?.name).filter(Boolean);

      const results: SearchResult[] = [];

      (articlesRes.data ?? []).forEach((a: any) =>
        results.push({
          id: a.id,
          type: "tutorial",
          title: a.title,
          description: a.excerpt ?? "",
          slug: a.slug,
          thumbnail: a.cover_image,
          tags: extractTags(a.article_tags),
          href: `/blog/${a.slug}`,
          created_at: a.created_at,
        })
      );

      (postsRes.data ?? []).forEach((p: any) =>
        results.push({
          id: p.id,
          type: "insight",
          title: p.headline,
          description: p.preview ?? "",
          slug: p.id,
          thumbnail: null,
          tags: extractTags(p.post_tags),
          href: `/posts/${p.id}`,
          created_at: p.created_at,
        })
      );

      (coursesRes.data ?? []).forEach((c: any) =>
        results.push({
          id: c.id,
          type: "course",
          title: c.title,
          description: c.description ?? "",
          slug: c.slug,
          thumbnail: c.cover_image,
          tags: extractTags(c.course_tags),
          href: `/courses/${c.slug}`,
          created_at: c.created_at,
        })
      );

      (eventsRes.data ?? []).forEach((e: any) =>
        results.push({
          id: e.id,
          type: "event",
          title: e.title,
          description: e.description ?? "",
          slug: e.slug,
          thumbnail: e.cover_image,
          tags: [],
          href: `/events/${e.slug}`,
          created_at: e.created_at,
        })
      );

      // Filter by selected tags (any-match) — events have no tags so they only show when no tags are selected
      const filtered =
        selectedTags.length === 0
          ? results
          : results.filter((r) =>
              r.tags.some((t) => selectedTags.includes(t))
            );

      return filtered.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
  });

export const useAllTags = () =>
  useQuery({
    queryKey: ["all-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tags")
        .select("name, slug")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
