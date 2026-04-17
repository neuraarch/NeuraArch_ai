import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorInfo from "@/components/content/AuthorInfo";
import TagChip from "@/components/content/TagChip";
import RichTextRenderer from "@/components/content/RichTextRenderer";
import ReactionBar from "@/components/content/ReactionBar";
import CommentThread from "@/components/content/CommentThread";
import RelatedContent from "@/components/content/RelatedContent";
import { Skeleton } from "@/components/ui/skeleton";
import { articles } from "@/data/mockData";
import type { ContentBlock } from "@/data/mockData";
import { useArticleBySlug } from "@/hooks/useSupabaseQueries";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: dbArticle, isLoading } = useArticleBySlug(slug);
  const mockArticle = articles.find((a) => a.slug === slug);

  // Merge DB + mock fallback. DB takes precedence; mock provides nice content if DB row missing.
  const article = dbArticle
    ? {
        id: dbArticle.id as string | undefined,
        slug: dbArticle.slug,
        title: dbArticle.title,
        tags: mockArticle?.tags ?? [],
        readTime: dbArticle.read_time ?? mockArticle?.readTime ?? "5 min",
        author: mockArticle?.author ?? "NeuraArch",
        date: new Date(dbArticle.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        content: ((dbArticle.content as unknown) as ContentBlock[]) ?? mockArticle?.content ?? [],
        youtubeId: dbArticle.youtube_id ?? mockArticle?.youtubeId,
      }
    : mockArticle
    ? { ...mockArticle, id: undefined as string | undefined }
    : null;

  const [activeHeading, setActiveHeading] = useState("");
  const headings = (article?.content ?? []).filter(
    (b): b is ContentBlock & { type: "heading"; level: 2; text: string } =>
      b.type === "heading" && (b as any).level === 2
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.text.toLowerCase().replace(/\s+/g, "-"));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [article?.slug]);

  if (isLoading && !mockArticle) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="aspect-video w-full rounded-xl" />
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="font-heading text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to tutorials</Link>
        </div>
      </div>
    );
  }

  const related = articles
    .filter((a) => a.slug !== slug && a.tags.some((t) => article.tags.includes(t)))
    .slice(0, 3)
    .map((a) => ({ slug: a.slug, title: a.title, tags: a.tags, type: "blog" as const }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">Tutorials</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{article.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_240px] gap-12">
            {/* Main content */}
            <article className="max-w-none animate-fade-up">
              <div className="mb-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((t) => <TagChip key={t} tag={t} />)}
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">{article.title}</h1>
                <AuthorInfo author={article.author} date={article.date} readTime={article.readTime} />
              </div>

              {/* Hero image area */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-10 border border-border">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>

              <RichTextRenderer blocks={article.content} />

              {/* YouTube CTA */}
              {article.youtubeId && (
                <div className="mt-10 p-6 rounded-xl border border-accent/30 bg-accent/5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <p className="font-heading font-bold text-foreground">📺 Watch the full breakdown on YouTube</p>
                    <p className="text-sm text-muted-foreground mt-1">Visual walkthrough with code examples and architecture diagrams.</p>
                  </div>
                  <a href={`https://youtube.com/watch?v=${article.youtubeId}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all shrink-0">
                    Watch Video
                  </a>
                </div>
              )}

              <ReactionBar initialLikes={42} />
              <CommentThread articleId={article.id} />
              <RelatedContent items={related} />
            </article>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h4 className="font-heading text-sm font-bold mb-4 text-foreground">Table of Contents</h4>
                  <nav className="space-y-2">
                    {headings.map((h) => {
                      const id = h.text.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <a
                          key={id}
                          href={`#${id}`}
                          className={`block text-sm transition-colors ${activeHeading === id ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          {h.text}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
