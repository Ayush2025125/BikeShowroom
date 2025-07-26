import React from 'react';
import { Fuel, Gauge, Car, Settings } from 'lucide-react';

export default function BikeCard({
  image,
  name,
  priceRange,
  availability,
  kmPerDay,
  extraKmRate,
  extraHrRate,
  fuelType,
  transmission,
  capacity,
  onOfferClick
}) {
  return (
    <div className="border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1">
      {/* Image + availability */}
      <div className="relative p-4 bg-white">
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${
          availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
        }`}>
          {availability}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-2 text-center flex-1">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-gray-700 font-semibold">{priceRange}</p>

        <hr className="my-4" />

        <div className="grid grid-cols-3 text-sm gap-2 text-gray-700 mb-4">
          <div>
            <p className="text-red-500 font-semibold">Kilometer</p>
            <p className="font-bold">{kmPerDay}</p>
          </div>
          <div>
            <p className="text-red-500 font-semibold">Extra Km</p>
            <p className="font-bold">{extraKmRate}</p>
          </div>
          <div>
            <p className="text-red-500 font-semibold">Extra Hr</p>
            <p className="font-bold">{extraHrRate}</p>
          </div>
        </div>

        <div className="flex justify-around text-xs text-gray-600 pb-4">
          <div className="flex flex-col items-center">
            <Fuel className="w-5 h-5 text-red-500 mb-1" />
            <span className="font-medium">{fuelType}</span>
          </div>
          <div className="flex flex-col items-center">
            <Settings className="w-5 h-5 text-red-500 mb-1" />
            <span className="font-medium">{transmission}</span>
          </div>
          <div className="flex flex-col items-center">
            <Gauge className="w-5 h-5 text-red-500 mb-1" />
            <span className="font-medium">{capacity}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onOfferClick}
        className="bg-green-500 hover:bg-green-600 text-white py-3 font-semibold text-lg transition-colors duration-300"
      >
        View our offer
      </button>
    </div>
  );
}