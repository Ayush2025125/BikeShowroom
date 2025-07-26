import React from 'react';
import { bikeData } from '../data/BikeData';
import BikeCard from './ui/BikeCard';

export default function BikeList() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikeData.map((bike, index) => (
        <BikeCard key={index} {...bike} />
      ))}
    </div>
  );
}
