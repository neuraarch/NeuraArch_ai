import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";

const tutorials = [
  {
    slug: "why-most-rag-systems-fail",
    title: "Why Most RAG Systems Fail",
    hook: "The #1 mistake engineers make when building retrieval pipelines",
    tags: ["RAG", "Architecture"],
    gradient: "from-red-500/20 to-primary/20",
  },
  {
    slug: "similarity-is-not-relevance",
    title: "Similarity ≠ Relevance",
    hook: "Cosine similarity is lying to you. Here's what actually matters.",
    tags: ["Vector DB", "Evaluation"],
    gradient: "from-primary/20 to-blue-500/20",
  },
  {
    slug: "stop-searching-for-words",
    title: "Stop Searching for Words",
    hook: "Semantic search is the new paradigm — and you're not using it right.",
    tags: ["Embeddings", "Search"],
    gradient: "from-accent/20 to-yellow-500/20",
  },
];

const allTags = ["All", ...Array.from(new Set(tutorials.flatMap((t) => t.tags)))];

const Tutorials = () => {
  const { ref, isVisible } = useScrollReveal();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tutorials.filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.hook.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchTag = activeTag === "All" || t.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  return (
    <section id="tutorials" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Latest <span className="text-gradient-accent">Deep Dive</span> Tutorials
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            In-depth technical breakdowns you won't find anywhere else
          </p>
        </div>

        <div className={`max-w-3xl mx-auto mb-10 space-y-4 ${isVisible ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"}`}>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutorials by title, topic, or tag..."
              className="pl-10"
              aria-label="Search tutorials"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all duration-300 ${
                    active
                      ? "bg-primary/15 border-primary/50 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.35)]"
                      : "glass-chip text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((t, i) => (
            <Link
              to={`/blog/${t.slug}`}
              key={t.title}
              className={`group cursor-pointer rounded-xl bg-card border border-border overflow-hidden glow-card hover:glow-card-hover hover:-translate-y-1 transition-all duration-300 block ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className={`h-40 bg-gradient-to-br ${t.gradient} flex items-center justify-center relative`}>
                <div className="w-12 h-12 rounded-full bg-background/40 backdrop-blur flex items-center justify-center border border-border">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="hsl(var(--primary))">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  {t.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground">{t.hook}</p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            No tutorials match your search. Try a different keyword or tag.
          </p>
        )}
      </div>
    </section>
  );
};

export default Tutorials;
