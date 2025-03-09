import React from "react";

export const TestimonialCard = ({ name, location, quote, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md relative overflow-hidden">
      {/* Taxi icon watermark */}
      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
        <svg
          width="200"
          height="200"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 12H20V7H18V12H16V7H14V12H12V3H10V12H8V9H6V12H4V9H2V12H0V14H2V17H4V14H6V17H8V14H10V23H12V14H14V19H16V14H18V19H20V14H22V12Z"
            fill="#000000"
          />
          <path
            d="M4.5 16C5.32843 16 6 16.6716 6 17.5C6 18.3284 5.32843 19 4.5 19C3.67157 19 3 18.3284 3 17.5C3 16.6716 3.67157 16 4.5 16Z"
            fill="#000000"
          />
          <path
            d="M19.5 16C20.3284 16 21 16.6716 21 17.5C21 18.3284 20.3284 19 19.5 19C18.6716 19 18 18.3284 18 17.5C18 16.6716 18.6716 16 19.5 16Z"
            fill="#000000"
          />
        </svg>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 italic">{quote}</p>
      </div>
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-yellow-500">Lives in: {location}</p>
        </div>
      </div>
    </div>
  );
};