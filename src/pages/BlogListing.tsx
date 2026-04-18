import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/content/ArticleCard";
import TagChip from "@/components/content/TagChip";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { articles as mockArticles } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const useArticlesWithTags = () =>
  useQuery({
    queryKey: ["articles-with-tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, article_tags(tags(name, slug))")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

const useArticleTagOptions = () =>
  useQuery({
    queryKey: ["article-tag-options"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("article_tags")
        .select("tags(name)");
      if (error) throw error;
      const names = Array.from(
        new Set((data ?? []).map((r: any) => r?.tags?.name).filter(Boolean))
      ).sort();
      return names as string[];
    },
  });

const BlogListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [debounced, setDebounced] = useState(query);
  const selectedTags = useMemo(
    () => (searchParams.get("tags")?.split(",").filter(Boolean) ?? []),
    [searchParams]
  );

  const { ref, isVisible } = useScrollReveal(0.05);
  const { data: dbArticles } = useArticlesWithTags();
  const { data: tagOptions = [] } = useArticleTagOptions();

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

  const articles = useMemo(() => {
    if (dbArticles && dbArticles.length > 0) {
      return dbArticles.map((a: any) => ({
        slug: a.slug,
        title: a.title,
        hook: a.excerpt || "",
        content: (a.content as unknown as any[]) || [],
        tags: (a.article_tags ?? [])
          .map((r: any) => r?.tags?.name)
          .filter(Boolean) as string[],
        readTime: a.read_time || "5 min",
        author: "NeuraArch",
        date: new Date(a.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        featured: a.featured || false,
        youtubeId: a.youtube_id || undefined,
        coverImage: a.cover_image || undefined,
      }));
    }
    return mockArticles;
  }, [dbArticles]);

  const filtered = useMemo(() => {
    const q = debounced.toLowerCase().trim();
    return articles.filter((a) => {
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.hook.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => a.tags.includes(t));
      return matchSearch && matchTags;
    });
  }, [articles, debounced, selectedTags]);

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => a !== featured);
  const hasFilters = !!debounced || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div ref={ref} className="container mx-auto px-4 md:px-6">
          <div className={`max-w-2xl mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">← Back to Home</Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              AI Tutorials & <span className="text-gradient-primary">Deep Dives</span>
            </h1>
            <p className="text-lg text-muted-foreground">Practical guides for building production AI systems — from RAG pipelines to agent architectures.</p>
          </div>

          <div className={`space-y-4 mb-10 ${isVisible ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"}`}>
            <div className="relative max-w-md">
              <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tutorials..."
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

          {featured && (
            <div className={`mb-10 ${isVisible ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"}`}>
              <ArticleCard {...featured} featured />
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <div key={article.slug} className={isVisible ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: `${300 + i * 80}ms` }}>
                <ArticleCard {...article} />
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

export default BlogListing;
