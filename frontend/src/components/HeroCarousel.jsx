import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

import heroImg1 from "../assets/bike1.jpg";
import heroImg2 from "../assets/bike2.jpg";
import heroImg3 from "../assets/bike3.avif";

const HeroCarousel = () => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      showStatus={false}
      interval={4000}
      transitionTime={1000}
      emulateTouch
      swipeable
      className="w-full max-h-[600px]"
    >
      {[heroImg1, heroImg2, heroImg3].map((img, index) => (
        <div key={index} className="relative">
          <img src={img} alt={`Slide ${index + 1}`} className="object-cover w-full max-h-[600px]" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-white text-5xl font-bold text-center px-4">
              {index === 0 && "Own the Ride You Deserve"}
              {index === 1 && "Feel the Freedom on Two Wheels"}
              {index === 2 && "Your Next Journey Starts Here"}
            </h1>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;
