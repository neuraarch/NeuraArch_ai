import { useState } from "react";

interface CommentInputProps {
  onSubmit: (text: string) => void | Promise<void> | boolean | Promise<boolean>;
  placeholder?: string;
}

const CommentInput = ({ onSubmit, placeholder = "Add a comment..." }: CommentInputProps) => {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    try {
      await onSubmit(text.trim());
      setText("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold shrink-0">
        Y
      </div>
      <div className="flex-1 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          disabled={busy}
          className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy || !text.trim()}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? "..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
