import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 30% Off",
    description: "Get amazing discounts on premium bikes this summer",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    title: "Trade-In Bonus",
    subtitle: "Extra $2000 Credit",
    description: "Trade in your old bike and get extra credit towards a new one",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&h=600&fit=crop",
    buttonText: "Learn More",
  },
  {
    id: 3,
    title: "Zero Interest Financing",
    subtitle: "0% APR for 12 Months",
    description: "Qualified buyers can enjoy zero interest financing",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&h=600&fit=crop",
    buttonText: "Apply Now",
  },
  {
    id: 4,
    title: "Service Special",
    subtitle: "Free Oil Change",
    description: "Complimentary oil change with any service over $200",
    image: "https://images.unsplash.com/photo-1558877385-8c207b5c4b78?w=1200&h=600&fit=crop",
    buttonText: "Book Service",
  },
];

// Tire Showcase Section Component
const TireShowcaseSection = () => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image Container */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img 
            src="/path-to-your-tire-image.jpg" 
            alt="MRF Tires Showcase - MOGRIP METEOR, REVZ-C1, NYLOGRIP EZEERIDE"
            className="w-full h-80 object-cover"
          />
        </div>
        
        {/* Description Text */}
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            At our showroom, we bring you the best of both worlds — powerful Bajaj bikes and the iconic Royal Enfield Bullet series, built for performance, style, and reliability. Whether you're a city commuter or a long-distance rider, we have the perfect bike to match your needs. All our bikes come fitted with MRF tires, trusted across India for their strong grip, excellent durability, and smooth performance on every terrain. We not only sell two-wheelers, but also provide expert maintenance, servicing, and genuine spare parts support. Our team is committed to delivering a smooth buying experience, on-road assistance, and after-sales care. We also offer affordable finance options to help you ride home worry-free. Choose us for a complete biking solution — from rugged Royal Enfields to sporty Bajaj models — all equipped with the unmatched quality of MRF tires. Step into our showroom and experience performance, safety, and trust under one roof.
          </p>
          <p>
            At our showroom, we bring you the best of both worlds — powerful Bajaj bikes and the iconic Royal Enfield Bullet series, built for performance, style, and reliability. Whether you're a city commuter or a long-distance rider, we have the perfect bike to match your needs. All our bikes come fitted with MRF tires, trusted across India for their strong grip, excellent durability, and smooth performance on every terrain. We not only sell two-wheelers, but also provide expert maintenance, servicing, and genuine spare parts support. Our team is committed to delivering a smooth buying experience, on-road assistance, and after-sales care. We also offer affordable finance options to help you ride home worry-free. Choose us for a complete biking solution — from rugged Royal Enfields to sporty Bajaj models — all equipped with the unmatched quality of MRF tires. Step into our showroom and experience performance, safety, and trust under one roof.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Carousal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    }, 3000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  const resumeAutoPlayWithDelay = useCallback(() => {
    clearTimeout(autoPlayTimeoutRef.current);
    autoPlayTimeoutRef.current = setTimeout(() => {
      startAutoPlay();
    }, 3000);
  }, [startAutoPlay]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    stopAutoPlay();
    resumeAutoPlayWithDelay();
  }, [stopAutoPlay, resumeAutoPlayWithDelay]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
    stopAutoPlay();
    resumeAutoPlayWithDelay();
  }, [stopAutoPlay, resumeAutoPlayWithDelay]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    stopAutoPlay();
    resumeAutoPlayWithDelay();
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
      clearTimeout(autoPlayTimeoutRef.current);
    };
  }, [startAutoPlay, stopAutoPlay]);

  return (
    <div className="flex-grow py-12 px-4 ">
      <div className="relative w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Slides */}
        <div className="relative h-96 md:h-[500px]">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    {offer.title}
                  </h2>
                  <h3 className="text-2xl md:text-3xl text-yellow-400 font-semibold mb-4">
                    {offer.subtitle}
                  </h3>
                  <p className="text-lg md:text-xl mb-8 text-gray-200">
                    {offer.description}
                  </p>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                    {offer.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-yellow-500 w-8"
                  : "bg-white bg-opacity-60 hover:bg-opacity-90 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
