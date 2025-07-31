import React, { useState, useMemo } from 'react';
import ShowOffer from '../components/modal/ShowOffer';
import bikeInfo from '../data/topSellingBikes';
import {Star, Search, Filter, X, ChevronDown } from 'lucide-react';

const BikeCard = ({ bike, onCheckOffers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
        <img 
          src={bike.image}
          alt={bike.name || "Bike Image"}
          className="w-full h-full object-cover"
        />
      </div>
       
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">{bike.name}</h3>
                 
        <div className="text-lg font-bold text-gray-900 mb-2">
          {bike.price}
        </div>
                 
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700">{bike.rating?.toFixed(1) || 'N/A'}</span>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-sm text-gray-600">{bike.reviews || 0} Reviews</span>
        </div>
                 
        <button 
          onClick={() => onCheckOffers(bike)}
          className="w-full text-blue-600 font-medium text-sm py-2 px-4 border border-blue-600 rounded hover:bg-blue-50 transition-colors duration-200">
          Check Offers
        </button>
      </div>
    </div>
  );
};



const BikeDisplay = () => {
  const [selectedBike, setSelectedBike] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    engineRange: { min: '', max: '' },
    brands: [],
    rating: ''
  });

  // Helper function to extract brand from bike name if brand field is not available
  const extractBrandFromName = (name) => {
    const brands = ['Yamaha', 'Honda', 'Bajaj', 'TVS', 'Hero', 'Royal Enfield', 'KTM', 'Suzuki', 'Kawasaki'];
    return brands.find(brand => name.toLowerCase().includes(brand.toLowerCase())) || 'Other';
  };

  // Get unique brands for filter options - handle cases where brand might not be in data
  const availableBrands = [...new Set(bikeInfo.map(bike => bike.brand || extractBrandFromName(bike.name)).filter(Boolean))];

  // Filter and search bikes
  const filteredBikes = useMemo(() => {
    return bikeInfo.filter(bike => {
      // Search filter
      const matchesSearch = bike.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price filter - extract number from price string if priceValue not available
      const priceValue = bike.priceValue || parseInt(bike.price.replace(/[₹,]/g, ''));
      const matchesPrice = (!filters.priceRange.min || priceValue >= parseInt(filters.priceRange.min)) &&
                          (!filters.priceRange.max || priceValue <= parseInt(filters.priceRange.max));
      
      // Engine filter - extract number from engine string if engineValue not available
      const engineValue = bike.engineValue || parseInt(bike.engine?.replace(/cc/g, '') || '0');
      const matchesEngine = (!filters.engineRange.min || engineValue >= parseInt(filters.engineRange.min)) &&
                           (!filters.engineRange.max || engineValue <= parseInt(filters.engineRange.max));
      
      // Brand filter - use brand field or extract from name
      const bikeBrand = bike.brand || extractBrandFromName(bike.name);
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(bikeBrand);
      
      // Rating filter
      const matchesRating = !filters.rating || (bike.rating && bike.rating >= parseFloat(filters.rating));
      
      return matchesSearch && matchesPrice && matchesEngine && matchesBrand && matchesRating;
    });
  }, [searchTerm, filters]);

  const handleCheckOffers = (bike) => {
    const modalBikeData = {
      name: bike.name,
      images: bike.image ? [bike.image, bike.image, bike.image] : ["/api/placeholder/400/300"],
      price: bike.price,
      originalPrice: bike.originalPrice || "₹1,35,000",
      discount: bike.discount || "₹15,000 OFF",
      emi: bike.emi || "₹3,200/month",
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

  const handleBrandFilter = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: { min: '', max: '' },
      engineRange: { min: '', max: '' },
      brands: [],
      rating: ''
    });
    setSearchTerm('');
  };

  const hasActiveFilters = searchTerm || 
    filters.priceRange.min || filters.priceRange.max || 
    filters.engineRange.min || filters.engineRange.max || 
    filters.brands.length > 0 || filters.rating;

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">OUR TOP SELLINGS</h2>
        
        {/* Search and Filter Section */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bikes by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 border rounded-lg transition-colors ${
                showFilters ? 'bg-blue-50 border-blue-500 text-blue-600' : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-gray-50 p-6 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, min: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: { ...prev.priceRange, max: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Engine Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Engine (cc)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.engineRange.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        engineRange: { ...prev.engineRange, min: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.engineRange.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        engineRange: { ...prev.engineRange, max: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandFilter(brand)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.0">4.0+ Stars</option>
                    <option value="3.5">3.5+ Stars</option>
                    <option value="3.0">3.0+ Stars</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {filteredBikes.length} of {bikeInfo.length} bikes
            </p>
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                <div className="flex gap-2 flex-wrap">
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {filters.brands.map(brand => (
                    <span key={brand} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {brand}
                    </span>
                  ))}
                  {(filters.priceRange.min || filters.priceRange.max) && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Price: ₹{filters.priceRange.min || '0'} - ₹{filters.priceRange.max || '∞'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
                 
        {/* Bikes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => (
              <BikeCard 
                key={bike.id} 
                bike={bike} 
                onCheckOffers={handleCheckOffers}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No bikes found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters to see all bikes
              </button>
            </div>
          )}
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

export default BikeDisplay;