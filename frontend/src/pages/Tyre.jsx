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
    <div className="bg-white/15 backdrop-blur-sm py-12 px-4 relative border border-white/25 shadow-xl">
      {/* Burnout tire marks pattern */}
      <div 
        className="absolute inset-0 opacity-12 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='80' viewBox='0 0 400 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000'%3E%3C!-- Straight tire marks --%3E%3Cpath d='M0 25 Q50 20 100 25 Q150 30 200 25 Q250 20 300 25 Q350 30 400 25' stroke-width='10' opacity='0.4' stroke-linecap='round'/%3E%3Cpath d='M0 35 Q50 30 100 35 Q150 40 200 35 Q250 30 300 35 Q350 40 400 35' stroke-width='8' opacity='0.3' stroke-linecap='round'/%3E%3Cpath d='M0 55 Q50 50 100 55 Q150 60 200 55 Q250 50 300 55 Q350 60 400 55' stroke-width='10' opacity='0.4' stroke-linecap='round'/%3E%3Cpath d='M0 65 Q50 60 100 65 Q150 70 200 65 Q250 60 300 65 Q350 70 400 65' stroke-width='8' opacity='0.3' stroke-linecap='round'/%3E%3C!-- Tire tread marks --%3E%3Cg opacity='0.3'%3E%3Crect x='10' y='23' width='3' height='4'/%3E%3Crect x='18' y='24' width='3' height='3'/%3E%3Crect x='26' y='23' width='3' height='4'/%3E%3Crect x='34' y='24' width='3' height='3'/%3E%3Crect x='42' y='23' width='3' height='4'/%3E%3Crect x='50' y='24' width='3' height='3'/%3E%3Crect x='58' y='23' width='3' height='4'/%3E%3Crect x='66' y='24' width='3' height='3'/%3E%3Crect x='74' y='23' width='3' height='4'/%3E%3Crect x='82' y='24' width='3' height='3'/%3E%3Crect x='90' y='23' width='3' height='4'/%3E%3Crect x='98' y='24' width='3' height='3'/%3E%3Crect x='10' y='53' width='3' height='4'/%3E%3Crect x='18' y='54' width='3' height='3'/%3E%3Crect x='26' y='53' width='3' height='4'/%3E%3Crect x='34' y='54' width='3' height='3'/%3E%3Crect x='42' y='53' width='3' height='4'/%3E%3Crect x='50' y='54' width='3' height='3'/%3E%3Crect x='58' y='53' width='3' height='4'/%3E%3Crect x='66' y='54' width='3' height='3'/%3E%3Crect x='74' y='53' width='3' height='4'/%3E%3Crect x='82' y='54' width='3' height='3'/%3E%3Crect x='90' y='53' width='3' height='4'/%3E%3Crect x='98' y='54' width='3' height='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '600px 120px',
          backgroundRepeat: 'repeat-x'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
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
    <div className="bg-gray-100 min-h-screen flex flex-col gap-4 relative">
      {/* Tire Track Marks Background Pattern */}
      <div 
        className="fixed inset-0 opacity-15 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3C!-- Left tire track --%3E%3Cpath d='M10 20 Q30 25 50 20 Q70 15 90 20 Q110 25 130 20 Q150 15 170 20 Q190 25 210 20' stroke='%23000000' stroke-width='4' fill='none' opacity='0.8'/%3E%3Cpath d='M15 30 Q35 35 55 30 Q75 25 95 30 Q115 35 135 30 Q155 25 175 30 Q195 35 215 30' stroke='%23000000' stroke-width='3' fill='none' opacity='0.6'/%3E%3C!-- Right tire track --%3E%3Cpath d='M10 60 Q30 65 50 60 Q70 55 90 60 Q110 65 130 60 Q150 55 170 60 Q190 65 210 60' stroke='%23000000' stroke-width='4' fill='none' opacity='0.8'/%3E%3Cpath d='M15 70 Q35 75 55 70 Q75 65 95 70 Q115 75 135 70 Q155 65 175 70 Q195 75 215 70' stroke='%23000000' stroke-width='3' fill='none' opacity='0.6'/%3E%3C!-- Tread marks --%3E%3Crect x='20' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='25' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='30' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='35' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='40' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='45' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='50' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='55' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='60' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='65' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='70' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='75' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='80' y='18' width='2' height='6' opacity='0.7'/%3E%3Crect x='85' y='19' width='2' height='4' opacity='0.6'/%3E%3Crect x='20' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='25' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='30' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='35' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='40' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='45' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='50' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='55' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='60' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='65' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='70' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='75' y='59' width='2' height='4' opacity='0.6'/%3E%3Crect x='80' y='58' width='2' height='6' opacity='0.7'/%3E%3Crect x='85' y='59' width='2' height='4' opacity='0.6'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Additional skid marks at different angles */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='150' viewBox='0 0 300 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000000' stroke-width='5' opacity='0.7'%3E%3C!-- Curved skid mark --%3E%3Cpath d='M50 50 Q100 30 150 50 Q200 70 250 50' stroke-dasharray='8,4'/%3E%3Cpath d='M50 80 Q100 60 150 80 Q200 100 250 80' stroke-dasharray='6,3'/%3E%3C!-- Acceleration marks --%3E%3Cpath d='M80 100 L85 110 M90 102 L95 112 M100 104 L105 114 M110 106 L115 116 M120 108 L125 118' stroke-width='3' opacity='0.8'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '600px 300px',
          backgroundRepeat: 'repeat',
          transform: 'rotate(-15deg)',
          transformOrigin: 'center'
        }}
      />
      
      {/* Content with relative positioning to appear above background */}
      <div className="relative z-10">
        <Header />
        <Carousal />
        <TopSellingsSection />
        <ShowcaseSection />
        <Footer />
      </div>
    </div>
  );
}