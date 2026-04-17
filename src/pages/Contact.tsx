import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/forms/InquiryForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mail, MessageSquare, Handshake } from "lucide-react";

const reasons = [
  { icon: MessageSquare, title: "Feedback", desc: "Tell us what's working and what's not." },
  { icon: Mail, title: "Course Inquiries", desc: "Questions about a specific course or path." },
  { icon: Handshake, title: "Collaboration", desc: "Partnerships, guest sessions, or sponsorships." },
];

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div ref={ref} className={`max-w-2xl mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
              Get in <span className="text-gradient-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Have a question, idea, or want to collaborate? Send us a message — we read every one.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              {reasons.map((r) => (
                <div
                  key={r.title}
                  className="p-5 rounded-xl border border-border bg-card/50 hover:border-primary/50 transition-all"
                >
                  <r.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-heading font-semibold mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card/50 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-heading text-xl font-semibold mb-6">Send a message</h2>
              <InquiryForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
