import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/content/PostCard";
import TagChip from "@/components/content/TagChip";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { posts as mockPosts } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const usePostsWithTags = () =>
  useQuery({
    queryKey: ["posts-with-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, post_tags(tags(name, slug))")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

const usePostTagOptions = () =>
  useQuery({
    queryKey: ["post-tag-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("post_tags")
        .select("tags(name)");
      if (error) throw error;
      const names = Array.from(
        new Set((data ?? []).map((r: any) => r?.tags?.name).filter(Boolean))
      ).sort();
      return names as string[];
    },
  });

const PostsFeed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [debounced, setDebounced] = useState(query);
  const selectedTags = useMemo(
    () => (searchParams.get("tags")?.split(",").filter(Boolean) ?? []),
    [searchParams]
  );

  const { ref, isVisible } = useScrollReveal(0.05);
  const { data: dbPosts } = usePostsWithTags();
  const { data: tagOptions = [] } = usePostTagOptions();

  // Debounce search input → URL
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (debounced) next.set("q", debounced);
    else next.delete("q");
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const toggleTag = (tag: string) => {
    const set = new Set(selectedTags);
    set.has(tag) ? set.delete(tag) : set.add(tag);
    const next = new URLSearchParams(searchParams);
    const arr = Array.from(set);
    if (arr.length) next.set("tags", arr.join(","));
    else next.delete("tags");
    setSearchParams(next, { replace: true });
  };

  const clearAll = () => {
    setQuery("");
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const posts = useMemo(() => {
    if (dbPosts && dbPosts.length > 0) {
      return dbPosts.map((p: any) => ({
        slug: p.id,
        headline: p.headline,
        preview: p.preview || "",
        content: (p.content as unknown as any[]) || [],
        tags: (p.post_tags ?? [])
          .map((r: any) => r?.tags?.name)
          .filter(Boolean) as string[],
        author: "NeuraArch",
        date: new Date(p.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        likes: 0,
        youtubeId: p.youtube_id || undefined,
      }));
    }
    return mockPosts;
  }, [dbPosts]);

  const filtered = useMemo(() => {
    const q = debounced.toLowerCase().trim();
    return posts.filter((p) => {
      const matchSearch =
        !q ||
        p.headline.toLowerCase().includes(q) ||
        p.preview.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => p.tags.includes(t));
      return matchSearch && matchTags;
    });
  }, [posts, debounced, selectedTags]);

  const hasFilters = !!debounced || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div ref={ref} className="container mx-auto px-4 md:px-6">
          <div className={`max-w-2xl mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">← Back to Home</Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              AI <span className="text-gradient-primary">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground">Short-form insights on AI systems, architecture patterns, and engineering best practices.</p>
          </div>

          <div className={`space-y-4 mb-10 ${isVisible ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"}`}>
            <div className="relative max-w-md">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search insights..."
                className="pl-10 bg-muted/50"
              />
            </div>
            {tagOptions.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                {tagOptions.map((tag) => (
                  <TagChip
                    key={tag}
                    tag={tag}
                    active={selectedTags.includes(tag)}
                    onClick={() => toggleTag(tag)}
                  />
                ))}
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="ml-2 text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1 transition-colors"
                  >
                    <X size={12} /> Clear
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <div key={post.slug} className={isVisible ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: `${200 + i * 80}ms` }}>
                <PostCard {...post} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              No results found. Try different keywords or filters.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostsFeed;
