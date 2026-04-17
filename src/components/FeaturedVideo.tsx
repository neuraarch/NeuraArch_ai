import { useScrollReveal } from "@/hooks/useScrollReveal";

const FeaturedVideo = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div
            className={`lg:col-span-3 rounded-xl overflow-hidden border border-border glow-card aspect-video bg-card ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/6qFdIv2dn78"
              title="Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div
            className={`lg:col-span-2 space-y-5 ${isVisible ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"}`}
          >
            <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">Featured</span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">Building Production RAG from Scratch</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2 items-start">
                <span className="text-primary mt-0.5">▹</span>
                End-to-end RAG pipeline architecture
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary mt-0.5">▹</span>
                Chunking strategies that actually work
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-primary mt-0.5">▹</span>
                Evaluation beyond vibes
              </li>
            </ul>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all hover:shadow-[0_0_20px_hsl(24,85%,55%,0.3)]"
            >
              Watch Full Video
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideo;
