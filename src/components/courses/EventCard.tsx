import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import type { Event } from "@/data/coursesData";

const EventCard = ({ event }: { event: Event }) => (
  <Link
    to={`/events/${event.slug}`}
    className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-card-hover"
  >
    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
      <span className="inline-flex items-center gap-1.5"><Calendar size={14} /> {event.date}</span>
      <span className="inline-flex items-center gap-1.5"><Clock size={14} /> {event.time}</span>
    </div>
    <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
      {event.title}
    </h3>
    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{event.description}</p>
    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
      Register Now →
    </span>
  </Link>
);

export default EventCard;
