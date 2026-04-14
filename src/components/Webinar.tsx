import { useScrollReveal } from "@/hooks/useScrollReveal";

const Webinar = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="events" ref={ref} className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`max-w-3xl mx-auto text-center p-10 rounded-2xl bg-card border border-border glow-card relative overflow-hidden ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 blur-[80px] pointer-events-none" />
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Limited Spots
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
            Live Webinar: Building Your First AI Agent
          </h2>
          <p className="text-muted-foreground mb-1">May 15, 2026 · 6:00 PM EST</p>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto mb-6">
            A live, hands-on session where we build an agentic workflow from scratch — tool use, planning, and error recovery included.
          </p>
          <a
            href="#"
            className="inline-flex px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all hover:shadow-[0_0_24px_hsl(24,85%,55%,0.35)] glow-accent"
          >
            Reserve My Seat
          </a>
        </div>
      </div>
    </section>
  );
};

export default Webinar;
