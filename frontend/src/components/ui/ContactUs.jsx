import React from "react";
import bike1 from "../../assets/bike1.jpg";
import bike2 from "../../assets/bike2.jpg";
import { Send, PhoneCall } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      {/* Main Container */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Images */}
        <div className="relative">
          {/* Decorative Star */}
          <div className="absolute -top-8 left-8 text-gray-800 text-7xl">✦</div>

          {/* Main Image Container */}
          <div className="relative">
            {/* Large Circular Image */}
            {/* Red Asterisk */}
          <div className="relative">
          <div className="text-red-500 absolute top-2 right-10 text-9xl font-bold mb-4">*</div>
            </div>

            <div className="w-96 h-96 mx-auto relative overflow-hidden rounded-full shadow-2xl">
              <img
                src={bike1}
                alt="Bike 1"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-transparent"></div>
            </div>
            <div className="relative">
              <div className="text-red-500 absolute top-[1px] left-[100px] text-9xl font-bold mb-4">
                *
              </div>
            </div>
            {/* Small Rectangular Image */}
            <div className="absolute -bottom-12 -right-8 w-72 h-48 overflow-hidden rounded-2xl shadow-xl">
              <img
                src={bike2}
                alt="Bike 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="space-y-8">
          
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[0.9] tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Driven by Passion,
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              Trusted for Bikes
            </span>
          </h1>

          {/* Features */}
          <div className="space-y-8 mt-12">
            {/* Feature 1 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Easy Booking Process
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We Have Optimized The Booking Process So That Our Clients Can
                  Experience The Easiest And The Safest Service
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smooth Booking & Delivery Experience
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We've simplified the booking process to offer you a faster,
                  easier, and more secure bike showroom experience.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-8">
            <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow transition duration-200 transform hover:-translate-y-1">
              <PhoneCall className="w-5 h-5" />
              <span>Contact Us</span>
            </button>
            <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg shadow transition duration-200 transform hover:-translate-y-1">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
