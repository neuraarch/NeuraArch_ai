import { useScrollReveal } from "@/hooks/useScrollReveal";

const insights = [
  {
    headline: "RAG is not a product, it's an architecture pattern",
    preview: "Stop treating RAG as a feature toggle. It's a systems design decision that affects every layer of your stack.",
    tags: ["RAG", "Architecture"],
  },
  {
    headline: "The embedding model matters more than the LLM",
    preview: "Everyone obsesses over which GPT version to use. The real alpha is in your embedding choice.",
    tags: ["Embeddings", "Strategy"],
  },
  {
    headline: "Agents without guardrails are just expensive chaos",
    preview: "Autonomy without constraints doesn't scale. Here's how I think about building safe agentic systems.",
    tags: ["Agents", "Safety"],
  },
];

const Insights = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="insights" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            AI <span className="text-gradient-primary">Insights</span>
          </h2>
          <p className="text-muted-foreground">Short, sharp takes on building AI systems</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {insights.map((item, i) => (
            <div
              key={i}
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
              <a href="#" className="text-sm font-medium text-accent hover:brightness-125 transition-all">
                Read Insight →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
