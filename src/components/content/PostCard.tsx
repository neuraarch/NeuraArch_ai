import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

interface PostCardProps {
  slug: string;
  headline: string;
  preview: string;
  tags: string[];
  author: string;
  date: string;
  likes: number;
}

const PostCard = ({ slug, headline, preview, tags, author, date, likes }: PostCardProps) => (
  <Link
    to={`/posts/${slug}`}
    className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(187,80%,52%,0.08)]"
  >
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-bold leading-snug group-hover:text-primary transition-colors">
        {headline}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{preview}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full border border-border text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>{author}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Heart size={12} />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default PostCard;
