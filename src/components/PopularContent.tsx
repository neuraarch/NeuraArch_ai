import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tabs = ["Most Watched", "Most Read"] as const;

const content: Record<(typeof tabs)[number], { title: string; desc: string }[]> = {
  "Most Watched": [
    { title: "Building RAG from Scratch", desc: "Complete walkthrough of a production RAG pipeline" },
    { title: "Vector DB Comparison 2026", desc: "Pinecone vs Weaviate vs Qdrant — benchmarked" },
    { title: "AI Agent Architecture", desc: "How to design agents that actually work" },
  ],
  "Most Read": [
    { title: "Chunking Strategies Guide", desc: "The definitive guide to document chunking" },
    { title: "Embedding Models Ranked", desc: "We tested 12 embedding models so you don't have to" },
    { title: "RAG Evaluation Framework", desc: "Beyond vibes — measuring retrieval quality" },
  ],
};

const PopularContent = () => {
  const [active, setActive] = useState<(typeof tabs)[number]>("Most Watched");
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className={`text-center mb-10 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Most <span className="text-gradient-primary">Popular</span>
          </h2>
        </div>

        <div className={`flex justify-center gap-2 mb-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                active === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground bg-muted/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {content[active].map((item, i) => (
            <div
              key={item.title}
              className={`flex items-center gap-4 p-4 rounded-xl bg-card border border-border glow-card hover:glow-card-hover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <span className="text-2xl font-heading font-bold text-primary/30 w-10 text-center flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-heading text-sm font-semibold">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularContent;
