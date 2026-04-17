import { useState } from "react";
import { Heart, Share2, Bookmark, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReactionBarProps {
  initialLikes?: number;
}

const ReactionBar = ({ initialLikes = 0 }: ReactionBarProps) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [copied, setCopied] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({ title: "Link copied", description: "Share it anywhere." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Copy failed", description: "Please copy the URL manually.", variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <button onClick={toggleLike} className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-accent" : "text-muted-foreground hover:text-accent"}`}>
        <Heart size={18} className={liked ? "fill-current" : ""} />
        <span>{likes}</span>
      </button>
      <button onClick={() => setSaved(!saved)} className={`flex items-center gap-1.5 text-sm transition-colors ${saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
        <Bookmark size={18} className={saved ? "fill-current" : ""} />
        <span>{saved ? "Saved" : "Save"}</span>
      </button>
      <button onClick={handleShare} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        {copied ? <Check size={18} /> : <Share2 size={18} />}
        <span>{copied ? "Copied" : "Share"}</span>
      </button>
    </div>
  );
};

export default ReactionBar;
