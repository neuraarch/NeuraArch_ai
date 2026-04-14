import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/content/ArticleCard";
import TagChip from "@/components/content/TagChip";
import { articles } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const allTags = ["All", "RAG", "Agents", "Vector DB", "Chunking", "Evaluation", "Embeddings", "Architecture"];

const BlogListing = () => {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const { ref, isVisible } = useScrollReveal(0.05);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.hook.toLowerCase().includes(search.toLowerCase());
      const matchTag = activeTag === "All" || a.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => a !== featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div ref={ref} className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className={`max-w-2xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">← Back to Home</Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              AI Tutorials & <span className="text-gradient-primary">Deep Dives</span>
            </h1>
            <p className="text-lg text-muted-foreground">Practical guides for building production AI systems — from RAG pipelines to agent architectures.</p>
          </div>

          {/* Search & Filters */}
          <div className={`space-y-4 mb-10 ${isVisible ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"}`}>
            <div className="relative max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tutorials..."
                className="w-full bg-muted/50 border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <TagChip key={tag} tag={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)} />
              ))}
            </div>
          </div>

          {/* Featured */}
          {featured && (
            <div className={`mb-10 ${isVisible ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"}`}>
              <ArticleCard {...featured} featured />
            </div>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <div key={article.slug} className={isVisible ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: `${300 + i * 80}ms` }}>
                <ArticleCard {...article} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No articles match your search.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogListing;
