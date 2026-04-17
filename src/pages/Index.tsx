import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import Tutorials from "@/components/Tutorials";
import FeaturedVideo from "@/components/FeaturedVideo";
import Insights from "@/components/Insights";
import Webinar from "@/components/Webinar";
import CourseSpotlight from "@/components/CourseSpotlight";
import PopularContent from "@/components/PopularContent";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

const Index = () => (
  <div className="relative min-h-screen bg-background text-foreground scroll-smooth overflow-hidden">
    {/* Ambient background orbs */}
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="bg-orb top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 animate-float-slow" />
      <div className="bg-orb top-[40%] right-[-10%] w-[600px] h-[600px] bg-accent/10 animate-float-slow [animation-delay:-4s]" />
      <div className="bg-orb bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-tertiary/10 animate-float-slow [animation-delay:-8s]" />
    </div>
    <Header />
    <HeroSection />
    <LearningPaths />
    <Tutorials />
    <FeaturedVideo />
    <Insights />
    <Webinar />
    <CourseSpotlight />
    <PopularContent />
    <Newsletter />
    <Footer />
    <StickyCTA />
  </div>
);

export default Index;
