import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorInfo from "@/components/content/AuthorInfo";
import TagChip from "@/components/content/TagChip";
import RichTextRenderer from "@/components/content/RichTextRenderer";
import ReactionBar from "@/components/content/ReactionBar";
import CommentThread from "@/components/content/CommentThread";
import RelatedContent from "@/components/content/RelatedContent";
import { posts, mockComments } from "@/data/mockData";

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
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
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
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
          <CommentThread comments={mockComments} />
          <RelatedContent items={related} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
