import React from "react";
import { tyreData } from "../data/TyreData";
import { TyreCard } from "./ui/TyreCard";

export default function TyreList() {
  const handleCall = (tyreName) => {
    console.log(`Calling for ${tyreName}`);
    alert(`Calling for ${tyreName}`);
  };

  const handleBook = (tyreName) => {
    console.log(`Booking ${tyreName}`);
    alert(`Booking ${tyreName}`);
  };

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
      
        {/* Tyre Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tyreData.map((tyre, index) => (
            <TyreCard
              key={index}
              name={tyre.name}
              image={tyre.image}
              pricing={tyre.pricing}
              specs={tyre.specs}
              features={tyre.features}
              onCallClick={() => handleCall(tyre.name)}
              onBookClick={() => handleBook(tyre.name)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}