import { useState } from "react";
import type { Comment } from "@/data/mockData";
import CommentInput from "./CommentInput";

interface CommentThreadProps {
  comments: Comment[];
}

const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState(comment.replies ?? []);

  const handleReply = (text: string) => {
    setReplies([...replies, {
      id: `${comment.id}-${replies.length + 1}`,
      author: "You",
      text,
      timestamp: "Just now",
    }]);
    setShowReply(false);
  };

  return (
    <div className={`${depth > 0 ? "ml-8 pl-4 border-l border-border" : ""}`}>
      <div className="flex gap-3 py-4">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
          {comment.author.charAt(0)}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground">{comment.author}</span>
            <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>
          <button
            onClick={() => setShowReply(!showReply)}
            className="text-xs text-primary hover:underline mt-1"
          >
            Reply
          </button>
          {showReply && (
            <div className="mt-2">
              <CommentInput onSubmit={handleReply} placeholder="Write a reply..." />
            </div>
          )}
        </div>
      </div>
      {replies.map((r) => (
        <CommentItem key={r.id} comment={r} depth={depth + 1} />
      ))}
    </div>
  );
};

const CommentThread = ({ comments: initialComments }: CommentThreadProps) => {
  const [comments, setComments] = useState(initialComments);

  const handleNewComment = (text: string) => {
    setComments([...comments, {
      id: String(comments.length + 1),
      author: "You",
      text,
      timestamp: "Just now",
    }]);
  };

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="font-heading text-2xl font-bold mb-6">
        Comments ({comments.length})
      </h2>
      <CommentInput onSubmit={handleNewComment} placeholder="Share your thoughts..." />
      <div className="mt-6 divide-y divide-border">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} />
        ))}
      </div>
    </section>
  );
};

export default CommentThread;
