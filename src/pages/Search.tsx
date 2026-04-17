import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X, BookOpen, Sparkles, GraduationCap, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalSearch, useAllTags, SearchResult } from "@/hooks/useGlobalSearch";

const typeMeta: Record<SearchResult["type"], { label: string; icon: any; tone: string }> = {
  tutorial: { label: "Tutorial", icon: BookOpen, tone: "text-primary border-primary/40 bg-primary/10" },
  insight: { label: "Insight", icon: Sparkles, tone: "text-accent border-accent/40 bg-accent/10" },
  course: { label: "Course", icon: GraduationCap, tone: "text-purple-400 border-purple-400/40 bg-purple-400/10" },
  event: { label: "Event", icon: Calendar, tone: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10" },
};

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [debounced, setDebounced] = useState(query);
  const selectedTags = useMemo(
    () => (params.get("tags")?.split(",").filter(Boolean) ?? []),
    [params]
  );

  // Debounce query → URL + search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const next = new URLSearchParams(params);
    if (debounced) next.set("q", debounced);
    else next.delete("q");
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const toggleTag = (name: string) => {
    const next = new URLSearchParams(params);
    const current = new Set(selectedTags);
    if (current.has(name)) current.delete(name);
    else current.add(name);
    if (current.size) next.set("tags", Array.from(current).join(","));
    else next.delete("tags");
    setParams(next, { replace: true });
  };

  const clearAll = () => {
    setQuery("");
    setParams(new URLSearchParams(), { replace: true });
  };

  const { data: tags } = useAllTags();
  const { data: results, isLoading } = useGlobalSearch(debounced, selectedTags);

  const hasFilters = !!debounced || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-up">
            <h1 className="font-heading text-3xl sm:text-5xl font-bold mb-4">
              Search the <span className="text-gradient-primary">AI Library</span>
            </h1>
            <p className="text-muted-foreground">
              Tutorials, insights, courses, and events — all in one place.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-6 animate-fade-up [animation-delay:100ms]">
            <div className="relative">
              <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AI tutorials, insights, learning paths..."
                className="pl-11 pr-11 h-12 text-base"
                aria-label="Search content"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {tags && tags.length > 0 && (
            <div className="max-w-4xl mx-auto mb-10 animate-fade-up [animation-delay:150ms]">
              <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag) => {
                  const active = selectedTags.includes(tag.name);
                  return (
                    <button
                      key={tag.slug}
                      onClick={() => toggleTag(tag.name)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                        active
                          ? "bg-accent/15 border-accent/60 text-accent shadow-[0_0_12px_hsl(var(--accent)/0.4)] scale-105"
                          : "glass-chip text-muted-foreground hover:text-foreground hover:border-accent/40"
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-destructive/50 transition-all"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 rounded-xl" />
                ))}
              </div>
            ) : results && results.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-5">
                  {results.length} result{results.length === 1 ? "" : "s"}
                  {debounced && <> for "<span className="text-foreground">{debounced}</span>"</>}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {results.map((r, i) => {
                    const meta = typeMeta[r.type];
                    const Icon = meta.icon;
                    return (
                      <Link
                        key={`${r.type}-${r.id}`}
                        to={r.href}
                        className="group p-5 rounded-xl bg-card border border-border glow-card hover:glow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-up"
                        style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border ${meta.tone}`}>
                            <Icon size={11} /> {meta.label}
                          </span>
                          {r.tags.length > 0 && (
                            <span className="text-[10px] text-muted-foreground">
                              {r.tags.slice(0, 2).join(" · ")}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-base font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {r.title}
                        </h3>
                        {r.description && (
                          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                            {r.description}
                          </p>
                        )}
                        <span className="text-xs font-medium text-accent mt-4 inline-flex items-center gap-1">
                          Open <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-20 animate-fade-up">
                <p className="text-muted-foreground text-lg mb-2">
                  No results found.
                </p>
                <p className="text-sm text-muted-foreground">
                  Try different keywords or remove some filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
