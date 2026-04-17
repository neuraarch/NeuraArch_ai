import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorInfo from "@/components/content/AuthorInfo";
import TagChip from "@/components/content/TagChip";
import RichTextRenderer from "@/components/content/RichTextRenderer";
import ReactionBar from "@/components/content/ReactionBar";
import CommentThread from "@/components/content/CommentThread";
import RelatedContent from "@/components/content/RelatedContent";
import { Skeleton } from "@/components/ui/skeleton";
import { posts } from "@/data/mockData";
import type { ContentBlock } from "@/data/mockData";
import { usePostById } from "@/hooks/useSupabaseQueries";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  // Slug here may be either DB id (uuid) or mock slug — try mock first by slug.
  const mockPost = posts.find((p) => p.slug === slug);
  const isUuid = !!slug && /^[0-9a-f-]{36}$/i.test(slug);
  const { data: dbPost, isLoading } = usePostById(isUuid ? slug : undefined);

  const post = dbPost
    ? {
        id: dbPost.id as string | undefined,
        slug: dbPost.id,
        headline: dbPost.headline,
        tags: mockPost?.tags ?? [],
        author: mockPost?.author ?? "NeuraArch",
        date: new Date(dbPost.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        likes: mockPost?.likes ?? 0,
        content: ((dbPost.content as unknown) as ContentBlock[]) ?? mockPost?.content ?? [],
      }
    : mockPost
    ? { ...mockPost, id: undefined as string | undefined }
    : null;

  if (isLoading && !mockPost) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl space-y-6">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-40" />
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <h1 className="font-heading text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/posts" className="text-primary hover:underline">← Back to insights</Link>
        </div>
      </div>
    );
  }

  const related = posts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.headline, tags: p.tags, type: "post" as const }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl animate-fade-up">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/posts" className="hover:text-primary transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{post.headline}</span>
          </nav>

          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => <TagChip key={t} tag={t} />)}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold leading-tight">{post.headline}</h1>
            <AuthorInfo author={post.author} date={post.date} />
          </div>

          <RichTextRenderer blocks={post.content} />

          <ReactionBar initialLikes={post.likes} />
          <CommentThread postId={post.id} />
          <RelatedContent items={related} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
