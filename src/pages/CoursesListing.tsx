import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/courses/CourseCard";
import TagChip from "@/components/content/TagChip";
import { useCourses } from "@/hooks/useSupabaseQueries";
import { courses as mockCourses } from "@/data/coursesData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CoursesListing = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal();
  const { data: dbCourses } = useCourses();

  const courses = useMemo(() => {
    if (dbCourses && dbCourses.length > 0) {
      return dbCourses.map((c) => ({
        slug: c.slug,
        title: c.title,
        description: c.description || "",
        tags: [] as string[],
        status: (c.status === "coming_soon" ? "coming-soon" : c.status) as any,
        modules: (c.course_modules || [])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((m) => ({ title: m.title, description: m.description || "" })),
        learnings: [],
        audience: [],
        instructor: { name: "NeuraArch Team", role: "AI Systems Architects", bio: "" },
      }));
    }
    return mockCourses;
  }, [dbCourses]);

  const allTags = Array.from(new Set(courses.flatMap((c) => c.tags)));
  const filtered = activeTag ? courses.filter((c) => c.tags.includes(activeTag)) : courses;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div ref={ref} className={`max-w-2xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
              AI Courses & <span className="text-gradient-primary">Learning Programs</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Deep, hands-on programs designed for engineers who want to build production AI systems — not just prototypes.
            </p>
          </div>

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <TagChip tag="All" active={!activeTag} onClick={() => setActiveTag(null)} />
              {allTags.map((tag) => (
                <TagChip key={tag} tag={tag} active={activeTag === tag} onClick={() => setActiveTag(tag)} />
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((course, i) => (
              <div key={course.slug} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesListing;
