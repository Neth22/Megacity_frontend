import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Fleets = () => {
  const navigate = useNavigate();
  const [cabs, setCabs] = useState([]);
  const [filters, setFilters] = useState({
    type: 'All',
    availability: 'All'
  });
  const [filteredCabs, setFilteredCabs] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await fetch('http://localhost:8080/all/viewCars'); // Update the URL if needed
        const data = await response.json();
        
        // Map backend data to frontend structure
        const mappedCabs = data.map(car => ({
          id: car.carId,
          brand: car.carBrand,
          model: car.carModel,
          type: car.carType || 'Economy', // Add a default type if not provided
          seats: car.capacity,
          available: car.available,
          image: car.carImgUrl || '/api/placeholder/300/200', // Use a placeholder if no image URL is provided
          hourlyRate: car.type === 'Luxury' ? 25 : (car.type === 'Van' ? 20 : 15) // Added hourly rate calculation
        }));

        setCabs(mappedCabs);
        setFilteredCabs(mappedCabs);
      } catch (error) {
        console.error('Error fetching cabs:', error);
      }
    };

    fetchCabs();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  // Apply filters whenever filters state changes
  useEffect(() => {
    let result = [...cabs];
    
    // Filter by car type
    if (filters.type !== 'All') {
      result = result.filter(cab => cab.type === filters.type);
    }
    
    // Filter by availability
    if (filters.availability !== 'All') {
      const isAvailable = filters.availability === 'Available';
      result = result.filter(cab => cab.available === isAvailable);
    }
    
    setFilteredCabs(result);
  }, [filters, cabs]);

  // Car types for filter dropdown
  const carTypes = ['All', 'Economy', 'Luxury', 'Van'];

  // Handle booking - Navigate to booking page with selected car
  const handleBooking = (cab) => {
    // Navigate to booking page with selected car info
    navigate('/booking', { state: { selectedCar: cab } });
  };

  // Scroll to the Cabs grid section
  const scrollToCabsGrid = () => {
    const cabsGridSection = document.getElementById('cabs-grid');
    if (cabsGridSection) {
      cabsGridSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Header Section */}
      <div className="bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[url('/api/placeholder/1920/600')] bg-cover bg-center opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Premium Fleet
            </h1>
            <div className="h-1 w-24 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 mb-8">
              Experience comfort and luxury with our diverse range of vehicles, 
              perfect for any journey across Colombo
            </p>
            <div className="flex justify-center">
              <button 
                className="px-8 py-3 bg-yellow-500 text-blue-950 font-medium rounded hover:bg-yellow-400 transition-all shadow-lg"
                onClick={scrollToCabsGrid} // Updated to scroll to Cabs grid
              >
                Book Your Ride Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave SVG at the bottom of the header */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#FFFFFF" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {/* Intro section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">
            Explore Our Vehicle Collection
          </h2>
          <div className="h-1 w-16 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of modern vehicles tailored to meet your travel needs in Colombo City. 
            From economy options to luxury rides, we've got you covered for any journey.
          </p>
        </div>
        
        {/* New Modern Curved Filter Section */}
        <div className="relative mb-20 max-w-3xl mx-auto">
          {/* Curved Background with Shadow */}
          <div className="absolute inset-0 bg-yellow-400 rounded-3xl transform -skew-y-2 shadow-lg"></div>
          
          {/* Content */}
          <div className="relative z-10 px-8 py-10">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-950 rounded-full p-3 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-blue-950 font-bold text-2xl ml-3">Filter Vehicles</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-blue-950">Car Type</label>
                <div className="relative">
                  <select 
                    className="w-full p-4 bg-white text-blue-950 border-none rounded-xl shadow-md appearance-none focus:ring-2 focus:ring-blue-950 transition-all"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    {carTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="h-5 w-5 text-blue-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-blue-950">Availability</label>
                <div className="relative">
                  <select 
                    className="w-full p-4 bg-white text-blue-950 border-none rounded-xl shadow-md appearance-none focus:ring-2 focus:ring-blue-950 transition-all"
                    value={filters.availability}
                    onChange={(e) => handleFilterChange('availability', e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="h-5 w-5 text-blue-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="px-8 py-3 bg-blue-950 text-white font-medium rounded-xl hover:bg-blue-900 transition shadow-lg">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Cabs grid */}
        <div id="cabs-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCabs.length > 0 ? (
            filteredCabs.map(cab => (
              <div key={cab.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-100">
                <div className="relative">
                  <img 
                    src={cab.image} 
                    alt={`${cab.brand} ${cab.model}`} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${cab.available ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {cab.available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-blue-950">{cab.brand} {cab.model}</h3>
                  <div className="text-gray-600 mb-6 space-y-1">
                    <p className="flex items-center">
                      <span className="w-24 font-medium">Type:</span> 
                      <span>{cab.type}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="w-24 font-medium">Seats:</span> 
                      <span>{cab.seats}</span>
                    </p>
                  </div>
                  {cab.available ? (
                    <button 
                      className="w-full bg-blue-950 text-white py-3 rounded-lg hover:bg-blue-900 transition shadow-md"
                      onClick={() => handleBooking(cab)}
                    >
                      Book Now
                    </button>
                  ) : (
                    <button 
                      className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Unavailable
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xl font-medium mb-2">No matching vehicles found</p>
              <p>Try adjusting your filter options to see more vehicles.</p>
            </div>
          )}
        </div>
        
        {/* Call to action section */}
        <div className="mt-20 bg-blue-950 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready for Your Next Journey?</h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Experience the comfort and reliability of our premium fleet. Book now and enjoy seamless travel across Colombo.
          </p>
          <button 
            className="px-8 py-3 bg-yellow-500 text-blue-950 font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-lg"
            onClick={scrollToCabsGrid} // Updated to scroll to Cabs grid
          >
            Reserve Your Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fleets;