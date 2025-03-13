import React from 'react';
import { Link } from 'react-router-dom';

const CabServiceSection = () => {
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      {/* Light background pattern squares */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-100 opacity-50"></div>
      <div className="absolute top-16 left-0 w-16 h-16 bg-gray-100 opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <h3 className="text-yellow-500 text-xl font-semibold mb-2">MEGACITY CABS</h3>
              <h2 className="text-blue-950 text-5xl md:text-6xl font-bold tracking-wider">RIDE WITH US</h2>
            </div>
            
            <p className="text-gray-600 text-lg">
              Experience the most reliable and comfortable ride in the city. Our professional drivers and premium vehicles ensure you reach your destination safely and on time.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                </div>
                <span className="text-blue-950 text-xl font-medium">Comfortable experience</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <span className="text-blue-950 text-xl font-medium">Premium service</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v6.5l3 1.5" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <span className="text-blue-950 text-xl font-medium">24/7 availability</span>
              </div>
            </div>
            
            <div>
              <a href='/ourfleet'
             
                className="inline-block bg-blue-950 text-white px-6 py-3 font-medium uppercase tracking-wider hover:bg-blue-900 transition duration-300"
              >
                VIEW OUR FLEET
              </a>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img 
                src="/src/assets/yellowCab_img.jpg" 
                alt="Yellow taxi cab" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-6 right-6 bg-blue-950 text-white py-2 px-4 text-lg font-bold">
                <span className="text-yellow-500">BOOK</span> NOW
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CabServiceSection;