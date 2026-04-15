import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaitlistForm from "@/components/forms/WaitlistForm";
import InquiryForm from "@/components/forms/InquiryForm";
import { courses } from "@/data/coursesData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CheckCircle, Users, BookOpen } from "lucide-react";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const { ref, isVisible } = useScrollReveal();

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-2">Course not found</h1>
          <Link to="/courses" className="text-primary hover:underline text-sm">← Back to courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        {/* Hero */}
        <section ref={ref} className="container mx-auto px-4 md:px-6 mb-16">
          <div className={`max-w-3xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors mb-6 inline-block">
              ← All Courses
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {course.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-0.5 text-xs rounded-full border border-border text-muted-foreground">{tag}</span>
              ))}
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full border bg-accent/20 text-accent border-accent/30">
                Coming Soon
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{course.description}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#waitlist" className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent">
                Join Waitlist
              </a>
              <a href="#inquiry" className="px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/50 transition-colors">
                Request Info
              </a>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            {/* What You'll Learn */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle size={22} className="text-primary" /> What You'll Learn
              </h2>
              <ul className="space-y-3">
                {course.learnings.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Who This Is For */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
                <Users size={22} className="text-primary" /> Who This Is For
              </h2>
              <ul className="space-y-3">
                {course.audience.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
                <BookOpen size={22} className="text-primary" /> Curriculum Preview
              </h2>
              <Accordion type="single" collapsible className="border border-border rounded-xl overflow-hidden">
                {course.modules.map((mod, i) => (
                  <AccordionItem key={i} value={`mod-${i}`} className="border-border">
                    <AccordionTrigger className="px-5 hover:no-underline hover:text-primary">
                      {mod.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 text-muted-foreground">
                      {mod.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Instructor */}
            <section>
              <h2 className="font-heading text-2xl font-bold mb-6">Instructor</h2>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading font-bold text-lg">
                  {course.instructor.name[0]}
                </div>
                <div>
                  <p className="font-heading font-semibold">{course.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{course.instructor.role}</p>
                </div>
              </div>
            </section>

            {/* CTA Block */}
            <section className="rounded-xl border border-border bg-card p-8 text-center">
              <h2 className="font-heading text-2xl font-bold mb-2">Start your AI journey today</h2>
              <p className="text-muted-foreground mb-6">Join the waitlist and be the first to know when we launch.</p>
              <a href="#waitlist" className="inline-block px-8 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all glow-accent">
                Join Waitlist
              </a>
            </section>
          </div>

          {/* Sidebar Forms */}
          <aside className="space-y-8">
            <div id="waitlist" className="rounded-xl border border-border bg-card p-6 sticky top-24">
              <h3 className="font-heading text-lg font-bold mb-4">Join the Waitlist</h3>
              <WaitlistForm context={course.title} />
            </div>
            <div id="inquiry" className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-heading text-lg font-bold mb-4">Have Questions?</h3>
              <InquiryForm />
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetail;
