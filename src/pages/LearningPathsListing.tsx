import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const levelColor: Record<string, string> = {
  Beginner: "text-green-400 border-green-400/30 bg-green-400/10",
  Intermediate: "text-primary border-primary/30 bg-primary/10",
  Advanced: "text-accent border-accent/30 bg-accent/10",
};

const LearningPathsListing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["learning_paths"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("learning_paths")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs mb-4">
              <Sparkles size={12} /> Structured Roadmaps
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
              Learning <span className="text-gradient-primary">Paths</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Structured roadmaps to master AI systems — from foundations to autonomous agents.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-card/50 border border-border animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {data?.map((path) => (
                <motion.div
                  key={path.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={`/learning-paths/${path.slug}`}
                    className="group block p-6 rounded-xl bg-card border border-border glow-card hover:glow-card-hover hover:-translate-y-1 transition-all duration-300 h-full"
                  >
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        levelColor[path.level] || levelColor.Beginner
                      }`}
                    >
                      {path.level}
                    </span>
                    <h3 className="font-heading text-xl font-semibold mt-4 mb-2">{path.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{path.description}</p>
                    {path.tags && path.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {path.tags.slice(0, 3).map((t: string) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors inline-flex items-center gap-1">
                      Explore Path <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningPathsListing;
