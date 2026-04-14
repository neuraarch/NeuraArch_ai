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

const Index = () => (
  <div className="min-h-screen bg-background text-foreground scroll-smooth">
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
  </div>
);

export default Index;
