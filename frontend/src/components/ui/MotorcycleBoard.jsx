import React from "react";
import bike from "../../assets/bike2.jpg";

export default function MotorcycleStatsDashboard() {
  return (
    <div className="bg-black rounded-3xl p-8 flex items-center justify-between max-w-6xl mx-auto">
      {/* Left Section - Statistics */}
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <div className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-2">
            NUMBERS
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight">
            Explore the world with your own
            <br />
            way of driving
          </h2>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* 90k KM Completed */}
          <div>
            <div className="text-red-500 text-5xl font-bold mb-2">90k</div>
            <div className="text-white text-lg font-medium">KM Completed</div>
          </div>

          {/* 2+ Experience */}
          <div>
            <div className="text-red-500 text-5xl font-bold mb-2">2+</div>
            <div className="text-white text-lg font-medium">Experience</div>
          </div>

          {/* 2k+ Happy Clients */}
          <div>
            <div className="text-red-500 text-5xl font-bold mb-2">2k+</div>
            <div className="text-white text-lg font-medium">Happy Clients</div>
          </div>

          {/* 1k+ Total Vehicles */}
          <div>
            <div className="text-red-500 text-5xl font-bold mb-2">1k+</div>
            <div className="text-white text-lg font-medium">Total Vehicles</div>
          </div>
        </div>
      </div>

      {/* Right Section - Motorcycle Display */}
      <div className="flex-1 flex justify-center items-center relative">
        <div className="relative">
          {/* Circular glow background */}
          <div className="absolute inset-0 w-96 h-96 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 rounded-full opacity-80 blur-xl"></div>

          {/* Inner glow rings */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 h-4 bg-blue-400 rounded-full opacity-60 blur-lg"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-3 bg-blue-300 rounded-full opacity-80 blur-md"></div>

          {/* Motorcycle container */}
          <div className="relative z-10 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 rounded-full w-96 h-96 flex items-center justify-center p-8">
            {/* Top text overlay */}
            <div className="absolute top-6 right-1 text-right">
              <div className="text-white text-xs font-bold tracking-wider">
                ALL NEW
              </div>
              <div className="text-white text-lg font-bold">THE SPIRIT</div>
              <div className="text-white text-xs tracking-wider">
                RACING SPIRIT
              </div>
            </div>

            {/* Motorcycle Image in Perfect Circle */}
            <div className="w-[300px] h-[300px] rounded-full bg-white overflow-hidden flex items-center justify-center">
              <img
                src={bike}
                alt="Bike"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Bottom right specs */}
            <div className="absolute bottom-6 right-6 text-right">
              <div className="text-red-400 text-lg font-bold tracking-wider">
                CASHBACK
              </div>
              <div className="text-white text-sm font-bold">BDT 5,000/-</div>
            </div>

            {/* Side text */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90">
              <div className="text-white text-sm font-bold tracking-widest">
                WITH CHANNEL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
