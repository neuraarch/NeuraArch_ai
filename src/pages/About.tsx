import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Sparkles, Database, Bot, Layers } from "lucide-react";

const learnings = [
  { icon: Database, title: "RAG Systems", desc: "Retrieval-augmented generation pipelines that scale." },
  { icon: Bot, title: "AI Agents", desc: "Multi-step agents with tools, memory, and planning." },
  { icon: Layers, title: "Vector Databases", desc: "Embeddings, indexes, and hybrid search." },
  { icon: Sparkles, title: "AI Architecture", desc: "Production patterns from prototype to scale." },
];

const About = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div ref={ref} className={`mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h1 className="font-heading text-4xl sm:text-6xl font-bold mb-6">
              About <span className="text-gradient-primary">NeuraArch</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Building real AI engineers, not just prompt users.
            </p>
          </div>

          <section className="mb-16 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              NeuraArch exists to close the gap between AI hype and AI engineering. We teach the architecture,
              systems, and patterns behind production-grade AI — so engineers can build with confidence, not guesswork.
              Every tutorial, course, and live session is grounded in real systems we've shipped.
            </p>
          </section>

          <section className="mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-6">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {learnings.map((l) => (
                <div
                  key={l.title}
                  className="p-5 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all hover:-translate-y-1"
                >
                  <l.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-heading font-semibold mb-1">{l.title}</h3>
                  <p className="text-sm text-muted-foreground">{l.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4">The Creator</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              NeuraArch is built by an AI systems architect with years of hands-on experience designing
              and deploying production AI systems. The goal: share what actually works — distilled into
              clear, structured learning paths for engineers who want to go deep.
            </p>
          </section>

          <section className="text-center py-12 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to start building?</h2>
            <p className="text-muted-foreground mb-6">Explore our learning paths and start shipping AI systems that work.</p>
            <Link
              to="/courses"
              className="inline-block px-8 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:brightness-110 transition-all glow-accent"
            >
              Start Learning
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
