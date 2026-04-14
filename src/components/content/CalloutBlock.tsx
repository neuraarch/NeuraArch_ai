import { AlertTriangle, Info, Lightbulb } from "lucide-react";

interface CalloutBlockProps {
  text: string;
  variant?: "info" | "warning" | "tip";
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
};

const styles = {
  info: "border-primary/30 bg-primary/5 text-primary",
  warning: "border-accent/30 bg-accent/5 text-accent",
  tip: "border-green-500/30 bg-green-500/5 text-green-400",
};

const CalloutBlock = ({ text, variant = "info" }: CalloutBlockProps) => {
  const Icon = icons[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${styles[variant]}`}>
      <Icon size={20} className="shrink-0 mt-0.5" />
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  );
};

export default CalloutBlock;
