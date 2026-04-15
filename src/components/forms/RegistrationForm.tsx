import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const RegistrationForm = ({ eventTitle, eventId }: { eventTitle: string; eventId?: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    if (!eventId) {
      toast.error("Event not found");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("event_registrations").insert({
      name: name.trim(),
      email: email.trim(),
      event_id: eventId,
      experience_level: level || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong", { description: error.message });
      return;
    }
    setSubmitted(true);
    toast.success("Seat reserved!", { description: `You're registered for ${eventTitle}.` });
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-fade-up">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <p className="font-heading text-lg font-semibold">You're registered!</p>
        <p className="text-sm text-muted-foreground mt-1">Check your email for event details.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required
        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
      <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
      <select value={level} onChange={(e) => setLevel(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow">
        <option value="">Experience level (optional)</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button type="submit" disabled={loading}
        className="w-full px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent disabled:opacity-50">
        {loading ? "Reserving..." : "Reserve My Seat"}
      </button>
    </form>
  );
};

export default RegistrationForm;
