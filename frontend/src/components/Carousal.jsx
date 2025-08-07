import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Edit, Save, X, Plus, Trash2 } from "lucide-react";


const API_BASE_URL = 'http://localhost:5000/api';

// Custom hook for localStorage 
const useLocalStorage = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    try {
      
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = localStorage.getItem(key);
        return item ? item : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      console.log("localStorage not available");
      return defaultValue;
    }
  });

  const setStoredValue = (newValue) => {
    try {
      setValue(newValue);
      if (typeof window !== 'undefined' && window.localStorage) {
        if (newValue === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, newValue);
        }
      }
    } catch (error) {
      console.log("localStorage not available");
    }
  };

  return [value, setStoredValue];
};

// API functions
const api = {
  getOffers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching offers:', error);
      throw error;
    }
  },
  
  updateOffer: async (id, offerData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(offerData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating offer:', error);
      throw error;
    }
  },
  
  createOffer: async (offerData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(offerData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  },
  
  deleteOffer: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/offers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting offer:', error);
      throw error;
    }
  }
};

const EditModal = ({ offer, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || '',
        subtitle: offer.subtitle || '',
        description: offer.description || '',
        image: offer.image || ''
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image: ''
      });
    }
  }, [offer]);

  const handleSubmit = () => {
    if (!formData.title || !formData.subtitle || !formData.description || !formData.image) {
      alert('Please fill in all fields');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {offer ? 'Edit Offer' : 'Add New Offer'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Carousal() {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [error, setError] = useState(null);
  
  // Admin authentication from localStorage
  const [adminToken] = useLocalStorage("adminToken");
  const isAdminLoggedIn = !!adminToken;
  
  const intervalRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);

  // Fetch offers from API
  const fetchOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getOffers();
      setOffers(data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setError('Failed to load offers. Please try again later.');
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const startAutoPlay = useCallback(() => {
    if (offers.length <= 1) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    }, 4000);
  }, [offers.length]);

  const stopAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  const resumeAutoPlayWithDelay = useCallback(() => {
    clearTimeout(autoPlayTimeoutRef.current);
    autoPlayTimeoutRef.current = setTimeout(() => {
      startAutoPlay();
    }, 3000);
  }, [startAutoPlay]);

  const nextSlide = useCallback(() => {
    if (offers.length <= 1) return;
    setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
    stopAutoPlay();
    resumeAutoPlayWithDelay();
  }, [offers.length, stopAutoPlay, resumeAutoPlayWithDelay]);

  const prevSlide = useCallback(() => {
    if (offers.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
    stopAutoPlay();
    resumeAutoPlayWithDelay();
  }, [offers.length, stopAutoPlay, resumeAutoPlayWithDelay]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    stopAutoPlay();
    resumeAutoPlayWithDelay();
  };

  useEffect(() => {
    if (offers.length > 1) {
      startAutoPlay();
    }
    return () => {
      stopAutoPlay();
      clearTimeout(autoPlayTimeoutRef.current);
    };
  }, [startAutoPlay, stopAutoPlay, offers.length]);

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    setEditModalOpen(true);
  };

  const handleAddOffer = () => {
    setEditingOffer(null);
    setEditModalOpen(true);
  };

  const handleSaveOffer = async (formData) => {
    if (!adminToken) {
      alert('Admin authentication required');
      return;
    }

    try {
      if (editingOffer) {
        // Update existing offer
        const updatedOffer = await api.updateOffer(editingOffer._id, formData, adminToken);
        setOffers(offers.map(offer => 
          offer.id === editingOffer.id ? updatedOffer : offer
        ));
      } else {
        // Create new offer
        const newOffer = await api.createOffer(formData, adminToken);
        setOffers([...offers, newOffer]);
      }
      setEditModalOpen(false);
      setEditingOffer(null);
    } catch (error) {
      console.error('Error saving offer:', error);
      if (error.message.includes('401')) {
        alert('Session expired. Please login again.');
      } else {
        alert('Error saving offer. Please try again.');
      }
    }
  };

  const handleDeleteOffer = async (offerId) => {
    if (!adminToken) {
      alert('Admin authentication required');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this offer?')) return;
    
    try {
      await api.deleteOffer(offerId, adminToken);
      const newOffers = offers.filter(offer => offer.id !== offerId);
      setOffers(newOffers);
      
      // Adjust current index if necessary
      if (currentIndex >= newOffers.length && newOffers.length > 0) {
        setCurrentIndex(newOffers.length - 1);
      } else if (newOffers.length === 0) {
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      if (error.message.includes('401')) {
        alert('Session expired. Please login again.');
      } else {
        alert('Error deleting offer. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 md:h-[500px] flex items-center justify-center">
            <div className="text-gray-500">Loading offers...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 md:h-[500px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-500 mb-4">{error}</div>
              <button
                onClick={fetchOffers}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-96 md:h-[500px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-500 mb-4">No offers available</div>
              {isAdminLoggedIn && (
                <button
                  onClick={handleAddOffer}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add First Offer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow py-12 px-4">
      <div className="relative w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Admin Controls */}
        {isAdminLoggedIn && (
          <div className="absolute top-4 right-4 z-30 flex space-x-2">
            <button
              onClick={handleAddOffer}
              className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
              title="Add New Offer">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Slides */}
        <div className="relative h-96 md:h-[500px]">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40" />
              
              {/* Admin Edit Controls for Current Slide */}
              {isAdminLoggedIn && index === currentIndex && (
                <div className="absolute top-4 left-4 z-20 flex space-x-2">
                  <button
                    onClick={() => handleEditOffer(offer)}
                    className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                    title="Edit Offer"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteOffer(offer._id)}
                    className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    title="Delete Offer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-white">
                <div className="max-w-2xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    {offer.title}
                  </h2>
                  <h3 className="text-2xl md:text-3xl text-yellow-400 font-semibold mb-4">
                    {offer.subtitle}
                  </h3>
                  <p className="text-lg md:text-xl mb-8 text-gray-200">
                    {offer.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {offers.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {offers.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-yellow-500 w-8"
                    : "bg-white bg-opacity-60 hover:bg-opacity-90 w-3"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditModal
        offer={editingOffer}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingOffer(null);
        }}
        onSave={handleSaveOffer}
      />
    </div>
  );
}