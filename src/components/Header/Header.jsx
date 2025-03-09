import React from 'react';
import header_img from "/src/assets/header_img.jpg";
import header_car_img from "/src/assets/header_car_img.png";




import { ChevronRight, MapPin, Phone, Clock } from 'lucide-react';

const Header = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-blue-950/70 z-10" />
        <img 
          src={header_img}
          alt="Taxi in city"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Content - Main Text */}
          <div className="w-full md:w-1/2 text-white space-y-6">
            <div className="inline-block bg-yellow-500 text-blue-950 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              #Colombo's Trusted Cab Service
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Smart & Reliable Cabs,
              <span className="text-yellow-500">Always On Time</span>
              {/* <span className="text-yellow-500"> Anywhere</span> */}
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-xl">
              Experience comfort and safety with our professional cab service. 
              Book your ride instantly and enjoy premium transportation at competitive rates.
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
              <div className="flex items-center space-x-2">
                <Clock className="text-yellow-500" size={20} />
                <span>24/7 Service Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="text-yellow-500" size={20} />
                <span>City-wide Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="text-yellow-500" size={20} />
                <span>Instant Booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChevronRight className="text-yellow-500" size={20} />
                <span>Affordable Pricing</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href='/ourfleet' className="bg-yellow-500 text-blue-950 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Book Now
              </a>
              <a href='/contact' className="border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-blue-950 transition-all duration-300">
                Call for Ride
              </a>
            </div>
          </div>

          {/* Right Content - Image with Effects */}
          <div className="w-full md:w-5/12 mt-12 md:mt-0">
            <img 
              src={header_car_img} 
              alt="Luxury cab" 
              className="animate-car-straight w-full hover:scale-105 transition-transform duration-300"
              style={{
                animation: 'carStraight 15s linear infinite'
              }}
            />
            <style jsx>{`
              @keyframes carStraight {
                40% {
                  transform: translateX(-25%);
                }
                
              }
              }
            `}</style>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;