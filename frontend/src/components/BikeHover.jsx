import React, { useState } from 'react';
import bg from "../assets/hover1.jpg";
import cutout from "../assets/cutout1.png";

const BikeHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleHover = () => {
    setIsHovered(prev => !prev);
  };

  return (
    <div className="bg-gray-100 px-2 sm:px-4 pt-4 sm:pt-10 pb-6 sm:pb-16">
      {/* Wrapper size adjusts with screen */}
      <div className="mx-auto w-full sm:max-w-6xl">
        <div className="relative w-full aspect-[16/9] bg-white rounded-lg shadow-md overflow-hidden">
          {/* Background */}
          <img 
            src={bg}
            alt="Showroom"
            className="w-full h-full object-cover"
          />

          {/* Hover cutout */}
          <div
            className="absolute inset-0 cursor-pointer transition-transform duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleToggleHover}
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <img 
              src={cutout}
              alt="Bike Cutout"
              className="w-full h-full object-contain transition-all duration-500"
              style={{
                filter: isHovered 
                  ? 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.4)) brightness(1.1)' 
                  : 'none'
              }}
            />
          </div>

          {/* Tooltip */}
          {isHovered && (
            <div className="absolute top-3 left-3 w-[92%] sm:w-64 max-w-sm bg-white p-3 rounded-md shadow-xl border z-30 text-sm sm:text-base">
              <h3 className="font-bold text-gray-800 mb-1 sm:mb-2">Premium Bike</h3>
              <p className="text-gray-600">Engine: <span className="font-semibold text-blue-600">1000cc</span></p>
              <p className="text-gray-600">Max Speed: <span className="font-semibold text-green-600">200km/h</span></p>
              <p className="text-gray-600">Price: <span className="font-bold text-purple-600">$15,000</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeHover;
