import type { ContentBlock } from "@/data/mockData";
import CodeBlock from "./CodeBlock";
import CalloutBlock from "./CalloutBlock";
import YouTubeEmbed from "./YouTubeEmbed";

interface RichTextRendererProps {
  blocks: ContentBlock[];
}

const RichTextRenderer = ({ blocks }: RichTextRendererProps) => (
  <div className="prose-custom space-y-6">
    {blocks.map((block, i) => {
      switch (block.type) {
        case "paragraph":
          return <p key={i} className="text-muted-foreground leading-relaxed">{block.text}</p>;
        case "heading":
          return block.level === 2 ? (
            <h2 key={i} id={block.text.toLowerCase().replace(/\s+/g, "-")} className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">{block.text}</h2>
          ) : (
            <h3 key={i} className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">{block.text}</h3>
          );
        case "list":
          return (
            <ul key={i} className="space-y-2 pl-5">
              {block.items.map((item, j) => (
                <li key={j} className="text-muted-foreground leading-relaxed list-disc">{item}</li>
              ))}
            </ul>
          );
        case "code":
          return <CodeBlock key={i} language={block.language} code={block.code} />;
        case "callout":
          return <CalloutBlock key={i} text={block.text} variant={block.variant} />;
        case "youtube":
          return <YouTubeEmbed key={i} videoId={block.videoId} />;
        case "image":
          return <img key={i} src={block.src} alt={block.alt} className="rounded-xl w-full" />;
        default:
          return null;
      }
    })}
  </div>
);

export default RichTextRenderer;
