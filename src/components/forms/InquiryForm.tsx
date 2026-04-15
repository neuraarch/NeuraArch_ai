import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const InquiryForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong", { description: error.message });
      return;
    }
    setSubmitted(true);
    toast.success("Inquiry sent!", { description: "We'll get back to you soon." });
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-fade-up">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <p className="font-heading text-lg font-semibold">Inquiry received!</p>
        <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required
        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
      <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" />
      <textarea placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} required rows={4}
        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none" />
      <button type="submit" disabled={loading}
        className="w-full px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent disabled:opacity-50">
        {loading ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
};

export default InquiryForm;
