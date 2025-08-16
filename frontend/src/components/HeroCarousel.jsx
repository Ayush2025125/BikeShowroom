import React, { memo, useMemo, useState, useEffect, useCallback } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Edit, Save, X, Plus, Trash2 } from "lucide-react";

// Fallback data in case API fails
const FALLBACK_SLIDES = [
  {
    _id: "fallback1",
    title: "Own the Ride",
    subtitle: "You Deserve",
    description: "Experience the ultimate freedom on two wheels",
    image: "bk1.jpg",
  },
  {
    _id: "fallback2",
    title: "Feel the Freedom",
    subtitle: "on Two Wheels",
    description: "Discover endless possibilities on every journey",
    image: "bk2.jpg",
  },
  {
    _id: "fallback3",
    title: "Your Next Journey",
    subtitle: "Starts Here",
    description: "Adventure awaits around every corner",
    image: "bike1.jpg",
  },
];

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
  getCarouselData: async (apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching carousel data:', error);
      throw error;
    }
  },
  
  updateCarouselItem: async (id, itemData, token, apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating carousel item:', error);
      throw error;
    }
  },
  
  createCarouselItem: async (itemData, token, apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating carousel item:', error);
      throw error;
    }
  },
  
  deleteCarouselItem: async (id, token, apiBaseUrl) => {
    try {
      const response = await fetch(`${apiBaseUrl}/carousal/${id}`, {
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
      console.error('Error deleting carousel item:', error);
      throw error;
    }
  }
};

// Edit Modal Component
const EditModal = ({ slide, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        description: slide.description || '',
        image: slide.image || ''
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image: ''
      });
    }
  }, [slide]);

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
            {slide ? 'Edit Carousel Slide' : 'Add New Slide'}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter slide title"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter slide subtitle"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter slide description"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
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
const AnimatedParticles = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse" />
    <div
      className="absolute top-3/4 right-1/4 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-bounce"
      style={{ animationDelay: "1s" }}
    />
    <div
      className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-25 animate-ping"
      style={{ animationDelay: "2s" }}
    />
  </div>
));

AnimatedParticles.displayName = "AnimatedParticles";

// Memoized decorative elements
const DecorativeElements = memo(() => (
  <>
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-32 w-1 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60" />
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-32 w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-60" />
    <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 hidden sm:block">
      <div className="w-1 h-16 bg-gradient-to-b from-white/60 to-transparent rounded-full animate-pulse" />
    </div>
  </>
));

DecorativeElements.displayName = "DecorativeElements";

// Loading component
const LoadingSlide = memo(() => (
  <div className="relative h-[100vh] max-h-[800px] min-h-[600px] w-full bg-gradient-to-br from-gray-900 to-black">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white space-y-4">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xl font-light">Loading carousel...</p>
      </div>
    </div>
    <AnimatedParticles />
  </div>
));

LoadingSlide.displayName = "LoadingSlide";

// Error component
const ErrorSlide = memo(({ onRetry }) => (
  <div className="relative h-[100vh] max-h-[800px] min-h-[600px] w-full bg-gradient-to-br from-red-900/50 to-black">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white space-y-6 max-w-md mx-auto px-4">
        <div className="text-6xl">⚠️</div>
        <h2 className="text-2xl font-bold">Failed to Load Carousel</h2>
        <p className="text-gray-300">
          Unable to fetch carousel data from the server.
        </p>
        <button
          onClick={onRetry}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
    <AnimatedParticles />
  </div>
));

ErrorSlide.displayName = "ErrorSlide";

// Memoized slide component with admin controls
const CarouselSlide = memo(({ slide, index, isAdmin, onEdit, onDelete }) => (
  <div
    key={slide._id}
    className="relative h-[100vh] max-h-[800px] min-h-[600px] w-full"
  >
    {/* Background Image */}
    <div className="absolute inset-0 overflow-hidden w-full">
      <img
        src={`public/images/bikes/${slide.image}`}
        alt={`${slide.title} - ${slide.subtitle}`}
        className="w-full h-full object-cover transform scale-105 transition-transform duration-[10000ms] ease-out hover:scale-110"
        loading={index === 0 ? "eager" : "lazy"}
       
      />
    </div>

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-135 from-black/70 via-black/40 to-black/70" />

    {/* Admin Edit Controls */}
    {isAdmin && (
      <div className="absolute top-4 left-4 z-20 flex space-x-2">
        <button
          onClick={() => onEdit(slide)}
          className="bg-blue-500/80 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          title="Edit Slide"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(slide)}
          className="bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
          title="Delete Slide"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )}

    {/* Animated Particles */}
    <AnimatedParticles />

    {/* Content */}
    <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 text-center text-white w-full">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 w-full">
        {/* Main Title */}

        <div className="overflow-hidden w-full">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight opacity-0 animate-slide-up">
            <span className="block bg-gradient-to-r from-white via-gray-100 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
              {slide.title}
            </span>
            <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent font-bold mt-2 drop-shadow-xl">
              {slide.subtitle}
            </span>
          </h2>
        </div>

        {/* Description */}
        {slide.description && (
          <div className="overflow-hidden w-full">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed max-w-3xl mx-auto opacity-0 animate-slide-left drop-shadow-lg">
              {slide.description}
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Decorative Elements */}
    <DecorativeElements />
  </div>
));

CarouselSlide.displayName = "CarouselSlide";

// CSS-in-JS styles moved to a separate object for better organization
const carouselStyles = `
  * {
    box-sizing: border-box;
  }
  
  .carousel-root {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  
  .carousel {
    overflow: hidden;
    width: 100%;
  }
  
  .carousel .slide {
    background: transparent;
  }
  
  .carousel .control-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    margin: 0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .carousel .control-dots .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .carousel .control-dots .dot.selected {
    background: linear-gradient(45deg, #ff6b35, #f7931e);
    transform: scale(1.3);
    box-shadow: 0 0 25px rgba(255, 107, 53, 0.7), 0 4px 15px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.8);
  }
  
  .carousel .control-next.control-arrow,
  .carousel .control-prev.control-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(15px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    opacity: 0.8;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    color: white;
    font-size: 22px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
  
  .carousel .control-next.control-arrow:hover,
  .carousel .control-prev.control-arrow:hover {
    background: rgba(255, 107, 53, 0.8);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-50%) scale(1.15);
    box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4);
    opacity: 1;
  }
  
  .carousel .control-next.control-arrow {
    right: 20px;
  }
  
  .carousel .control-prev.control-arrow {
    left: 20px;
  }
  
  .carousel .control-next.control-arrow:before,
  .carousel .control-prev.control-arrow:before {
    border: none;
    content: '';
    display: none;
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-slide-up {
    animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  .animate-slide-left {
    animation: slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
  }
  
  @media (max-width: 768px) {
    .carousel .control-next.control-arrow,
    .carousel .control-prev.control-arrow {
      width: 50px;
      height: 50px;
      font-size: 16px;
      opacity: 0.6;
      backdrop-filter: blur(8px);
    }
    
    .carousel .control-next.control-arrow {
      right: 10px;
    }
    
    .carousel .control-prev.control-arrow {
      left: 10px;
    }
    
    .carousel .control-dots {
      bottom: 12px;
      padding: 12px 16px;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(8px);
    }
    
    .carousel .control-dots .dot {
      width: 10px;
      height: 10px;
      margin: 0 6px;
    }
    
    .carousel .control-dots .dot.selected {
      transform: scale(1.2);
    }
  }
  
  @media (max-width: 480px) {
    .carousel .control-next.control-arrow,
    .carousel .control-prev.control-arrow {
      width: 45px;
      height: 45px;
      font-size: 14px;
      right: 8px;
      left: 8px;
      opacity: 0.5;
    }
    
    .carousel .control-next.control-arrow {
      right: 8px;
    }
    
    .carousel .control-prev.control-arrow {
      left: 8px;
    }
    
    .carousel .control-dots {
      bottom: 10px;
      padding: 10px 14px;
      border-radius: 25px;
    }
    
    .carousel .control-dots .dot {
      width: 8px;
      height: 8px;
      margin: 0 5px;
    }
  }
`;

// Configuration object for carousel settings
const CAROUSEL_CONFIG = {
  showThumbs: false,
  autoPlay: true,
  infiniteLoop: true,
  showStatus: false,
  interval: 6000,
  transitionTime: 600,
  emulateTouch: true,
  swipeable: true,
  preventMovementUntilSwipeScrollTolerance: true,
  swipeScrollTolerance: 50,
  className: "w-full h-[100vh] max-h-[800px] min-h-[500px] sm:min-h-[600px]",
  style: { margin: 0, padding: 0, width: "100%", overflow: "hidden" },
};

const HeroCarousel = memo(({ apiBaseUrl = "http://localhost:5000/api" }) => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  
  // Admin authentication from localStorage
  const [adminToken] = useLocalStorage("adminToken");
  const isAdminLoggedIn = !!adminToken;

  // Function to fetch carousel data with proper error handling
  const fetchCarouselData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await api.getCarouselData(apiBaseUrl);

      if (Array.isArray(data) && data.length > 0) {
        setSlides(data);
      } else {
        // If no data from API, use fallback
        console.warn("No carousel data received from API, using fallback data");
        setSlides(FALLBACK_SLIDES);
      }
    } catch (err) {
      console.error("Error fetching carousel data:", err);
      setError(err.message || "Failed to fetch carousel data");
      // Use fallback data on error
      setSlides(FALLBACK_SLIDES);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  // Admin functions
  const handleEditSlide = (slide) => {
    setEditingSlide(slide);
    setEditModalOpen(true);
  };

  const handleAddSlide = () => {
    setEditingSlide(null);
    setEditModalOpen(true);
  };

  const handleSaveSlide = async (formData) => {
    if (!adminToken) {
      alert('Admin authentication required');
      return;
    }

    try {
      if (editingSlide) {
        // Update existing slide
        const updatedSlide = await api.updateCarouselItem(editingSlide._id, formData, adminToken, apiBaseUrl);
        setSlides(slides.map(slide => 
          slide._id === editingSlide._id ? updatedSlide : slide
        ));
      } else {
        // Create new slide
        const newSlide = await api.createCarouselItem(formData, adminToken, apiBaseUrl);
        setSlides([...slides, newSlide]);
      }
      setEditModalOpen(false);
      setEditingSlide(null);
    } catch (error) {
      console.error('Error saving slide:', error);
      if (error.message.includes('401')) {
        alert('Session expired. Please login again.');
      } else {
        alert('Error saving slide. Please try again.');
      }
    }
  };

  const handleDeleteSlide = async (slide) => {
    if (!adminToken) {
      alert('Admin authentication required');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    
    try {
      await api.deleteCarouselItem(slide._id, adminToken, apiBaseUrl);
      const newSlides = slides.filter(s => s._id !== slide._id);
      setSlides(newSlides);
      
      // If we deleted all slides, fetch fresh data or use fallback
      if (newSlides.length === 0) {
        fetchCarouselData();
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
      if (error.message.includes('401')) {
        alert('Session expired. Please login again.');
      } else {
        alert('Error deleting slide. Please try again.');
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCarouselData();
  }, [apiBaseUrl]);

  // Memoize rendered slides
  const renderedSlides = useMemo(() => {
    if (loading) {
      return [<LoadingSlide key="loading" />];
    }

    if (error && slides.length === 0) {
      return [<ErrorSlide key="error" onRetry={fetchCarouselData} />];
    }

    return slides.map((slide, index) => (
      <CarouselSlide 
        key={slide._id || index} 
        slide={slide} 
        index={index}
        isAdmin={isAdminLoggedIn}
        onEdit={handleEditSlide}
        onDelete={handleDeleteSlide}
      />
    ));
  }, [slides, loading, error, isAdminLoggedIn, fetchCarouselData]);

  return (
    <div className="relative w-full overflow-hidden">
      <style jsx>{carouselStyles}</style>

      {/* Admin Add Button */}
      {isAdminLoggedIn && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={handleAddSlide}
            className="bg-green-500/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            title="Add New Slide"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      )}

      <Carousel {...CAROUSEL_CONFIG}>{renderedSlides}</Carousel>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      {error && slides.length > 0 && (
        <div className="absolute top-4 left-4 bg-red-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm z-30">
          Using cached data - API unavailable
        </div>
      )}

      {/* Edit Modal */}
      <EditModal
        slide={editingSlide}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingSlide(null);
        }}
        onSave={handleSaveSlide}
      />
    </div>
  );
});

HeroCarousel.displayName = "HeroCarousel";

export default HeroCarousel;