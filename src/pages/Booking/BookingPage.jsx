import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Component removed: MapUpdater
// Leaflet imports removed

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const preselectedCar = location.state?.selectedCar || null;
  const preservedBookingData = location.state?.bookingData || null;
  
  const [bookingData, setBookingData] = useState({
    customerId: localStorage.getItem('userId') || '',
    carId: preselectedCar?.id || '',
    pickupDate: preservedBookingData?.pickupDate || '',
    pickupTime: preservedBookingData?.pickupTime || '12:00',
    pickupLocation: preservedBookingData?.pickupLocation || '',
    dropLocation: preservedBookingData?.dropLocation || '',
    driverRequired: preservedBookingData?.driverRequired || false
  });
  
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(preselectedCar);
  const [step, setStep] = useState(preselectedCar ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fare, setFare] = useState({
    baseFare: 0,
    tax: 0,
    totalAmount: 0
  });

  useEffect(() => {
    if (preselectedCar) {
      calculateFare(preselectedCar);
    }
  }, [preselectedCar]);
  
  useEffect(() => {
    const fetchAvailableCars = async () => {
      try {
        const response = await fetch('http://localhost:8080/all/viewCars');
        const data = await response.json();
        
        const availableCars = data.filter(car => car.available === true).map(car => ({
          id: car.carId,
          brand: car.carBrand,
          model: car.carModel,
          type: car.carType || 'Economy',
          seats: car.capacity,
          image: car.carImgUrl || '/api/placeholder/300/200',
          hourlyRate: car.type === 'Luxury' ? 25 : (car.type === 'Van' ? 20 : 15)
        }));
        
        setAvailableCars(availableCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Unable to load available vehicles. Please try again later.');
      }
    };
    
    if (!preselectedCar) {
      fetchAvailableCars();
    }
  }, [preselectedCar]);

  // Removed geocodeAddress function and related useEffect

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setBookingData({
      ...bookingData,
      carId: car.id
    });
    calculateFare(car);
  };
  
  const calculateFare = (car) => {
    const baseFare = car.hourlyRate * 3;
    const tax = baseFare * 0.12;
    const totalAmount = baseFare + tax;
    
    setFare({
      baseFare: baseFare.toFixed(2),
      tax: tax.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    });
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      const dateTime = new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`);
      const bookingPayload = {
        customerId: bookingData.customerId,
        carId: bookingData.carId,
        pickupDate: dateTime.toISOString(),
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation,
        tax: parseFloat(fare.tax),
        totalAmount: parseFloat(fare.totalAmount),
        bookingDate: new Date().toISOString(),
        driverRequired: bookingData.driverRequired,
        status: 'PENDING'
      };
      
      const response = await fetch('http://localhost:8080/customer/bookCar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingPayload)
      });
      
      if (!response.ok) {
        throw new Error('Booking failed. Please try again.');
      }
      
      setStep(3);
    } catch (error) {
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeVehicle = () => {
    navigate('/ourfleet', { 
      state: { 
        bookingData: bookingData,
        fromBooking: true
      }
    });
  };

  const renderVehicleSelection = () => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-blue-950 mb-6">Select Your Vehicle</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {availableCars.map(car => (
          <div 
            key={car.id} 
            className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all ${selectedCar?.id === car.id ? 'ring-4 ring-yellow-500 transform scale-105' : 'hover:shadow-xl border border-gray-100'}`}
            onClick={() => handleCarSelect(car)}
          >
            <div className="relative">
              <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-48 object-cover" />
              <div className="absolute top-4 right-4">
                <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  ${car.hourlyRate}/hr
                </span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-xl mb-2 text-blue-950">{car.brand} {car.model}</h4>
              <div className="text-gray-600 mb-6 space-y-1">
                <p className="flex items-center"><span className="w-24 font-medium">Type:</span> <span>{car.type}</span></p>
                <p className="flex items-center"><span className="w-24 font-medium">Seats:</span> <span>{car.seats}</span></p>
              </div>
              <button className={`w-full py-3 rounded-lg transition ${selectedCar?.id === car.id ? 'bg-yellow-500 text-blue-950 font-bold' : 'bg-blue-950 text-white'}`}>
                {selectedCar?.id === car.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      <div className="mt-8 flex justify-end">
        <button 
          className="px-8 py-3 bg-blue-950 text-white font-medium rounded-lg hover:bg-blue-900 transition shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          onClick={() => setStep(2)}
          disabled={!selectedCar}
        >
          Next: Booking Details
        </button>
      </div>
    </div>
  );

  const renderBookingDetails = () => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-blue-950 mb-6">Complete Your Booking</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
            <h4 className="font-bold text-lg mb-4 text-blue-950">Trip Details</h4>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                  <input 
                    type="date" 
                    name="pickupDate"
                    value={bookingData.pickupDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
                  <input 
                    type="time" 
                    name="pickupTime"
                    value={bookingData.pickupTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                <input 
                  type="text" 
                  name="pickupLocation"
                  value={bookingData.pickupLocation}
                  onChange={handleInputChange}
                  placeholder="Enter your pickup address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Location</label>
                <input 
                  type="text" 
                  name="dropLocation"
                  value={bookingData.dropLocation}
                  onChange={handleInputChange}
                  placeholder="Enter your destination address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="driverRequired"
                  name="driverRequired"
                  checked={bookingData.driverRequired}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-950 focus:ring-blue-950 border-gray-300 rounded"
                />
                <label htmlFor="driverRequired" className="ml-2 block text-sm text-gray-700">
                  I need a driver (additional charges may apply)
                </label>
              </div>
            </div>
          </div>
          {/* Map section removed */}
        </div>
        <div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg text-blue-950">Booking Summary</h4>
              <button 
                onClick={handleChangeVehicle}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Change Vehicle
              </button>
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-950" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 00.8-.4l3-4a1 1 0 00.2-.6V8a1 1 0 00-1-1h-3.05A2.5 2.5 0 0014 5.5h-1a1 1 0 00-1-1H3z" />
                  </svg>
                </div>
                <span className="ml-2 font-medium text-gray-800">
                  {selectedCar?.brand} {selectedCar?.model}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between"><span>Car Type:</span><span className="font-medium">{selectedCar?.type}</span></div>
                  <div className="flex justify-between"><span>Hourly Rate:</span><span className="font-medium">${selectedCar?.hourlyRate}/hr</span></div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-6">
              <h5 className="font-medium text-gray-700 mb-3">Fare Estimation</h5>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span>Base Fare</span><span>${fare.baseFare}</span></div>
                <div className="flex justify-between"><span>Tax (12%)</span><span>${fare.tax}</span></div>
                {bookingData.driverRequired && (
                  <div className="flex justify-between"><span>Driver Fee</span><span>$30.00</span></div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-blue-950">
                    ${bookingData.driverRequired ? (parseFloat(fare.totalAmount) + 30).toFixed(2) : fare.totalAmount}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button 
                className="w-full px-4 py-3 bg-yellow-500 text-blue-950 font-bold rounded-lg hover:bg-yellow-400 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={loading || !bookingData.pickupDate || !bookingData.pickupLocation || !bookingData.dropLocation}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              By confirming, you agree to our terms of service and cancellation policy
            </p>
          </div>
        </div>
      </div>
      {error && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-3xl font-bold text-blue-950 mb-4">Booking Confirmed!</h3>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
        Your booking has been successfully processed. A confirmation has been sent to your email.
      </p>
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto mb-8">
        <h4 className="font-bold text-lg mb-4 text-blue-950">Booking Details</h4>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div><p className="text-sm text-gray-500">Vehicle</p><p className="font-medium">{selectedCar?.brand} {selectedCar?.model}</p></div>
          <div><p className="text-sm text-gray-500">Date & Time</p><p className="font-medium">{new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`).toLocaleString()}</p></div>
          <div><p className="text-sm text-gray-500">Pickup</p><p className="font-medium">{bookingData.pickupLocation}</p></div>
          <div><p className="text-sm text-gray-500">Drop-off</p><p className="font-medium">{bookingData.dropLocation}</p></div>
          <div><p className="text-sm text-gray-500">Driver</p><p className="font-medium">{bookingData.driverRequired ? 'Yes' : 'No'}</p></div>
          <div><p className="text-sm text-gray-500">Total Amount</p><p className="font-medium text-blue-950">${bookingData.driverRequired ? (parseFloat(fare.totalAmount) + 30).toFixed(2) : fare.totalAmount}</p></div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <button 
          className="px-6 py-3 bg-blue-950 text-white font-medium rounded-lg hover:bg-blue-900 transition shadow-lg"
          onClick={() => navigate('/bookings')}
        >
          View My Bookings
        </button>
        <button 
          className="px-6 py-3 bg-yellow-500 text-blue-950 font-medium rounded-lg hover:bg-yellow-400 transition shadow-lg"
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch(step) {
      case 1:
        return renderVehicleSelection();
      case 2:
        return renderBookingDetails();
      case 3:
        return renderConfirmation();
      default:
        return renderVehicleSelection();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[url('/api/placeholder/1920/600')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Ride</h1>
            <div className="h-1 w-24 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-200 mb-4">Easy, fast, and reliable cab booking for your journey across Colombo</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#F9FAFB" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-200">
              <div className="h-full bg-blue-950 transition-all" style={{ width: `${(step - 1) * 50}%` }}></div>
            </div>
            <div className="relative z-10 flex justify-between">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-950' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${step >= 1 ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}>1</div>
                <span className="text-sm font-medium">Select Vehicle</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-950' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${step >= 2 ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}>2</div>
                <span className="text-sm font-medium">Booking Details</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-950' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${step >= 3 ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}>3</div>
                <span className="text-sm font-medium">Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 pb-20">
        <div className="max-w-5xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Booking;