import React, { useState } from 'react';
import Header from '../components/Header';
import bg1 from "../assets/aboutus1.png"
import Footer from '../components/Footer';

const AboutUs = () => {
  const [openAccordion, setOpenAccordion] = useState('browse'); 
  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? '' : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden">        
        <div className="relative z-10 text-center">
          {/* Motorcycle Image */}
          <div>
            <div className="relative">
              <img 
                src={bg1} 
                alt="Our Motorcycle Collection" 
                className="w-full h-auto object-cover drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* HOW IT WORKS Section */}
        <div className="bg-gray-50 py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="space-y-8">
                {/* HOW IT WORKS Badge */}
                <div className="inline-block">
                  <div className="bg-red-100 text-red-600 px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                    HOW IT WORKS
                  </div>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Streamlined processes for<br />
                  a hassle-free experience
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our streamlined process ensures a seamless car rental experience from start to 
                  finish. With easy online booking, flexible pick-up and drop-off options.
                </p>

                {/* Accordion Items */}
                <div className="space-y-4">
                  {/* Browse And Select */}
                  <div className="border-b border-gray-200 pb-4">
                    <div 
                      className="flex justify-between items-center cursor-pointer py-2"
                      onClick={() => toggleAccordion('browse')}
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Browse And Select</h3>
                      <svg 
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          openAccordion === 'browse' ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {openAccordion === 'browse' && (
                      <div className="mt-3 animate-fadeIn">
                        <p className="text-gray-600 leading-relaxed">
                          Explore our diverse selection of high-end vehicles, choose your preferred 
                          pickup and return dates, and select a location that best fits your needs
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Book And Confirm */}
                  <div className="border-b border-gray-200 pb-4">
                    <div 
                      className="flex justify-between items-center cursor-pointer py-2"
                      onClick={() => toggleAccordion('confirm')}
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Book And Confirm</h3>
                      <svg 
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          openAccordion === 'confirm' ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {openAccordion === 'confirm' && (
                      <div className="mt-3 animate-fadeIn">
                        <p className="text-gray-600 leading-relaxed">
                          Complete your reservation with our secure booking system. Review your selection, 
                          confirm your details, and receive instant confirmation with all the information you need.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Book And Enjoy */}
                  <div className="border-b border-gray-200 pb-4">
                    <div 
                      className="flex justify-between items-center cursor-pointer py-2"
                      onClick={() => toggleAccordion('enjoy')}
                    >
                      <h3 className="text-xl font-semibold text-gray-900">Book And Enjoy</h3>
                      <svg 
                        className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                          openAccordion === 'enjoy' ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {openAccordion === 'enjoy' && (
                      <div className="mt-3 animate-fadeIn">
                        <p className="text-gray-600 leading-relaxed">
                          Pick up your vehicle and hit the road! Our premium vehicles are maintained to the highest 
                          standards, ensuring a comfortable and memorable driving experience.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Car driving in misty forest road" 
                    className="w-full h-[500px] object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Decorative dots pattern */}
          <div className="absolute top-8 right-8 opacity-20">
            <div className="grid grid-cols-8 gap-2">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Why We're Your Best Option Section */}
        <div className="bg-white py-20 px-8 relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="bg-red-100 text-red-600 px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                  PLAN YOUR TRIP NOW
                </div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                "Why We're Your Best Option"
              </h2>
            </div>

            {/* Three Cards */}
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Select A Car */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-80 h-48 mx-auto bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Car and people illustration */}
                    <div className="relative">
                      {/* Platform */}
                      <div className="w-32 h-4 bg-gray-800 rounded-full mb-2"></div>
                      {/* Car */}
                      <div className="w-28 h-16 bg-red-500 rounded-lg relative mx-auto mb-4">
                        <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full opacity-80"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full opacity-80"></div>
                        <div className="absolute bottom-1 left-1 w-4 h-4 bg-gray-800 rounded-full"></div>
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-gray-800 rounded-full"></div>
                      </div>
                      {/* People */}
                      <div className="flex justify-between items-end absolute -bottom-2 -left-8 -right-8">
                        <div className="w-8 h-12 bg-purple-600 rounded-t-full"></div>
                        <div className="w-8 h-12 bg-blue-600 rounded-t-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Select A Car</h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover our wide range of cars. All the cars designed to meet all your travel needs. 
                  From a diverse fleet of vehicles to flexible rental plans.
                </p>
              </div>

              {/* Contact Operator */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-80 h-48 mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Contact illustration */}
                    <div className="relative">
                      {/* Phone/tablet */}
                      <div className="w-20 h-28 bg-white rounded-lg border-4 border-gray-200 relative mb-2">
                        <div className="w-12 h-8 bg-red-500 rounded mx-auto mt-2"></div>
                      </div>
                      {/* Person */}
                      <div className="w-12 h-16 bg-pink-400 rounded-t-full absolute -left-8 bottom-4"></div>
                      {/* Location pin */}
                      <div className="w-6 h-8 bg-red-500 rounded-full rounded-b-none absolute -right-4 top-2"></div>
                      {/* Chat bubble */}
                      <div className="w-8 h-6 bg-gray-700 rounded-full absolute right-2 top-8"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Operator</h3>
                <p className="text-gray-600 leading-relaxed">
                  After you select a car, you can contact us by call or mail us. Within sometimes Speedtoyz 
                  connect with you for further actions.
                </p>
              </div>

              {/* Let's Drive */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-80 h-48 mx-auto bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Car and plant illustration */}
                    <div className="relative">
                      {/* Car */}
                      <div className="w-32 h-18 bg-red-500 rounded-lg relative">
                        <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full"></div>
                        <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full"></div>
                        <div className="absolute bottom-1 left-2 w-5 h-5 bg-gray-800 rounded-full"></div>
                        <div className="absolute bottom-1 right-2 w-5 h-5 bg-gray-800 rounded-full"></div>
                        {/* Windshield */}
                        <div className="absolute top-1 left-4 right-4 h-4 bg-gray-300 rounded"></div>
                      </div>
                      {/* Plant */}
                      <div className="absolute -right-6 bottom-0">
                        <div className="w-2 h-8 bg-green-600"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full -mt-2 -ml-1"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full -mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's Drive</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get behind the wheel and experience the freedom of the open road. Let's drive a car and 
                  make every mile memorable.
                </p>
              </div>

            </div>
          </div>

          {/* Decorative dots pattern */}
          <div className="absolute top-8 right-8 opacity-20">
            <div className="grid grid-cols-8 gap-2">
              {[...Array(48)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white py-20 px-8 relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <div className="bg-red-100 text-red-600 px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
                  WHY CHOOSE US
                </div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Unmatched quality and service<br />
                for your needs
              </h2>
            </div>

            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
              
              {/* Left Side Features */}
              <div className="space-y-8 lg:w-1/3">
                
                {/* Extensive Fleet Options */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Extensive Fleet Options</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa
                    </p>
                  </div>
                </div>

                {/* Exceptional Customer Service */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Exceptional Customer Service</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa
                    </p>
                  </div>
                </div>

                {/* Affordable Pricing */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa
                    </p>
                  </div>
                </div>

              </div>

              {/* Center Car Image */}
              <div className="flex justify-center lg:w-1/3">
                <div className="w-96 h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Premium SUV" 
                    className="w-80 h-48 object-contain"
                  />
                </div>
              </div>

              {/* Right Side Features */}
              <div className="space-y-8 lg:w-1/3">
                
                {/* Convenient Locations */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Convenient Locations</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa
                    </p>
                  </div>
                </div>

                {/* Reliability And Safety */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability And Safety</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa
                    </p>
                  </div>
                </div>

                {/* 24/7 Support */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Quisque Sollicitudin Feugiat Risus, Eu Posuere Ex Euismod Eu. Phasellus Hendrerit, Massa
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;