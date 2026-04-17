import { useState } from "react";
import { Link } from "react-router-dom";
import CommentInput from "./CommentInput";
import { useComments, type DBComment } from "@/hooks/useComments";
import { Skeleton } from "@/components/ui/skeleton";

interface CommentThreadProps {
  articleId?: string;
  postId?: string;
}

type EnrichedComment = DBComment & { timestamp: string };

const CommentItem = ({
  comment,
  allComments,
  onReply,
  isAuthed,
  depth = 0,
}: {
  comment: EnrichedComment;
  allComments: EnrichedComment[];
  onReply: (text: string, parentId: string) => Promise<void>;
  isAuthed: boolean;
  depth?: number;
}) => {
  const [showReply, setShowReply] = useState(false);
  const replies = allComments.filter((c) => c.parent_id === comment.id);

  return (
    <div className={depth > 0 ? "ml-8 pl-4 border-l border-border" : ""}>
      <div className="flex gap-3 py-4 animate-fade-in">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
          {(comment.author_name ?? "U").charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-foreground">{comment.author_name ?? "User"}</span>
            <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{comment.text}</p>
          {isAuthed && (
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-xs text-primary hover:underline mt-1"
            >
              {showReply ? "Cancel" : "Reply"}
            </button>
          )}
          {showReply && (
            <div className="mt-2">
              <CommentInput
                onSubmit={async (text) => {
                  await onReply(text, comment.id);
                  setShowReply(false);
                }}
                placeholder="Write a reply..."
              />
            </div>
          )}
        </div>
      </div>
      {replies.map((r) => (
        <CommentItem
          key={r.id}
          comment={r}
          allComments={allComments}
          onReply={onReply}
          isAuthed={isAuthed}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};

const CommentThread = ({ articleId, postId }: CommentThreadProps) => {
  const { comments, loading, addComment, isAuthed } = useComments({ articleId, postId });

  const topLevel = comments.filter((c) => !c.parent_id);

  const handleReply = async (text: string, parentId: string) => {
    await addComment(text, parentId);
  };

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="font-heading text-2xl font-bold mb-6">
        Comments ({comments.length})
      </h2>
      {isAuthed ? (
        <CommentInput onSubmit={(text) => addComment(text)} placeholder="Share your thoughts..." />
      ) : (
        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link> to join the conversation.
        </div>
      )}
      <div className="mt-6 divide-y divide-border">
        {loading ? (
          <div className="space-y-4 py-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : topLevel.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6">Be the first to comment.</p>
        ) : (
          topLevel.map((c) => (
            <CommentItem
              key={c.id}
              comment={c}
              allComments={comments}
              onReply={handleReply}
              isAuthed={isAuthed}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CommentThread;
