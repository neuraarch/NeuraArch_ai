import { Link } from "react-router-dom";

interface RelatedItem {
  slug: string;
  title: string;
  tags: string[];
  type: "blog" | "post";
}

interface RelatedContentProps {
  items: RelatedItem[];
}

const RelatedContent = ({ items }: RelatedContentProps) => (
  <section className="mt-16 pt-12 border-t border-border">
    <h2 className="font-heading text-2xl font-bold mb-6">Related Content</h2>
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Link
          key={item.slug}
          to={`/${item.type === "blog" ? "blog" : "posts"}/${item.slug}`}
          className="group rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all hover:-translate-y-1"
        >
          <div className="flex flex-wrap gap-2 mb-2">
            {item.tags.slice(0, 2).map((t) => (
              <span key={t} className="px-2 py-0.5 text-[10px] rounded-full border border-border text-muted-foreground">{t}</span>
            ))}
          </div>
          <h3 className="font-heading text-sm font-bold group-hover:text-primary transition-colors">{item.title}</h3>
        </Link>
      ))}
    </div>
  </section>
);

export default RelatedContent;
