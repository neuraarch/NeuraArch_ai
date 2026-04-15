import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border py-3 animate-fade-up">
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium hidden sm:block">
          <span className="text-gradient-primary">AI Course</span> waitlist is open — limited spots available
        </p>
        <div className="flex items-center gap-3 ml-auto">
          <Link
            to="/courses"
            className="px-5 py-2 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent whitespace-nowrap"
          >
            Join Waitlist
          </Link>
          <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
