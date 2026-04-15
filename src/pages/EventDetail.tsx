import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/forms/RegistrationForm";
import { useEventBySlug } from "@/hooks/useSupabaseQueries";
import { events as mockEvents } from "@/data/coursesData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Calendar, Clock } from "lucide-react";

const EventDetail = () => {
  const { slug } = useParams();
  const { data: dbEvent } = useEventBySlug(slug);
  const { ref, isVisible } = useScrollReveal();

  // Use DB event or fallback to mock
  const mockEvent = mockEvents.find((e) => e.slug === slug);
  const event = dbEvent
    ? {
        id: dbEvent.id,
        title: dbEvent.title,
        date: new Date(dbEvent.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: new Date(dbEvent.event_date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
        description: dbEvent.description || "",
        takeaways: [] as string[],
        speaker: { name: dbEvent.speaker_name || "NeuraArch Team", role: dbEvent.speaker_title || "" },
      }
    : mockEvent
    ? { ...mockEvent, id: undefined as string | undefined }
    : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-2">Event not found</h1>
          <Link to="/events" className="text-primary hover:underline text-sm">← Back to events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-3 gap-12">
          <div ref={ref} className={`lg:col-span-2 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">
              ← All Events
            </Link>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-4">{event.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5"><Calendar size={16} /> {event.date}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={16} /> {event.time}</span>
            </div>
            <p className="text-muted-foreground text-lg mb-10">{event.description}</p>

            {event.takeaways.length > 0 && (
              <>
                <h2 className="font-heading text-xl font-bold mb-4">Key Takeaways</h2>
                <ul className="space-y-3 mb-10">
                  {event.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="font-heading text-xl font-bold mb-4">Speaker</h2>
            <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-lg">
                {event.speaker.name[0]}
              </div>
              <div>
                <p className="font-heading font-semibold">{event.speaker.name}</p>
                <p className="text-sm text-muted-foreground">{event.speaker.role}</p>
              </div>
            </div>
          </div>

          <aside>
            <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
              <h3 className="font-heading text-lg font-bold mb-4">Reserve Your Seat</h3>
              <RegistrationForm eventTitle={event.title} eventId={event.id} />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
