import { useState } from "react";

interface CommentInputProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
}

const CommentInput = ({ onSubmit, placeholder = "Add a comment..." }: CommentInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
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
          className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:brightness-110 transition-all"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
