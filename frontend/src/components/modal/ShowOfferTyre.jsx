import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Phone, Heart } from "lucide-react";

const ShowOfferTyre = ({ isOpen, onClose, tyreData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen && tyreData) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, tyreData]);

  // Helper function to safely get array values
  const safeArray = (arr) => Array.isArray(arr) ? arr : [];

  // Helper function to format price with fallback
  const formatPrice = (price) => {
    if (!price) return "Price not available";
    return typeof price === 'number' ? `₹${price.toLocaleString()}` : price;
  };

  // If no data is provided, don't render the modal
  if (!tyreData) return null;

  const {
    brand = "",
    model = "",
    images = [],
    price,
    originalPrice,
    discount,
    size = "",
    type = "",
    pattern = "",
    compound = "",
    maxLoad = "",
    maxSpeed = "",
    offers = [],
    features = []
  } = tyreData;

  const tyreImages = safeArray(images);
  const tyreOffers = safeArray(offers);
  const tyreFeatures = safeArray(features);

  const nextImage = () => {
    if (tyreImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % tyreImages.length);
    }
  };

  const prevImage = () => {
    if (tyreImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + tyreImages.length) % tyreImages.length
      );
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-6xl w-full h-[95vh] sm:h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate pr-4">
            {brand} {model}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Main Content - Mobile: column (image top, info bottom), Desktop: row */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 bg-gray-100 relative h-[250px] lg:h-auto lg:order-2">
            <div className="h-full flex items-center justify-center relative p-4">
              {tyreImages.length > 0 ? (
                <img
                  src={tyreImages[currentImageIndex]}
                  alt={`${brand} ${model} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full max-w-full max-h-full object-contain rounded-lg"
                  style={{ maxHeight: '400px', maxWidth: '100%' }}
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/300";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">📷</span>
                    </div>
                    <p className="text-gray-500">No images available</p>
                  </div>
                </div>
              )}

              {/* Image Navigation */}
              {tyreImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {tyreImages.length > 1 && (
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {tyreImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-orange-500"
                          : "bg-white bg-opacity-50"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details & Offers Section */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto flex-1 lg:order-1">
            {/* Pricing Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                  {formatPrice(price)}
                </span>
                {originalPrice && (
                  <span className="text-base sm:text-lg text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
              {discount && (
                <div className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {discount}
                </div>
              )}
              <p className="text-gray-600 text-sm sm:text-base">
                Size: <span className="font-semibold text-orange-600">{tyreData.size}</span>
              </p>
            </div>

            {/* Tyre Specifications */}
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Size</p>
                  <p className="font-semibold text-sm sm:text-base">{size}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-sm sm:text-base">{type}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Pattern</p>
                  <p className="font-semibold text-sm sm:text-base">{pattern}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600">Max Speed</p>
                  <p className="font-semibold text-sm sm:text-base">{maxSpeed}</p>
                </div>
                {compound && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600">Compound</p>
                    <p className="font-semibold text-sm sm:text-base">{compound}</p>
                  </div>
                )}
                {maxLoad && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600">Max Load</p>
                    <p className="font-semibold text-sm sm:text-base">{maxLoad}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Key Features */}
            {tyreFeatures.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                  Key Features
                </h3>
                <div className="space-y-2">
                  {tyreFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-green-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <p className="text-xs sm:text-sm text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Offers */}
            {tyreOffers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
                  Special Offers
                </h3>
                <div className="space-y-2">
                  {tyreOffers.map((offer, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-orange-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <p className="text-xs sm:text-sm text-gray-700">{offer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex gap-4 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button className="flex-1 bg-white border-2 border-orange-500 text-orange-500 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
            <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
            Contact Us
          </button>
          <button className="flex-1 bg-orange-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
            <Heart size={16} className="sm:w-[18px] sm:h-[18px]" />
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowOfferTyre;