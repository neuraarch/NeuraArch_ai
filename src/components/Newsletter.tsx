import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Newsletter = () => {
  const { ref, isVisible } = useScrollReveal();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("newsletter").insert({ email: email.trim() });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong", { description: error.message });
      return;
    }
    setDone(true);
    toast.success("You're subscribed!");
  };

  return (
    <section id="newsletter" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-xl mx-auto text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            Learn AI Systems the <span className="text-gradient-primary">Right Way</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Weekly deep dives on RAG, agents, and AI architecture — no fluff.
          </p>
          {done ? (
            <p className="text-primary font-semibold animate-fade-up">You're subscribed! 🎉</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <button type="submit" disabled={loading}
                className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent whitespace-nowrap disabled:opacity-50">
                {loading ? "..." : "Join Waitlist"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
