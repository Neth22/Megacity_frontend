import React from 'react';
import { Star, ChevronRight } from 'lucide-react';


const VehicleShowcase = () => {
  const vehicles = [
    {
      id: 1,
      name: "Premium Sedan",
      basePrice: "Rs. 1200",
      image: "showcaseCar1Img",
      features: ["4 Passengers", "Air Conditioned", "Leather Interior"],
      tag: "Most Popular"
    },
    {
      id: 2,
      name: "Luxury SUV",
      basePrice: "Rs. 1800",
      image: "/api/placeholder/400/250",
      features: ["6 Passengers", "Extra Luggage", "Premium Comfort"],
      tag: "Family Choice"
    },
    {
      id: 3,
      name: "Executive Van",
      basePrice: "Rs. 2500",
      image: "/api/placeholder/400/250",
      features: ["8 Passengers", "Premium Interior", "Extended Space"],
      tag: "Group Travel"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-blue-950 to-blue-950">
      <div className="relative container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-4xl font-extrabold mb-6 text-yellow-500 drop-shadow-lg rounded-full">Luxury Travel Redefined</h2>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto drop-shadow-md">
          Experience unparalleled comfort with our premium vehicle fleet, tailored to suit every journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500">
              <span className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                {vehicle.tag}
              </span>
              
              <div className="relative h-48 overflow-hidden rounded-lg">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              </div>

              <h3 className="text-2xl font-bold mt-4 text-[#011627]">{vehicle.name}</h3>
              <p className="text-yellow-500 text-xl font-semibold mb-3">Starting from {vehicle.basePrice}</p>
              <ul className="text-gray-700 space-y-1">
                {vehicle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center"><Star className="w-4 h-4 text-yellow-500 mr-2" /> {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <button className="group relative overflow-hidden bg-yellow-500 text-blue-950 px-12 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10 flex items-center">
              Book Your Premium Ride
              <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
