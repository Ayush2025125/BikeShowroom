import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BikeList from "../components/BikeList";
import HeroCarousel from "../components/HeroCarousel";
import TyreList from "../components/TyreList";
import MotorcycleBoard from "../components/ui/MotorcycleBoard";
import TestimonialsSection from "../components/TestimonialSection";
import Banner from "../components/Banner";
import ContactUs from "../components/ui/ContactUs";

// Reusable Section Title Component
const SectionTitle = ({
  title,
  subtitle,
  gradientFrom = "from-blue-600",
  gradientTo = "to-purple-600",
  className = "",
}) => (
  <section
    className={`text-center py-8 bg-square-grid ${className}`}
  >
    <div className="container bg-square-grid mx-auto px-4">
      <h2 className="font-bold text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
      <div
        className={`w-24 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} mx-auto mt-6 rounded-full shadow-sm`}
      />
    </div>
  </section>
);

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-50 py-16">
    <div className="container mx-auto px-4 sm:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="h-48 bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Error boundary fallback
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble loading the page. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-200">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative">
          <HeroCarousel />
        </section>

        {/* Bikes Section */}
        <SectionTitle
          title="Unleash the Rider in You"
          subtitle="Select from Our Exclusive Fleet of Premium Two-Wheelers"
        />

        <section className=" bg-square-grid py-1 px-4 sm:px-10">
          <div className="container mx-auto">
            {isLoading ? <LoadingSkeleton /> : <BikeList />}
          </div>
        </section>

        {/* Tyres Section */}
        <SectionTitle
          title="Find the Perfect Tyre for Every Journey"
          subtitle="Premium Quality Tyres Engineered for Performance and Safety"
          gradientFrom="from-green-600"
          gradientTo="to-blue-600"
        />

        <section className="bg-square-grid py-1 px-4 sm:px-10">
          <div className="container mx-auto">
            {isLoading ? <LoadingSkeleton /> : <TyreList />}
          </div>
        </section>

        {/* Motorcycle Board Section */}
        <section className="py-8 bg-square-grid">
          <MotorcycleBoard />
        </section>
      </main>
    <ContactUs />

      <Banner />

      <TestimonialsSection />

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

// Scroll to Top Component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default LandingPage;
