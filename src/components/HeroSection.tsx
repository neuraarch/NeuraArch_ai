import { useScrollReveal } from "@/hooks/useScrollReveal";
import banner from "@/assets/banner.png";

const topics = ["RAG", "Agents", "Chunking", "Evaluation", "Vector DB", "Embeddings"];

const HeroSection = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className={`space-y-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              Build Real AI Systems,{" "}
              <span className="text-gradient-primary">Not Just Prompts</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Learn RAG, Agents, Vector Databases, and AI Architecture through practical tutorials
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#course"
                className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all hover:shadow-[0_0_24px_hsl(24,85%,55%,0.35)] glow-accent"
              >
                Start Learning
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/50 hover:text-primary transition-all"
              >
                Watch on YouTube
              </a>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {["RAG", "Agents", "Vector DB", "AI Architecture"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground bg-muted/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right - animated visual */}
          <div
            className={`relative flex items-center justify-center min-h-[350px] lg:min-h-[450px] ${
              isVisible ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"
            }`}
          >
            <img
              src={banner}
              alt="NeuraArch — Architecting Intelligent Systems"
              className="w-full h-auto rounded-2xl object-contain max-h-[450px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
