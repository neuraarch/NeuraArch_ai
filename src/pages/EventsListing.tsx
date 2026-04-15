import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/courses/EventCard";
import { events } from "@/data/coursesData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const EventsListing = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={ref} className={`max-w-2xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
              Live AI Sessions & <span className="text-gradient-primary">Webinars</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Join live deep dives, Q&A sessions, and hands-on workshops with the NeuraArch team.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <div key={event.slug} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventsListing;
