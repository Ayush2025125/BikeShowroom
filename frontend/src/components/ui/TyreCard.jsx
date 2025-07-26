import React from 'react';
import { Phone, Wrench, Fuel, Users, Settings, Gauge } from 'lucide-react';

export const TyreCard = ({
  name,
  image,
  pricing,
  specs,
  features,
  onCallClick,
  onBookClick
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-red-200 border border-transparent">
      
      {/* Tyre Image */}
      <div className="relative p-4 bg-white group-hover:bg-gradient-to-br group-hover:from-gray-50 group-hover:to-red-50 transition-all duration-300">
        <img 
          src={image} 
          alt={name}
          className="w-full h-40 object-contain group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
        />
      </div>

      {/* Tyre Name */}
      <div className="px-6 pt-4 pb-2">
        <h3 className="text-xl font-bold text-gray-900 text-center group-hover:text-red-700 transition-colors duration-300">{name}</h3>
      </div>

      {/* Pricing */}
      <div className="px-6 py-2">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="group-hover:scale-105 transition-transform duration-300">
            <p className="text-red-400 font-medium group-hover:text-red-500">Single</p>
            <p className="font-bold text-gray-900 group-hover:text-red-700">{pricing["06-hrs"]}</p>
          </div>
          <div className="group-hover:scale-105 transition-transform duration-300 delay-75">
            <p className="text-red-400 font-medium group-hover:text-red-500">Pair</p>
            <p className="font-bold text-gray-900 group-hover:text-red-700">{pricing["12-hrs"]}</p>
          </div>
          <div className="group-hover:scale-105 transition-transform duration-300 delay-150">
            <p className="text-red-400 font-medium group-hover:text-red-500">Set of 4</p>
            <p className="font-bold text-gray-900 group-hover:text-red-700">{pricing["24-hrs"]}</p>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="px-6 py-2">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="group-hover:scale-105 transition-transform duration-300">
            <p className="text-red-400 font-medium group-hover:text-red-500">Size</p>
            <p className="font-bold text-gray-900 group-hover:text-red-700">{specs.kilometer}</p>
          </div>
          <div className="group-hover:scale-105 transition-transform duration-300 delay-75">
            <p className="text-red-400 font-medium group-hover:text-red-500">Load Rating</p>
            <p className="font-bold text-gray-900 group-hover:text-red-700">{specs.extraKm}</p>
          </div>
          <div className="group-hover:scale-105 transition-transform duration-300 delay-150">
            <p className="text-red-400 font-medium group-hover:text-red-500">Type</p>
            <p className="font-bold text-gray-900 group-hover:text-red-700">{specs.extraHr}</p>
          </div>
        </div>
      </div>

      {/* Features Icons */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 group-hover:shadow-md rounded-full flex items-center justify-center mb-1 transition-all duration-300">
              <Fuel className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-700 transition-colors duration-300">{features.fuel}</span>
          </div>
          <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-300 delay-75">
            <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 group-hover:shadow-md rounded-full flex items-center justify-center mb-1 transition-all duration-300">
              <Users className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-700 transition-colors duration-300">{features.capacity}</span>
          </div>
          <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-300 delay-150">
            <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 group-hover:shadow-md rounded-full flex items-center justify-center mb-1 transition-all duration-300">
              <Settings className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-700 transition-colors duration-300">{features.transmission}</span>
          </div>
          <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-300 delay-200">
            <div className="w-10 h-10 bg-red-50 group-hover:bg-red-100 group-hover:shadow-md rounded-full flex items-center justify-center mb-1 transition-all duration-300">
              <Gauge className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors duration-300" />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-700 transition-colors duration-300">{features.tank}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2">
        <button 
          onClick={onCallClick}
          className="bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 text-white py-4 font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-lg hover:scale-105"
        >
          <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
          Call
        </button>
        <button 
          onClick={onBookClick}
          className="bg-green-500 hover:bg-green-600 group-hover:bg-green-600 text-white py-4 font-semibold transition-all duration-300 flex items-center justify-center group-hover:shadow-lg hover:scale-105"
        >
          <Wrench className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          Book
        </button>
      </div>

    </div>
  );
}
