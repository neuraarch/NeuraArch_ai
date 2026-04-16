import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, GripVertical, Type, AlignLeft, List, Code, Image, Youtube, Heading } from "lucide-react";

export interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "code" | "image" | "youtube";
  text?: string;
  level?: number;
  items?: string[];
  language?: string;
  code?: string;
  src?: string;
  alt?: string;
  videoId?: string;
}

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const blockTypes = [
  { value: "paragraph", label: "Paragraph", icon: AlignLeft },
  { value: "heading", label: "Heading", icon: Heading },
  { value: "list", label: "List", icon: List },
  { value: "code", label: "Code", icon: Code },
  { value: "image", label: "Image", icon: Image },
  { value: "youtube", label: "YouTube", icon: Youtube },
];

const defaultBlock = (type: string): ContentBlock => {
  switch (type) {
    case "heading": return { type: "heading", text: "", level: 2 };
    case "list": return { type: "list", items: [""] };
    case "code": return { type: "code", language: "javascript", code: "" };
    case "image": return { type: "image", src: "", alt: "" };
    case "youtube": return { type: "youtube", videoId: "" };
    default: return { type: "paragraph", text: "" };
  }
};

const ContentBlockEditor = ({ blocks, onChange }: ContentBlockEditorProps) => {
  const [addingType, setAddingType] = useState<string | null>(null);

  const updateBlock = (index: number, updated: Partial<ContentBlock>) => {
    const next = [...blocks];
    next[index] = { ...next[index], ...updated };
    onChange(next);
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const addBlock = (type: string) => {
    onChange([...blocks, defaultBlock(type)]);
    setAddingType(null);
  };

  const moveBlock = (from: number, to: number) => {
    if (to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={i} className="group rounded-lg border border-border bg-card/50 p-4 hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={() => moveBlock(i, i - 1)} className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground font-mono uppercase">{block.type}</span>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => removeBlock(i)}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>

          {block.type === "paragraph" && (
            <Textarea
              placeholder="Write your paragraph..."
              value={block.text || ""}
              onChange={(e) => updateBlock(i, { text: e.target.value })}
              className="min-h-[80px] bg-background/50"
            />
          )}

          {block.type === "heading" && (
            <div className="flex gap-2">
              <Select value={String(block.level || 2)} onValueChange={(v) => updateBlock(i, { level: Number(v) })}>
                <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Heading text..."
                value={block.text || ""}
                onChange={(e) => updateBlock(i, { text: e.target.value })}
                className="bg-background/50"
              />
            </div>
          )}

          {block.type === "list" && (
            <div className="space-y-2">
              {(block.items || []).map((item, j) => (
                <div key={j} className="flex gap-2 items-center">
                  <span className="text-muted-foreground text-xs w-4">{j + 1}.</span>
                  <Input
                    value={item}
                    onChange={(e) => {
                      const items = [...(block.items || [])];
                      items[j] = e.target.value;
                      updateBlock(i, { items });
                    }}
                    className="bg-background/50"
                    placeholder="List item..."
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => {
                      const items = (block.items || []).filter((_, k) => k !== j);
                      updateBlock(i, { items });
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateBlock(i, { items: [...(block.items || []), ""] })}
              >
                <Plus className="h-3 w-3 mr-1" /> Add item
              </Button>
            </div>
          )}

          {block.type === "code" && (
            <div className="space-y-2">
              <Input
                placeholder="Language (e.g. python)"
                value={block.language || ""}
                onChange={(e) => updateBlock(i, { language: e.target.value })}
                className="bg-background/50 w-48"
              />
              <Textarea
                placeholder="Paste code..."
                value={block.code || ""}
                onChange={(e) => updateBlock(i, { code: e.target.value })}
                className="min-h-[120px] font-mono text-sm bg-background/50"
              />
            </div>
          )}

          {block.type === "image" && (
            <div className="space-y-2">
              <Input
                placeholder="Image URL"
                value={block.src || ""}
                onChange={(e) => updateBlock(i, { src: e.target.value })}
                className="bg-background/50"
              />
              <Input
                placeholder="Alt text"
                value={block.alt || ""}
                onChange={(e) => updateBlock(i, { alt: e.target.value })}
                className="bg-background/50"
              />
            </div>
          )}

          {block.type === "youtube" && (
            <Input
              placeholder="YouTube video ID"
              value={block.videoId || ""}
              onChange={(e) => updateBlock(i, { videoId: e.target.value })}
              className="bg-background/50"
            />
          )}
        </div>
      ))}

      {/* Add block */}
      <div className="flex flex-wrap gap-2 pt-2">
        {blockTypes.map((bt) => (
          <Button
            key={bt.value}
            variant="outline"
            size="sm"
            onClick={() => addBlock(bt.value)}
            className="gap-1.5 text-xs"
          >
            <bt.icon className="h-3.5 w-3.5" />
            {bt.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ContentBlockEditor;
