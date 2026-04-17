import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Input } from "@/components/ui/input";

const insights = [
  {
    slug: "rag-is-not-a-product",
    headline: "RAG is not a product, it's an architecture pattern",
    preview: "Stop treating RAG as a feature toggle. It's a systems design decision that affects every layer of your stack.",
    tags: ["RAG", "Architecture"],
  },
  {
    slug: "embeddings-are-lossy",
    headline: "The embedding model matters more than the LLM",
    preview: "Everyone obsesses over which GPT version to use. The real alpha is in your embedding choice.",
    tags: ["Embeddings", "Strategy"],
  },
  {
    slug: "agents-need-guardrails",
    headline: "Agents without guardrails are just expensive chaos",
    preview: "Autonomy without constraints doesn't scale. Here's how I think about building safe agentic systems.",
    tags: ["Agents", "Safety"],
  },
];

const allTags = ["All", ...Array.from(new Set(insights.flatMap((i) => i.tags)))];

const Insights = () => {
  const { ref, isVisible } = useScrollReveal();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return insights.filter((item) => {
      const matchSearch =
        !q ||
        item.headline.toLowerCase().includes(q) ||
        item.preview.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchTag = activeTag === "All" || item.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  return (
    <section id="insights" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            AI <span className="text-gradient-primary">Insights</span>
          </h2>
          <p className="text-muted-foreground">Short, sharp takes on building AI systems</p>
        </div>

        <div className={`max-w-3xl mx-auto mb-10 space-y-4 ${isVisible ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"}`}>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search insights by headline, topic, or tag..."
              className="pl-10"
              aria-label="Search insights"
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
                      ? "bg-accent/15 border-accent/50 text-accent shadow-[0_0_12px_hsl(var(--accent)/0.35)]"
                      : "glass-chip text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filtered.map((item, i) => (
            <div
              key={item.slug}
              className={`p-6 rounded-xl bg-card border border-border glow-card hover:glow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="flex gap-2 mb-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-heading text-base font-semibold mb-2">{item.headline}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{item.preview}</p>
              <Link to={`/posts/${item.slug}`} className="text-sm font-medium text-accent hover:brightness-125 transition-all">
                Read Insight →
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            No insights match your search. Try a different keyword or tag.
          </p>
        )}
      </div>
    </section>
  );
};

export default Insights;
