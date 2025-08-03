import React, { useState } from 'react';
import { Star, Search } from 'lucide-react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousal from '../components/Carousal';
import ShowcaseSection from '../components/ShowCaseSection';
import ShowOffer from '../components/modal/ShowOffer';
import { tyreData, getTyresByCategory, getTyresByPriceRange, getTyresByBrand, getTyresBySize } from "../data/TyreCardData";

const TyreCard = ({ tyre, onCheckOffers }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Tyre Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-slate-200 flex items-center justify-center">
        <img 
          src={tyre.image}
          alt={tyre.name || "Tyre Image"}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Tyre Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">{tyre.name}</h3>
        
        {/* Tyre Specifications */}
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Size: </span>{tyre.size || 'N/A'}
        </div>
        
        <div className="text-lg font-bold text-gray-900 mb-2">
          {tyre.price}
        </div>
        
        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700">{tyre.rating?.toFixed(1) || 'N/A'}</span>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-sm text-gray-600">{tyre.reviews || 0} Reviews</span>
        </div>
        
        {/* Additional Tyre Info */}
        {tyre.brand && (
          <div className="text-xs text-gray-500 mb-2">
            Brand: {tyre.brand}
          </div>
        )}
        
        {/* Check Offers Button */}
        <button 
          onClick={() => onCheckOffers(tyre)}
          className="w-full text-blue-600 font-medium text-sm py-2 px-4 border border-blue-600 rounded hover:bg-blue-50 transition-colors duration-200">
          Check Offers
        </button>
      </div>
    </div>
  );
};

const TopSellingsSection = () => {
  const [selectedTyre, setSelectedTyre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVehicleFilter, setActiveVehicleFilter] = useState('Car'); // Default to Car
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [activeBrandFilter, setActiveBrandFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('All');
  const [displayLimit, setDisplayLimit] = useState(8); // Show 8 tyres initially
  const [showLoadMore, setShowLoadMore] = useState(false);

  // Vehicle type mapping based on tyre sizes
  const getVehicleType = (size) => {
    const sizeNum = parseInt(size.split('/')[0]);
    if (sizeNum <= 175) return 'Bike';
    if (sizeNum <= 215) return 'Car';
    return 'Other';
  };

  // Filter tyres based on all active filters
  const getFilteredTyres = () => {
    let filtered = tyreData;

    // Vehicle type filter
    if (activeVehicleFilter !== 'All') {
      filtered = filtered.filter(tyre => getVehicleType(tyre.size) === activeVehicleFilter);
    }

    // Category filter
    if (activeCategoryFilter !== 'All') {
      filtered = filtered.filter(tyre => tyre.category === activeCategoryFilter);
    }

    // Brand filter
    if (activeBrandFilter !== 'All') {
      filtered = filtered.filter(tyre => tyre.brand === activeBrandFilter);
    }

    // Price range filter
    if (priceRange !== 'All') {
      filtered = filtered.filter(tyre => {
        const price = parseInt(tyre.price.replace(/[₹,]/g, ''));
        switch (priceRange) {
          case 'Under 5000': return price < 5000;
          case '5000-10000': return price >= 5000 && price <= 10000;
          case '10000-20000': return price >= 10000 && price <= 20000;
          case 'Above 20000': return price > 20000;
          default: return true;
        }
      });
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tyre => 
        tyre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tyre.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tyre.size.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredTyres = getFilteredTyres();
  const displayedTyres = filteredTyres.slice(0, displayLimit);
  const hasMoreTyres = filteredTyres.length > displayLimit;

  // Get unique values for filter options
  const categories = [...new Set(tyreData.map(tyre => tyre.category))];
  const brands = [...new Set(tyreData.map(tyre => tyre.brand))];

  const handleCheckOffers = (tyre) => {
    const modalTyreData = {
      name: tyre.name,
      images: tyre.image ? [tyre.image, tyre.image, tyre.image] : ["/api/placeholder/400/300"],
      price: tyre.price,
      originalPrice: tyre.originalPrice || "₹15,000",
      discount: tyre.discount || "₹2,000 OFF",
      emi: tyre.emi || "₹800/month",
      range: tyre.warranty || "3 years warranty",
      engine: tyre.size || "N/A",
      maxPower: tyre.category || "All-Season",
      maxTorque: tyre.brand || "N/A",
      fuelCapacity: "N/A",
      offers: tyre.offers || [
        "Free installation available",
        "Wheel alignment check included",
        "Extended warranty available",
        "Old tyre exchange discount"
      ]
    };
    
    setSelectedTyre(modalTyreData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTyre(null);
  };

  const clearAllFilters = () => {
    setActiveVehicleFilter('Car'); // Reset to default Car instead of All
    setActiveCategoryFilter('All');
    setActiveBrandFilter('All');
    setPriceRange('All');
    setSearchTerm('');
    setDisplayLimit(8); // Reset display limit
    setShowLoadMore(false);
  };

  const handleLoadMore = () => {
    setShowLoadMore(!showLoadMore);
  };

  const handleSelectAllTyres = () => {
    setDisplayLimit(filteredTyres.length);
    setShowLoadMore(false);
  };

  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Title and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">OUR TOP SELLINGS</h2>
          
          {/* Search Bar */}
          <div className="relative max-w-md md:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tyres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8 bg-gray-50 p-6 rounded-lg border">
          {/* First Row - Vehicle Type Buttons */}
          <div className="mb-4">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-semibold text-gray-700 min-w-fit">Vehicle Type:</span>
              <div className="flex gap-2">
                {['All', 'Car', 'Bike', 'Other'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveVehicleFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeVehicleFilter === type
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Dropdown Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Category Dropdown */}
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={activeCategoryFilter}
                  onChange={(e) => setActiveCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="All">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Dropdown */}
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select
                  value={activeBrandFilter}
                  onChange={(e) => setActiveBrandFilter(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="All">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Dropdown */}
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="All">All Prices</option>
                  <option value="Under 5000">Under ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-20000">₹10,000 - ₹20,000</option>
                  <option value="Above 20000">Above ₹20,000</option>
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-end lg:justify-start">
              <button
                onClick={clearAllFilters}
                className="px-4 py-2.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 font-medium rounded-lg transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {displayedTyres.length} of {filteredTyres.length} tyres
          </p>
        </div>
                 
        {/* Tyres Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {displayedTyres.length > 0 ? (
            displayedTyres.map((tyre) => (
              <TyreCard 
                key={tyre.id} 
                tyre={tyre} 
                onCheckOffers={handleCheckOffers}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No tyres found matching your criteria.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More Section */}
        {hasMoreTyres && (
          <div className="mb-8 text-center">
            <div className="relative inline-block">
              <button
                onClick={handleLoadMore}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                Load More Tyres
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showLoadMore ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {showLoadMore && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-64">
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Load More Options</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setDisplayLimit(displayLimit + 8)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                      >
                        Load 8 More Tyres
                      </button>
                      <button
                        onClick={() => setDisplayLimit(displayLimit + 16)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                      >
                        Load 16 More Tyres
                      </button>
                      <button
                        onClick={handleSelectAllTyres}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 border-t border-gray-200 pt-3 mt-3"
                      >
                        Show All {filteredTyres.length} Tyres
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
                 
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
        bikeData={selectedTyre}
      />
    </div>
  );
};

export default function Tyre() {
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