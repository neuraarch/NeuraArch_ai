import { LucideIcon } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
}

const MetricsCard = ({ title, value, icon: Icon, trend }: MetricsCardProps) => (
  <div className="rounded-xl border border-border bg-card p-6 glow-card hover:glow-card-hover transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm text-muted-foreground">{title}</span>
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <div className="text-3xl font-heading font-bold text-foreground">{value}</div>
    {trend && <p className="text-xs text-muted-foreground mt-2">{trend}</p>}
  </div>
);

export default MetricsCard;
