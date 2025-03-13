// src/pages/DriverProfile.jsx
import React, { useState } from 'react';

const DriverProfile = () => {
  // Static driver data
  const driver = {
    driverId: '67d309610493b6535bf67d86',
    driverName: 'Uvindu',
    driverLicenseNo: '2345679',
    driverPhoneNum: '074 234678',
    email: 'uvindu123@gmail.com',
    available: true,
    hasOwnCar: true,
    carId: '67d309610493b6535bf67d85',
    profilePic: '/src/assets/driver_img.webp' // Placeholder image URL
  };

  // Static bookings data
  const bookings = [
    {
      id: '67cd3d51f184153cf4fea902',
      customerName: 'Alice Smith',
      pickupLocation: '123 Main St, City A',
      destination: '456 Elm St, City B',
      bookingTime: '2023-10-25T10:00:00Z',
      status: 'PENDING'
    },
    {
      id: '67d138f8759e48208306a15c',
      customerName: 'Bob Johnson',
      pickupLocation: '789 Oak St, City C',
      destination: '101 Pine St, City D',
      bookingTime: '2023-10-26T14:30:00Z',
      status: 'CONFIRMED'
    }
  ];

  // State for update form
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    driverName: driver.driverName,
    driverLicenseNo: driver.driverLicenseNo,
    driverPhoneNum: driver.driverPhoneNum,
    email: driver.email,
    hasOwnCar: driver.hasOwnCar,
    carId: driver.carId || ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Driver information updated successfully!');
    setShowUpdateForm(false);
  };

  // Handle booking confirmation
  const handleConfirmBooking = (bookingId) => {
    alert(`Booking ${bookingId} confirmed successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Driver Profile</h1>
        
        {/* Driver Information Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8 transform transition-all hover:scale-105">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Driver Information</h2>
            <button
              onClick={() => setShowUpdateForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Update Details
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src={driver.profilePic}
                alt="Driver Profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Driver Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              <div>
                <p className="text-gray-500">Driver ID:</p>
                <p className="font-semibold text-gray-800">{driver.driverId}</p>
              </div>
              <div>
                <p className="text-gray-500">Name:</p>
                <p className="font-semibold text-gray-800">{driver.driverName}</p>
              </div>
              <div>
                <p className="text-gray-500">License Number:</p>
                <p className="font-semibold text-gray-800">{driver.driverLicenseNo}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone Number:</p>
                <p className="font-semibold text-gray-800">{driver.driverPhoneNum}</p>
              </div>
              <div>
                <p className="text-gray-500">Email:</p>
                <p className="font-semibold text-gray-800">{driver.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Status:</p>
                <p className={`font-semibold ${driver.available ? 'text-green-500' : 'text-red-500'}`}>
                  {driver.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Has Own Car:</p>
                <p className="font-semibold text-gray-800">{driver.hasOwnCar ? 'Yes' : 'No'}</p>
              </div>
              {driver.carId && (
                <div>
                  <p className="text-gray-500">Car ID:</p>
                  <p className="font-semibold text-gray-800">{driver.carId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Assigned Bookings */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Assigned Bookings</h2>
          
          {bookings.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No bookings assigned yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-600">Booking ID</th>
                    <th className="py-3 px-4 text-left text-gray-600">Customer</th>
                    <th className="py-3 px-4 text-left text-gray-600">Pickup Location</th>
                    <th className="py-3 px-4 text-left text-gray-600">Destination</th>
                    <th className="py-3 px-4 text-left text-gray-600">Date & Time</th>
                    <th className="py-3 px-4 text-left text-gray-600">Status</th>
                    <th className="py-3 px-4 text-left text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="py-3 px-4 text-gray-800">{booking.id}</td>
                      <td className="py-3 px-4 text-gray-800">{booking.customerName}</td>
                      <td className="py-3 px-4 text-gray-800">{booking.pickupLocation}</td>
                      <td className="py-3 px-4 text-gray-800">{booking.destination}</td>
                      <td className="py-3 px-4 text-gray-800">
                        {new Date(booking.bookingTime).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span 
                          className={`px-2 py-1 rounded text-sm font-semibold ${
                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                            booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                            booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {booking.status === 'PENDING' && (
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg transition-all"
                          >
                            Confirm
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Update Form Modal */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Update Driver Details</h2>
              <button
                onClick={() => setShowUpdateForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Driver Name</label>
                <input
                  type="text"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">License Number</label>
                <input
                  type="text"
                  name="driverLicenseNo"
                  value={formData.driverLicenseNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Phone Number</label>
                <input
                  type="text"
                  name="driverPhoneNum"
                  value={formData.driverPhoneNum}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasOwnCar"
                    checked={formData.hasOwnCar}
                    onChange={handleChange}
                    className="mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">Has Own Car</span>
                </label>
              </div>
              
              {formData.hasOwnCar && (
                <div className="mb-4">
                  <label className="block text-gray-600 mb-2">Car ID</label>
                  <input
                    type="text"
                    name="carId"
                    value={formData.carId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverProfile;