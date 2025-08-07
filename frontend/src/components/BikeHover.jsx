import React, { useState } from 'react';
import bg from "../assets/hover1.jpg";
import cutout from "../assets/cutout1.png";

const BikeHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="relative w-full aspect-video bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Background Image */}
          <img 
            src={bg}
            alt="Showroom"
            className="w-full h-full object-cover"
          />
          
          {/* Single Bike Cutout Overlay */}
          <div
            className="absolute inset-0 cursor-pointer transition-all duration-500 ease-out"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src={cutout}
              alt="Bike Cutout"
              className="w-full h-full object-cover transition-all duration-500"
              style={{
                filter: isHovered 
                  ? 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.4)) brightness(1.1)' 
                  : 'none'
              }}
            />
          </div>
          
          {/* Tooltip */}
          {isHovered && (
            <div className="absolute top-6 left-6 bg-white p-4 rounded-lg shadow-xl border z-30">
              <h3 className="font-bold text-lg text-gray-800 mb-2">Premium Bike</h3>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">Engine: <span className="font-semibold text-blue-600">1000cc</span></p>
                <p className="text-gray-600 text-sm">Max Speed: <span className="font-semibold text-green-600">200km/h</span></p>
                <p className="text-gray-600 text-sm">Price: <span className="font-bold text-purple-600">$15,000</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeHover;