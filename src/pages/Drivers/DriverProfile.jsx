import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaUser, 
  FaCarAlt, 
  FaPhone, 
  FaEnvelope, 
  FaIdCard, 
  FaEdit, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaMoneyBillWave, 
  FaUserFriends 
} from "react-icons/fa";
import { useAuth } from "../../util/AuthContext";

const DriverProfile = () => {
  const { user } = useAuth();
  const [driver, setDriver] = useState(null);
  const [car, setCar] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCar, setIsEditingCar] = useState(false);
  const [editedDriver, setEditedDriver] = useState({});
  const [editedCar, setEditedCar] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8080/auth/driver";
  const BOOKING_API_BASE_URL = "http://localhost:8080/auth/bookings";
  const CAR_API_BASE_URL = "http://localhost:8080/auth/cars";
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.userId) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      if (!token) {
        setError("No authentication token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const driverId = user.userId;
        const config = { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        };

        // Fetch driver profile
        const driverResponse = await axios.get(`${API_BASE_URL}/getdriver/${driverId}`, config);
        const driverData = driverResponse.data;
        setDriver(driverData);
        setEditedDriver({ ...driverData });

        // Fetch car details if applicable
        if (driverData.hasOwnCar && driverData.carId) {
          try {
            const carResponse = await axios.get(
              `${CAR_API_BASE_URL}/getCar/${driverData.carId}`,
              config
            );
            const carData = carResponse.data;
            setCar(carData);
            setEditedCar({ ...carData });
          } catch (carError) {
            console.error("Detailed car fetch error:", {
              status: carError.response?.status,
              message: carError.message,
              carId: driverData.carId,
              fullError: carError
            });
            handleCarFetchError(carError, driverData.carId);
          }
        } else {
          setCar(null);
          setEditedCar({});
        }

        // Fetch driver bookings
        const bookingsResponse = await axios.get(`${API_BASE_URL}/${driverId}/bookings`, config);
        const mappedBookings = bookingsResponse.data.map(booking => ({
          id: booking.bookingId,
          passengerName: booking.passengerName || "Unknown",
          pickup: booking.pickupLocation,
          destination: booking.destination,
          date: booking.pickupDate,
          time: booking.pickupTime,
          status: booking.status.toLowerCase(),
        }));
        setBookings(mappedBookings);

      } catch (error) {
        console.error("Error fetching data:", {
          status: error.response?.status,
          message: error.message,
          driverId: user.userId,
          fullError: error
        });
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, user]);

  const handleCarFetchError = (error, carId) => {
    let errorMessage = "Unable to load car details. Please try again later.";
    
    switch (error.response?.status) {
      case 403:
        errorMessage = "Access denied to car details. Vehicle might not be registered to this driver.";
        break;
      case 404:
        errorMessage = `Car with ID ${carId} not found. Please register your vehicle.`;
        break;
      case 401:
        errorMessage = "Authentication failed. Please log in again.";
        break;
    }

    setError(errorMessage);
    setCar(null);
  };

  const handleFetchError = (error) => {
    let errorMessage = "Failed to load profile. Please try again.";

    switch (error.response?.status) {
      case 403:
        errorMessage = "Access denied. You don't have permission to view this data.";
        break;
      case 401:
        errorMessage = "Authentication failed. Please log in again.";
        localStorage.removeItem("jwtToken");
        break;
    }

    setError(errorMessage);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedDriver(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCarInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedCar(prev => ({
      ...prev,
      [name]: type === "number" ? (parseFloat(value) || "") : type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updatedriver/${driver.driverId}`,
        editedDriver,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDriver(response.data);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError(`Failed to update profile: ${error.response?.data || error.message}`);
    }
  };

  const handleSaveCarChanges = async () => {
    try {
      const response = await axios.put(
        `${CAR_API_BASE_URL}/updateCar/${car.carId}`,
        editedCar,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCar(response.data);
      setIsEditingCar(false);
      setError(null);
    } catch (error) {
      setError(`Failed to update car: ${error.response?.data || error.message}`);
    }
  };

  const handleBookingAction = async (id, status) => {
    try {
      const endpoint = status === "confirmed" 
        ? `${BOOKING_API_BASE_URL}/${id}/confirm` 
        : `${BOOKING_API_BASE_URL}/${id}/cancel`;
      const response = await axios.put(
        endpoint,
        status === "cancelled" ? { reason: "Driver cancelled" } : {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedBooking = {
        id: response.data.bookingId,
        passengerName: response.data.passengerName || "Unknown",
        pickup: response.data.pickupLocation,
        destination: response.data.destination,
        date: response.data.pickupDate,
        time: response.data.pickupTime,
        status: response.data.status.toLowerCase(),
      };
      setBookings(prev => prev.map(booking => 
        booking.id === id ? updatedBooking : booking
      ));
      setError(null);
    } catch (error) {
      setError(`Failed to update booking: ${error.response?.data || error.message}`);
    }
  };

  const handleAvailabilityToggle = async () => {
    try {
      const newAvailability = !driver.available;
      const response = await axios.put(
        `${API_BASE_URL}/${driver.driverId}/availability`,
        { availability: newAvailability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDriver(response.data);
      setError(null);
    } catch (error) {
      setError(`Failed to update availability: ${error.response?.data || error.message}`);
    }
  };

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "?";
  const formatBookingId = (id) => `BK-${String(id).slice(0, 8)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-red-100 p-6 rounded-lg text-red-700">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-blue-950 text-white p-6 rounded-t-lg shadow-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-blue-950 text-2xl font-bold">
              {getInitials(driver?.driverName)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{driver?.driverName}</h1>
              <p className="text-yellow-500">Driver ID: {driver?.driverId}</p>
            </div>
          </div>
          <button
            onClick={handleAvailabilityToggle}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              driver?.available 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {driver?.available ? "Available" : "Unavailable"}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b">
          <div className="flex">
            {["profile", "car", "bookings"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium ${
                  activeTab === tab 
                    ? "text-yellow-500 border-b-2 border-yellow-500" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg shadow-md p-6">
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-blue-950">Personal Information</h2>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-yellow-500 text-blue-950 rounded-md hover:bg-yellow-600 transition-colors"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-blue-950 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      <FaEdit /> Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { icon: FaUser, label: "Full Name", value: driver?.driverName },
                    { icon: FaPhone, label: "Phone Number", value: driver?.driverPhoneNum },
                    { icon: FaEnvelope, label: "Email", value: driver?.email },
                    { icon: FaIdCard, label: "License Number", value: driver?.driverLicenseNo },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <Icon className="text-yellow-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">{label}</p>
                        <p className="font-medium text-blue-950">{value || "N/A"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { name: "driverName", label: "Full Name", type: "text" },
                    { name: "driverPhoneNum", label: "Phone Number", type: "text" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "driverLicenseNo", label: "License Number", type: "text" },
                  ].map(({ name, label, type }) => (
                    <div key={name} className="flex flex-col">
                      <label className="text-sm text-gray-500 mb-1">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={editedDriver[name] || ""}
                        onChange={handleInputChange}
                        className="border rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "car" && (
            <div>
              {driver?.hasOwnCar && car ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-blue-950">Vehicle Information</h2>
                    <div className="flex gap-2">
                      {isEditingCar ? (
                        <>
                          <button
                            onClick={() => setIsEditingCar(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveCarChanges}
                            className="px-4 py-2 bg-yellow-500 text-blue-950 rounded-md hover:bg-yellow-600 transition-colors"
                          >
                            Save Changes
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditingCar(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-blue-950 rounded-md hover:bg-yellow-600 transition-colors"
                        >
                          <FaEdit /> Edit Car Details
                        </button>
                      )}
                    </div>
                  </div>
                  {!isEditingCar ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { icon: FaCarAlt, label: "Model", value: car?.carModel },
                        { icon: FaIdCard, label: "License Plate", value: car?.carLicensePlate },
                        { icon: FaUserFriends, label: "Capacity", value: car?.capacity },
                        { icon: FaMoneyBillWave, label: "Base Rate", value: `LKR.${car?.baseRate}` },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3">
                          <Icon className="text-yellow-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">{label}</p>
                            <p className="font-medium text-blue-950">{value || "N/A"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { name: "carModel", label: "Model", type: "text" },
                        { name: "carLicensePlate", label: "License Plate", type: "text" },
                        { name: "capacity", label: "Capacity", type: "number" },
                        { name: "baseRate", label: "Base Rate", type: "number" },
                      ].map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col">
                          <label className="text-sm text-gray-500 mb-1">{label}</label>
                          <input
                            type={type}
                            name={name}
                            value={editedCar[name] || ""}
                            onChange={handleCarInputChange}
                            className="border rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-md">
                  <h3 className="text-lg font-medium text-blue-950">No vehicle registered</h3>
                  <p className="text-blue-900 mt-2">Register your vehicle to start accepting bookings.</p>
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      setIsEditing(true);
                      setEditedDriver({ ...editedDriver, hasOwnCar: true });
                    }}
                    className="mt-4 bg-yellow-500 text-blue-950 px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    Register Vehicle
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "bookings" && (
            <div>
              <h2 className="text-xl font-semibold text-blue-950 mb-6">Your Bookings</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No bookings available at this time.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Booking ID", "Customer", "Pickup", "Destination", "Date & Time", "Status", "Action"].map(header => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map(booking => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-950">
                            {formatBookingId(booking.id)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {booking.passengerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {booking.pickup}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {booking.destination}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {booking.date} at {booking.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              {booking.status === "pending" && (
                                <>
                                  <button
                                    onClick={() => handleBookingAction(booking.id, "confirmed")}
                                    className="text-green-600 hover:text-green-900"
                                    title="Confirm Booking"
                                  >
                                    <FaCheckCircle className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => handleBookingAction(booking.id, "cancelled")}
                                    className="text-red-600 hover:text-red-900"
                                    title="Cancel Booking"
                                  >
                                    <FaTimesCircle className="h-5 w-5" />
                                  </button>
                                </>
                              )}
                              {booking.status === "confirmed" && (
                                <button
                                  onClick={() => handleBookingAction(booking.id, "cancelled")}
                                  className="text-red-600 hover:text-red-900"
                                  title="Cancel Booking"
                                >
                                  <FaTimesCircle className="h-5 w-5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;