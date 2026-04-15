import { Link } from "react-router-dom";
import type { Course } from "@/data/coursesData";

const statusConfig = {
  "coming-soon": { label: "Coming Soon", cls: "bg-accent/20 text-accent border-accent/30" },
  live: { label: "Live", cls: "bg-primary/20 text-primary border-primary/30" },
  waitlist: { label: "Waitlist Open", cls: "bg-accent/20 text-accent border-accent/30" },
};

const CourseCard = ({ course }: { course: Course }) => {
  const status = statusConfig[course.status];

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-card-hover"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full border border-border text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${status.cls}`}>
          {status.label}
        </span>
      </div>
      <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {course.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{course.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{course.modules.length} modules</span>
        <span className="text-sm font-medium text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          {course.status === "live" ? "View Details" : "Join Waitlist"} →
        </span>
      </div>
    </Link>
  );
};

export default CourseCard;
