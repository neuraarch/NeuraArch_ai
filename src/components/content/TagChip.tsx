interface TagChipProps {
  tag: string;
  onClick?: () => void;
  active?: boolean;
}

const TagChip = ({ tag, onClick, active }: TagChipProps) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-xs rounded-full border transition-all ${
      active
        ? "bg-primary/20 border-primary text-primary"
        : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary bg-muted/50"
    }`}
  >
    {tag}
  </button>
);

export default TagChip;
