import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const paths = [
  {
    title: "AI Beginner Path",
    slug: "ai-beginner",
    description: "Start with the foundations — embeddings, vector search, and your first RAG pipeline.",
    level: "Beginner",
    color: "text-green-400",
  },
  {
    title: "RAG Engineer Path",
    slug: "rag-engineer",
    description: "Master retrieval-augmented generation, chunking strategies, and evaluation frameworks.",
    level: "Intermediate",
    color: "text-primary",
  },
  {
    title: "Agentic AI Path",
    slug: "agentic-ai",
    description: "Build autonomous AI agents with tool use, planning, and multi-step reasoning.",
    level: "Advanced",
    color: "text-accent",
  },
];

const LearningPaths = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="learning-paths" ref={ref} className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-14 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient-primary">Learning Path</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Structured roadmaps to take you from zero to production-ready AI systems
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {paths.map((path, i) => (
            <div
              key={path.title}
              className={`group p-6 rounded-xl bg-card border border-border glow-card hover:glow-card-hover hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <span className={`text-xs font-semibold ${path.color} bg-muted px-2.5 py-1 rounded-full`}>
                {path.level}
              </span>
              <h3 className="font-heading text-xl font-semibold mt-4 mb-2">{path.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{path.description}</p>
              <Link
                to={`/learning-paths/${path.slug}`}
                className="text-sm font-medium text-primary hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                Explore Path <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
