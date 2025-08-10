import React, { memo, useMemo } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import heroImg1 from "../assets/bk1.jpg";
import heroImg2 from "../assets/bk2.jpg";
import heroImg3 from "../assets/bike1.jpg";

// Memoized slide data
const SLIDES_DATA = [
  {
    img: heroImg1,
    title: "Own the Ride",
    subtitle: "You Deserve",
    description: "Experience the ultimate freedom on two wheels"
  },
  {
    img: heroImg2,
    title: "Feel the Freedom",
    subtitle: "on Two Wheels",
    description: "Discover endless possibilities on every journey"
  },
  {
    img: heroImg3,
    title: "Your Next Journey",
    subtitle: "Starts Here",
    description: "Adventure awaits around every corner"
  }
];

// Memoized particle component for better performance
const AnimatedParticles = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse" />
    <div 
      className="absolute top-3/4 right-1/4 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-bounce" 
      style={{ animationDelay: '1s' }}
    />
    <div 
      className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-25 animate-ping" 
      style={{ animationDelay: '2s' }}
    />
  </div>
));

AnimatedParticles.displayName = 'AnimatedParticles';

// Memoized decorative elements
const DecorativeElements = memo(() => (
  <>
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-32 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60" />
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-32 w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-60" />
    <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 hidden sm:block">
      <div className="w-1 h-16 bg-gradient-to-b from-white/60 to-transparent rounded-full animate-pulse" />
    </div>
  </>
));

DecorativeElements.displayName = 'DecorativeElements';

// Memoized slide component
const CarouselSlide = memo(({ slide, index }) => (
  <div key={index} className="relative h-[100vh] max-h-[800px] min-h-[600px] w-full">
    {/* Background Image */}
    <div className="absolute inset-0 overflow-hidden w-full">
      <img 
        src={slide.img} 
        alt={`${slide.title} - ${slide.subtitle}`}
        className="w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms] ease-out hover:scale-110"
        loading={index === 0 ? "eager" : "lazy"}
      />
    </div>
    
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-135 from-black/70 via-black/40 to-black/70" />
    
    {/* Animated Particles */}
    <AnimatedParticles />
    
    {/* Content */}
    <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 text-center text-white w-full">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 w-full">
        {/* Main Title */}
        <div className="overflow-hidden w-full">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-tight opacity-0 animate-slide-up">
            <span className="block bg-gradient-to-r from-white via-gray-100 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
              {slide.title}
            </span>
            <span className="block text-2xl sm:text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 drop-shadow-xl">
              {slide.subtitle}
            </span>
          </h1>
        </div>
        
        {/* Description */}
        {slide.description && (
          <div className="overflow-hidden w-full">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto opacity-0 animate-slide-left drop-shadow-lg">
              {slide.description}
            </p>
          </div>
        )}
      </div>
    </div>
    
    {/* Decorative Elements */}
    <DecorativeElements />
  </div>
));

CarouselSlide.displayName = 'CarouselSlide';

// CSS-in-JS styles moved to a separate object for better organization
const carouselStyles = `
  * {
    box-sizing: border-box;
  }
  
  .carousel-root {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  .carousel {
    overflow: hidden;
    width: 100%;
  }
  
  .carousel .slide {
    background: transparent;
  }
  
  .carousel .control-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    margin: 0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .carousel .control-dots .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .carousel .control-dots .dot.selected {
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    transform: scale(1.3);
    box-shadow: 0 0 25px rgba(255, 107, 53, 0.7), 0 4px 15px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
  }
  
  .carousel .control-next.control-arrow,
  .carousel .control-prev.control-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(15px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    opacity: 0.8;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    color: white;
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
  
  .carousel .control-next.control-arrow:hover,
  .carousel .control-prev.control-arrow:hover {
    background: rgba(255, 107, 53, 0.8);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4);
    opacity: 1;
  }
  
  .carousel .control-next.control-arrow {
    right: 20px;
  }
  
  .carousel .control-prev.control-arrow {
    left: 20px;
  }
  
  .carousel .control-next.control-arrow:before,
  .carousel .control-prev.control-arrow:before {
    border: none;
    content: '';
    display: none;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-slide-up {
    animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-slide-left {
    animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
  }
  
  @media (max-width: 768px) {
    .carousel .control-next.control-arrow,
    .carousel .control-prev.control-arrow {
      width: 50px;
      height: 50px;
      font-size: 16px;
      opacity: 0.6;
      backdrop-filter: blur(8px);
    }
    
    .carousel .control-next.control-arrow {
      right: 10px;
    }
    
    .carousel .control-prev.control-arrow {
      left: 10px;
    }
    
    .carousel .control-dots {
      bottom: 12px;
      padding: 12px 16px;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(8px);
    }
    
    .carousel .control-dots .dot {
      width: 10px;
      height: 10px;
      margin: 0 6px;
    }
    
    .carousel .control-dots .dot.selected {
      transform: scale(1.2);
    }
  }
  
  @media (max-width: 480px) {
    .carousel .control-next.control-arrow,
    .carousel .control-prev.control-arrow {
      width: 45px;
      height: 45px;
      font-size: 14px;
      right: 8px;
      left: 8px;
      opacity: 0.5;
    }
    
    .carousel .control-next.control-arrow {
      right: 8px;
    }
    
    .carousel .control-prev.control-arrow {
      left: 8px;
    }
    
    .carousel .control-dots {
      bottom: 10px;
      padding: 10px 14px;
      border-radius: 25px;
    }
    
    .carousel .control-dots .dot {
      width: 8px;
      height: 8px;
      margin: 0 5px;
    }
  }
`;

// Configuration object for carousel settings
const CAROUSEL_CONFIG = {
  showThumbs: false,
  autoPlay: true,
  infiniteLoop: true,
  showStatus: false,
  interval: 6000, // Slightly longer on mobile for better UX
  transitionTime: 600, // Faster transitions on mobile
  emulateTouch: true,
  swipeable: true,
  preventMovementUntilSwipeScrollTolerance: true,
  swipeScrollTolerance: 50,
  className: "w-full h-[100vh] max-h-[800px] min-h-[500px] sm:min-h-[600px]",
  style: { margin: 0, padding: 0, width: '100%', overflow: 'hidden' }
};

const HeroCarousel = memo(() => {
  // Memoize slides to prevent unnecessary re-renders
  const slides = useMemo(() => SLIDES_DATA, []);
  
  // Memoize rendered slides
  const renderedSlides = useMemo(
    () => slides.map((slide, index) => (
      <CarouselSlide key={slide.title} slide={slide} index={index} />
    )),
    [slides]
  );

  return (
    <div className="relative w-full overflow-hidden">
      <style jsx>{carouselStyles}</style>
      
      <Carousel {...CAROUSEL_CONFIG}>
        {renderedSlides}
      </Carousel>
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
});

HeroCarousel.displayName = 'HeroCarousel';

export default HeroCarousel;