import { Link } from "react-router-dom";
import TagChip from "./TagChip";

interface ArticleCardProps {
  slug: string;
  title: string;
  hook: string;
  tags: string[];
  readTime: string;
  date: string;
  featured?: boolean;
}

const ArticleCard = ({ slug, title, hook, tags, readTime, date, featured }: ArticleCardProps) => (
  <Link
    to={`/blog/${slug}`}
    className={`group block rounded-xl border border-border bg-card hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(187,80%,52%,0.08)] overflow-hidden ${
      featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
    }`}
  >
    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
    </div>
    <div className="p-5 space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full border border-border text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="font-heading text-lg font-bold leading-snug group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{hook}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
        <span>{date}</span>
        <span>·</span>
        <span>{readTime} read</span>
      </div>
    </div>
  </Link>
);

export default ArticleCard;
