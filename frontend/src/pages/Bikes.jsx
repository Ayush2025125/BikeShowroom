import React, { useState } from 'react';
import { Star } from 'lucide-react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousal from '../components/Carousal';
import ShowcaseSection from '../components/ShowCaseSection';
import ShowOffer from '../components/modal/ShowOffer';
import bikeInfo from '../data/topSellingBikes';

const BikeCard = ({ bike, onCheckOffers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Bike Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
        <img 
          src={bike.image}
          alt={bike.name || "Bike Image"}
          className="w-full h-full object-cover"
        />
      </div>
       
      {/* Bike Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">{bike.name}</h3>
                 
        <div className="text-lg font-bold text-gray-900 mb-2">
          {bike.price}
        </div>
                 
        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700">{bike.rating?.toFixed(1) || 'N/A'}</span>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-sm text-gray-600">{bike.reviews || 0} Reviews</span>
        </div>
                 
        {/* Check Offers Button */}
        <button 
          onClick={() => onCheckOffers(bike)}
          className="w-full text-blue-600 font-medium text-sm py-2 px-4 border border-blue-600 rounded hover:bg-blue-50 transition-colors duration-200">
          Check Offers
        </button>
      </div>
    </div>
  );
};

const TopSellingsSection = () => {
  const [selectedBike, setSelectedBike] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckOffers = (bike) => {
    // Transform your bike data to match the modal's expected format
    const modalBikeData = {
      name: bike.name,
      images: bike.image ? [bike.image, bike.image, bike.image] : ["/api/placeholder/400/300"],
      price: bike.price,
      originalPrice: bike.originalPrice || "₹1,35,000", // Add original price to your bike data if available
      discount: bike.discount || "₹15,000 OFF", // Add discount to your bike data if available
      emi: bike.emi || "₹3,200/month", // Add EMI to your bike data if available
      range: bike.range || bike.mileage || "45-50 km/l",
      engine: bike.engine || "149cc",
      maxPower: bike.maxPower || "12.4 BHP",
      maxTorque: bike.maxTorque || "13.6 Nm",
      fuelCapacity: bike.fuelCapacity || "13L",
      offers: bike.offers || [
        "Zero down payment available",
        "Exchange bonus up to ₹10,000",
        "Extended warranty for 2 years",
        "Free service for 6 months"
      ]
    };
    
    setSelectedBike(modalBikeData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBike(null);
  };

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">OUR TOP SELLINGS</h2>
                 
        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {bikeInfo.map((bike) => (
            <BikeCard 
              key={bike.id} 
              bike={bike} 
              onCheckOffers={handleCheckOffers}
            />
          ))}
        </div>
                 
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 min-w-48">
            CONTACT US
          </button>
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 min-w-48">
            GET QUOTATION
          </button>
        </div>
      </div>

      {/* Modal - Using ShowOffer component */}
      <ShowOffer 
        isOpen={isModalOpen}
        onClose={closeModal}
        bikeData={selectedBike}
      />
    </div>
  );
};

export default function Bikes() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col gap-4">
      <Header />
      <Carousal />
      <TopSellingsSection />
      <ShowcaseSection />
      <Footer />
    </div>
  );
}