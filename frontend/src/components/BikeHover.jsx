import React, { useState } from "react";
import bg from "../assets/hover1.webp";
import cutout from "../assets/cutout1.png";

const BikeHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleHover = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <div className="px-2 sm:px-4 pt-4 sm:pt-10 pb-6 sm:pb-16">
      <div className="mx-auto w-full sm:max-w-6xl">
        <div className="relative w-full aspect-[16/9] rounded-lg shadow-md overflow-hidden">
          {/* Background */}
          <img src={bg} alt="Showroom" className="w-full h-full object-cover" />

          {/* Hover cutout */}
          <div
            className="absolute inset-0 cursor-pointer transition-transform duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleToggleHover}
            style={{
              transform: isHovered ? "scale(1.15)" : "scale(1.1)",
            }}
          >
            <img
              src={cutout}
              alt="Bike Cutout"
              className="w-full h-full object-contain transition-all duration-500"
              style={{
                filter: isHovered
                  ? "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.4)) brightness(1.1)"
                  : "none",
              }}
            />
          </div>

          {/* Top Premium Bike Bar */}
          {isHovered && (
            <div
              className="absolute top-0 left-0 w-full px-3 py-4 
               flex flex-col sm:flex-row 
               divide-y divide-white/20 sm:divide-y-0 sm:divide-x
               bg-black/50 backdrop-blur-md rounded-t-lg shadow-lg"
            >
              {/* Bike 2 */}
              <div className="flex-1 flex flex-col items-center justify-center py-3 sm:py-2 hover:bg-white/10 transition-colors">
                <span className="font-semibold text-base sm:text-lg tracking-wide text-white text-center">
                  Sportster X
                </span>
                <span className="mt-1 px-4 py-1 bg-red-500/80 text-white font-bold rounded-full text-sm sm:text-base">
                  $12,500
                </span>
              </div>

              {/* Bike 3 */}
              <div className="flex-1 flex flex-col items-center justify-center py-3 sm:py-2 hover:bg-white/10 transition-colors">
                <span className="font-semibold text-base sm:text-lg tracking-wide text-white text-center">
                  Cruiser Pro
                </span>
                <span className="mt-1 px-4 py-1 bg-red-500/80 text-white font-bold rounded-full text-sm sm:text-base">
                  $18,200
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeHover;
