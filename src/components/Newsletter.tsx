import { useScrollReveal } from "@/hooks/useScrollReveal";

const Newsletter = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="newsletter" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`max-w-xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Learn AI Systems the <span className="text-gradient-primary">Right Way</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Weekly deep dives on RAG, agents, and AI architecture — no fluff.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent whitespace-nowrap"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
