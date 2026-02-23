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
import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";

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

        {/* Floating Job Fair Button */}
        <Link
          to="/register"
          className="fixed bottom-[150px] right-2 z-40 group"
          title="Careers"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <button className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </button>
            <span className="absolute -left-2 bottom-full mb-2 bg-foreground text-background text-xs font-semibold py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Careers
            </span>
          </div>
        </Link>
      </div>
    </PageTransition>
  );
};

export default Index;
