import React, { useState } from 'react';
import { Fuel, Gauge, Car, Settings, X, Save, Upload } from 'lucide-react';


const useAdminState = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); 
  return isAdminLoggedIn;
};

const EditPanel = ({ bike, onSave, onCancel }) => {
  const [editData, setEditData] = useState({
    name: bike.name,
    priceRange: bike.priceRange,
    availability: bike.availability,
    kmPerDay: bike.kmPerDay,
    extraKmRate: bike.extraKmRate,
    extraHrRate: bike.extraHrRate,
    fuelType: bike.fuelType,
    transmission: bike.transmission,
    capacity: bike.capacity,
    image: bike.image
  });

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Edit Bike Details</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bike Image
            </label>
            <div className="flex items-center space-x-4">
              <img
                src={editData.image}
                alt="Bike preview"
                className="w-20 h-20 object-contain border rounded-lg"
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload New Image</span>
                </label>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bike Name
              </label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <input
                type="text"
                value={editData.priceRange}
                onChange={(e) => handleInputChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={editData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          {/* Rates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                KM Per Day
              </label>
              <input
                type="text"
                value={editData.kmPerDay}
                onChange={(e) => handleInputChange('kmPerDay', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra KM Rate
              </label>
              <input
                type="text"
                value={editData.extraKmRate}
                onChange={(e) => handleInputChange('extraKmRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extra Hour Rate
              </label>
              <input
                type="text"
                value={editData.extraHrRate}
                onChange={(e) => handleInputChange('extraHrRate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                value={editData.fuelType}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transmission
              </label>
              <select
                value={editData.transmission}
                onChange={(e) => handleInputChange('transmission', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Engine Capacity
              </label>
              <input
                type="text"
                value={editData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 150cc"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-4 p-6 border-t bg-gray-50">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Updated BikeCard Component
const BikeCard = ({
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
  onOfferClick,
  onBikeUpdate
}) => {
  const isAdminLoggedIn = useAdminState();
  const [showEditPanel, setShowEditPanel] = useState(false);

  const bikeData = {
    image,
    name,
    priceRange,
    availability,
    kmPerDay,
    extraKmRate,
    extraHrRate,
    fuelType,
    transmission,
    capacity
  };

  const handleEditClick = () => {
    setShowEditPanel(true);
  };

  const handleSave = (updatedData) => {
    // Call the parent component's update function
    if (onBikeUpdate) {
      onBikeUpdate(updatedData);
    }
    setShowEditPanel(false);
  };

  const handleCancel = () => {
    setShowEditPanel(false);
  };

  return (
    <>
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
                 
          {/* Admin Edit Button */}
          {isAdminLoggedIn && (
            <button
              onClick={handleEditClick}
              className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
              title="Edit bike details"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
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

      {/* Edit Panel Modal */}
      {showEditPanel && (
        <EditPanel
          bike={bikeData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

// Demo Component with sample data
export default function BikeCardDemo() {
  const [bikeData, setBikeData] = useState({
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    name: "Honda Activa 6G",
    priceRange: "₹500 - ₹800/day",
    availability: "Available",
    kmPerDay: "100 km/day",
    extraKmRate: "₹5/km",
    extraHrRate: "₹50/hr",
    fuelType: "Petrol",
    transmission: "Automatic",
    capacity: "110cc"
  });

  const handleBikeUpdate = (updatedData) => {
    setBikeData(updatedData);
    console.log("Bike updated:", updatedData);
  };

  const handleOfferClick = () => {
    alert("Viewing offer for " + bikeData.name);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto">
        <BikeCard
          {...bikeData}
          onOfferClick={handleOfferClick}
          onBikeUpdate={handleBikeUpdate}
        />
      </div>
    </div>
  );
}