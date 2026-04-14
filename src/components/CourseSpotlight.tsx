import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  "Production RAG systems",
  "Agent workflows & tool use",
  "Vector databases & embeddings",
  "Evaluation & observability",
  "System design for AI apps",
];

const CourseSpotlight = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="course" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Coming Soon
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-4 mb-6">
              From Software Engineer to{" "}
              <span className="text-gradient-accent">AI Builder</span>
            </h2>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href="#newsletter"
                className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent"
              >
                Join Waitlist
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold text-sm hover:border-primary/50 transition-all"
              >
                Ask About Course
              </a>
            </div>
          </div>

          <div
            className={`relative rounded-xl border border-border bg-card p-8 glow-card ${
              isVisible ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"
            }`}
          >
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-[60px]" />
            <div className="space-y-4 relative">
              {["Week 1-2: Foundations", "Week 3-4: RAG Deep Dive", "Week 5-6: Agents", "Week 7-8: Production"].map(
                (week, i) => (
                  <div
                    key={week}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium">{week}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSpotlight;
