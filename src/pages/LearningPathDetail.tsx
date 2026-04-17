import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, PlayCircle, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const levelColor: Record<string, string> = {
  Beginner: "text-green-400 border-green-400/30 bg-green-400/10",
  Intermediate: "text-primary border-primary/30 bg-primary/10",
  Advanced: "text-accent border-accent/30 bg-accent/10",
};

const LearningPathDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: path, isLoading } = useQuery({
    queryKey: ["learning_path", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_paths")
        .select("*")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: tutorials } = useQuery({
    queryKey: ["learning_path_tutorials", path?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_path_tutorials")
        .select("order_index, duration, articles(id, title, slug, excerpt, read_time)")
        .eq("learning_path_id", path!.id)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!path?.id,
  });

  const { data: related } = useQuery({
    queryKey: ["learning_paths_related", path?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_paths")
        .select("*")
        .neq("id", path!.id)
        .limit(3);
      if (error) throw error;
      return data;
    },
    enabled: !!path?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 container mx-auto px-4">
          <div className="h-12 w-2/3 bg-card animate-pulse rounded mb-4" />
          <div className="h-6 w-full bg-card animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!path) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-28 pb-20 container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Path not found</h1>
          <p className="text-muted-foreground mb-6">This learning path doesn't exist or was removed.</p>
          <Link to="/learning-paths" className="text-primary hover:text-accent">← Back to Learning Paths</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link to="/learning-paths" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1 mb-6">
              ← All Learning Paths
            </Link>
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${levelColor[path.level] || levelColor.Beginner}`}>
              {path.level}
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-4 mb-4">
              {path.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{path.description}</p>
            {path.tags && path.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {path.tags.map((t: string) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* What you'll learn */}
          {path.what_you_learn && path.what_you_learn.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12 p-6 rounded-xl bg-card border border-border"
            >
              <h2 className="font-heading text-2xl font-semibold mb-5 flex items-center gap-2">
                <Sparkles size={20} className="text-primary" /> What You'll Learn
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {path.what_you_learn.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Tutorial list */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl font-semibold mb-6">Tutorials in This Path</h2>
            {tutorials && tutorials.length > 0 ? (
              <motion.ol
                className="space-y-3"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              >
                {tutorials.map((t: any, i: number) => {
                  const article = t.articles;
                  if (!article) return null;
                  return (
                    <motion.li
                      key={article.id}
                      variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                    >
                      <Link
                        to={`/blog/${article.slug}`}
                        className="group flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium group-hover:text-primary transition-colors">{article.title}</h3>
                          {article.excerpt && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.excerpt}</p>
                          )}
                          {(t.duration || article.read_time) && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <Clock size={12} /> {t.duration || article.read_time}
                            </div>
                          )}
                        </div>
                        <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ol>
            ) : (
              <div className="p-8 rounded-xl bg-card border border-border border-dashed text-center text-muted-foreground">
                Tutorials for this path are coming soon. Check back shortly!
              </div>
            )}
          </section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 text-center"
          >
            <h3 className="font-heading text-2xl font-semibold mb-3">Ready to start your journey?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Follow the tutorials in order and build production-ready AI systems step by step.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {tutorials && tutorials.length > 0 && tutorials[0].articles && (
                <Link
                  to={`/blog/${(tutorials[0].articles as any).slug}`}
                  className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all inline-flex items-center gap-2"
                >
                  Start Learning <ArrowRight size={16} />
                </Link>
              )}
              {path.intro_video_id && (
                <a
                  href={`https://youtu.be/${path.intro_video_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-border bg-card hover:border-primary/50 font-medium transition-all inline-flex items-center gap-2"
                >
                  <PlayCircle size={16} /> Watch Intro
                </a>
              )}
            </div>
          </motion.section>

          {/* Related */}
          {related && related.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-semibold mb-6">Related Paths</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/learning-paths/${r.slug}`}
                    className="group p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:-translate-y-1 transition-all"
                  >
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${levelColor[r.level] || levelColor.Beginner}`}>
                      {r.level}
                    </span>
                    <h4 className="font-heading font-semibold mt-3 mb-1 group-hover:text-primary transition-colors">{r.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningPathDetail;
