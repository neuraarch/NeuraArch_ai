import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/content/PostCard";
import TagChip from "@/components/content/TagChip";
import { usePosts } from "@/hooks/useSupabaseQueries";
import { posts as mockPosts } from "@/data/mockData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMemo } from "react";

const allTags = ["All", "RAG", "Agents", "Embeddings", "Evaluation", "Vector DB", "Architecture", "Safety"];

const PostsFeed = () => {
  const [activeTag, setActiveTag] = useState("All");
  const { ref, isVisible } = useScrollReveal(0.05);
  const { data: dbPosts } = usePosts();

  const posts = useMemo(() => {
    if (dbPosts && dbPosts.length > 0) {
      return dbPosts.map((p) => ({
        slug: p.id,
        headline: p.headline,
        preview: p.preview || "",
        content: (p.content as unknown as any[]) || [],
        tags: [] as string[],
        author: "NeuraArch",
        date: new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        likes: 0,
        youtubeId: p.youtube_id || undefined,
      }));
    }
    return mockPosts;
  }, [dbPosts]);

  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div ref={ref} className="container mx-auto px-4 md:px-6">
          <div className={`max-w-2xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block">← Back to Home</Link>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              AI <span className="text-gradient-primary">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground">Short-form insights on AI systems, architecture patterns, and engineering best practices.</p>
          </div>

          <div className={`flex flex-wrap gap-2 mb-10 ${isVisible ? "animate-fade-up [animation-delay:100ms]" : "opacity-0"}`}>
            {allTags.map((tag) => (
              <TagChip key={tag} tag={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((post, i) => (
              <div key={post.slug} className={isVisible ? "animate-fade-up" : "opacity-0"} style={{ animationDelay: `${200 + i * 80}ms` }}>
                <PostCard {...post} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No posts match this filter.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostsFeed;
