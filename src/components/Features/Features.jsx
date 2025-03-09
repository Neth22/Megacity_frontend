import React from 'react';

const Features = () => {
  return (
    <div className="bg-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-800">Ride with the Best where </span>
            <span className="text-blue-900">Service,</span>
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-blue-900">Safety</span>
            <span className="text-slate-800"> and </span>
            <span className="text-blue-900">Reliability</span>
            <span className="text-slate-800"> Meet!</span>
          </h2>
          <p className="text-lg text-slate-700 mt-4">
            These are just a few of the reasons why we're Sri Lanka's preferred cab service.
          </p>
        </div>

        {/* Features Grid - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Feature 1: Flight Monitoring */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-900 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                <path d="M14.5 4.5L20 6" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
                <path d="M18 2L22 6" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Flight Monitoring</h3>
            <p className="text-slate-600">
              We track your flight to ensure we're there right when you land and we'll adjust if your flight gets delayed - no waiting, no stress!
            </p>
          </div>

          {/* Feature 2: 24/7/365 Support */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-900 transition-all duration-500 ease-in-out group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" className="animate-pulse duration-3000"></circle>
                <path d="M8 12a4 4 0 0 1 8 0" className="group-hover:animate-pulse"></path>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12" y2="16"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">24/7/365 Support</h3>
            <p className="text-slate-600">
              Need help? We've got you covered around the clock, every day of the year, through any channel you prefer.
            </p>
          </div>

          {/* Feature 3: Trained Drivers */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-900 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Trained Drivers</h3>
            <p className="text-slate-600">
              Our friendly, professional drivers are not just experts behind the wheel, they've gone through a thorough vetting and selection process to ensure the safety of our riders
            </p>
          </div>

          {/* Feature 4: 35 Years Excellence */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-900 transition-all duration-500 ease-in-out group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L4 10l8 8 8-8-8-8z" className="group-hover:animate-spin group-hover:animate-duration-3000"></path>
                <path d="M4 22L22 22" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
                <path d="M12 22L12 10" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">35 Years Excellence</h3>
            <p className="text-slate-600">
              With over 35 years of experience, you're in trusted hands with every ride.
            </p>
          </div>
        </div>

        {/* Features Grid - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 5: Luxury Vehicles */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-900 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M5 9l2 -2h1l2 2h6l2 -2h1l2 2v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-6z"></path>
                <path d="M5 13h14" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Luxury Vehicles</h3>
            <p className="text-slate-600">
              Travel in style with our premium fleet of vehicles. From executive sedans to spacious SUVs, all maintained to the highest standards of comfort and safety.
            </p>
          </div>

          {/* Feature 6: Fixed Pricing */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-900 transition-all duration-500 ease-in-out group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8"></circle>
                <path d="M9.5 9.5v7h5v-7z" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
                <path d="M14 9.5h-4" className="group-hover:animate-pulse"></path>
                <path d="M14 12h-4" className="group-hover:animate-pulse"></path>
                <path d="M14 14.5h-4" className="group-hover:animate-pulse"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Fixed Pricing</h3>
            <p className="text-slate-600">
              No surprises, no hidden costs. Our transparent pricing ensures you know exactly what you'll pay before your journey begins. Book with confidence every time.
            </p>
          </div>

          {/* Feature 7: Eco-Friendly Options */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-400 bg-white flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:border-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-900 transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 18a4.6 4.4 0 0 1 0 -9h11a4.6 4.4 0 0 1 0 9"></path>
                <path d="M7 9v-7"></path>
                <path d="M13 6v-4"></path>
                <path d="M3 16h12"></path>
                <path d="M12 16v4"></path>
                <path d="M19 16v4"></path>
                <path d="M12 20h7" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
                <path d="M3 20h4" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Eco-Friendly Options</h3>
            <p className="text-slate-600">
              Committed to environmental sustainability, we offer hybrid and electric vehicles in our fleet. Reduce your carbon footprint while enjoying premium transportation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;