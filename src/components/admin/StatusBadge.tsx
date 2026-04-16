import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  coming_soon: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  live: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", variants[status] || variants.draft)}>
    {status.replace("_", " ")}
  </span>
);

export default StatusBadge;
