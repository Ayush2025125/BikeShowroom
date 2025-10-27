import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/hover.webp";

const BikeHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/bikes");
  };

  return (
    <div className="px-2 sm:px-4 pt-4 sm:pt-10 pb-6 sm:pb-16">
      <div className="mx-auto w-full sm:max-w-6xl">
        <div 
          className="relative w-full aspect-[16/9] rounded-lg shadow-md overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background with zoom effect */}
          <img 
            src={bg} 
            alt="Showroom" 
            className="w-full h-full object-cover transition-transform duration-700 ease-out"
            style={{
              transform: isHovered ? "scale(1.1)" : "scale(1)",
            }}
          />

          {/* Bike Cards Overlay */}
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center gap-6 sm:gap-10 px-4 animate-fadeIn">
              {/* Bike Card 1 - Sport */}
              <div className="relative w-full max-w-[380px] sm:w-[450px] bg-gradient-to-b from-gray-800/60 to-black/60 backdrop-blur-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 shadow-2xl">
                {/* Sport Badge */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full">
                  Sport
                </div>
                
                {/* Icon */}
                <div className="absolute top-4 left-4 bg-orange-500 p-2 sm:p-2.5 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                  </svg>
                </div>

                <div className="pt-20 sm:pt-24 pb-6 px-6 sm:px-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">Dominar 400</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 tracking-wide">STARTING PRICE</p>
                  
                  {/* Color Badge */}
                  <div className="flex items-center gap-2 mb-5 sm:mb-6">
                    <div className="w-4 h-4 rounded-full bg-gray-900 border-2 border-gray-600"></div>
                    <span className="text-gray-300 text-sm">Charcoal Black</span>
                  </div>
                  
                  {/* View Details Button with diagonal stripes */}
                  <button 
                    onClick={handleViewDetails}
                    className="relative w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3.5 sm:py-4 rounded-2xl transition-all duration-300 mb-5 sm:mb-6 overflow-hidden text-base sm:text-lg">
                    <span className="relative z-10">View Details</span>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                    }}></div>
                  </button>
                  
                  {/* Stats */}
                  <div className="flex justify-between text-white text-sm sm:text-base border-t border-gray-700 pt-4 sm:pt-5">
                    <div className="text-center flex-1">
                      <p className="font-bold text-lg sm:text-xl">40 PS</p>
                      <p className="text-gray-400 mt-1">Power</p>
                    </div>
                    <div className="w-px bg-gray-700"></div>
                    <div className="text-center flex-1">
                      <p className="font-bold text-lg sm:text-xl">155 km/h</p>
                      <p className="text-gray-400 mt-1">Top Speed</p>
                    </div>
                    <div className="w-px bg-gray-700"></div>
                    <div className="text-center flex-1">
                      <p className="font-bold text-lg sm:text-xl">7.1s</p>
                      <p className="text-gray-400 mt-1">0-100km/h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bike Card 2 - Cruiser */}
              <div className="relative w-full max-w-[380px] sm:w-[450px] bg-gradient-to-b from-gray-800/60 to-black/60 backdrop-blur-lg rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 shadow-2xl">
                {/* Cruiser Badge */}
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full">
                  Cruiser
                </div>
                
                {/* Icon */}
                <div className="absolute top-4 left-4 bg-blue-500 p-2 sm:p-2.5 rounded-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>

                <div className="pt-20 sm:pt-24 pb-6 px-6 sm:px-8">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">Dominar 400</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 tracking-wide">STARTING PRICE</p>
                  
                  {/* Color Badge */}
                  <div className="flex items-center gap-2 mb-5 sm:mb-6">
                    <div className="w-4 h-4 rounded-full bg-teal-400 border-2 border-teal-300"></div>
                    <span className="text-gray-300 text-sm">Aqua Green</span>
                  </div>
                  
                  {/* View Details Button with diagonal stripes */}
                  <button 
                    onClick={handleViewDetails}
                    className="relative w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3.5 sm:py-4 rounded-2xl transition-all duration-300 mb-5 sm:mb-6 overflow-hidden text-base sm:text-lg">
                    <span className="relative z-10">View Details</span>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                    }}></div>
                  </button>
                  
                  {/* Stats */}
                  <div className="flex justify-between text-white text-sm sm:text-base border-t border-gray-700 pt-4 sm:pt-5">
                    <div className="text-center flex-1">
                      <p className="font-bold text-lg sm:text-xl">40 PS</p>
                      <p className="text-gray-400 mt-1">Power</p>
                    </div>
                    <div className="w-px bg-gray-700"></div>
                    <div className="text-center flex-1">
                      <p className="font-bold text-lg sm:text-xl">155 km/h</p>
                      <p className="text-gray-400 mt-1">Top Speed</p>
                    </div>
                    <div className="w-px bg-gray-700"></div>
                    <div className="text-center flex-1">
                      <p className="font-bold text-lg sm:text-xl">7.1s</p>
                      <p className="text-gray-400 mt-1">0-100km/h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeHover;