import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedCourses from "@/components/FeaturedCourses";
import CareerAssistance from "@/components/CareerAssistance";
import PlacementsSection from "@/components/PlacementsSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <StatsSection />
          <ServicesSection />
          <FeaturedCourses />
          <CareerAssistance />
          <PlacementsSection />
          <PartnersSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
