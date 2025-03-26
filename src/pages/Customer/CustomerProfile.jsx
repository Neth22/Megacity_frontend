import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  DollarSign,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../../util/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    customerId: "",
    customerName: "",
    customerAddress: "",
    customerNIC: "",
    customerPhone: "",
    email: "",
    role: "CUSTOMER",
    joinedDate: "",
  });

  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [cancellationReasonError, setCancellationReasonError] = useState(false);

  const API_BASE_URL = "http://localhost:8080/auth/customers";
  const BOOKINGS_API_URL = "http://localhost:8080/auth/bookings";
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        const customerId = user?.userId;

        if (!customerId || !token) {
          throw new Error("No customer ID or token found. Please log in again.");
        }

        const customerResponse = await axios.get(`${API_BASE_URL}/getCustomer/${customerId}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          timeout: 5000,
        });

        const customerData = { ...customerResponse.data };
        setCustomer(customerData);
        setEditedCustomer(customerData);

        await fetchBookings();

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching customer data:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          logout();
        } else {
          setError(
            err.response?.data?.message || err.message || "Failed to load profile data. Please try again later."
          );
        }
        setIsLoading(false);
      }
    };

    if (user && token) {
      fetchCustomerData();
    } else {
      setError("Please log in to view your profile.");
      setIsLoading(false);
    }
  }, [user, token, logout]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${BOOKINGS_API_URL}/getallcustomerbookings`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        timeout: 5000,
      });

      if (response.status === 200) {
        const sortedBookings = (response.data || []).sort((a, b) => {
          const dateA = new Date(`${a.pickupDate}T${a.pickupTime}`);
          const dateB = new Date(`${b.pickupDate}T${b.pickupTime}`);
          return dateB - dateA;
        });
        setBookings(sortedBookings);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      const errorMessage =
        err.response?.status === 401
          ? "Unauthorized: Please log in again."
          : err.response?.data?.message || err.message || "Failed to load bookings. Please try again.";
      setError(errorMessage);
      if (err.response?.status === 401) logout();
      setBookings([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer({ ...editedCustomer, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateCustomer/${customer.customerId}`,
        editedCustomer,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      setCustomer(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const openCancelDialog = (bookingId) => {
    setCancelBookingId(bookingId);
    setCancellationReason("");
    setCancellationReasonError(false);
    setShowCancelDialog(true);
  };

  const closeCancelDialog = () => {
    setShowCancelDialog(false);
    setCancelBookingId(null);
    setCancellationReason("");
    setCancellationReasonError(false);
  };

  const submitCancellation = async () => {
    // Validate cancellation reason
    if (!cancellationReason.trim()) {
      setCancellationReasonError(true);
      return;
    }

    try {
      // Prepare the cancellation request payload
      const cancellationRequest = {
        reason: cancellationReason.trim()
      };

      // Send POST request to cancel the booking
      await axios.post(
        `${BOOKINGS_API_URL}/${cancelBookingId}/cancel`, 
        cancellationRequest,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      // Update bookings list after cancellation
      await fetchBookings();
      
      // Close cancellation dialog
      closeCancelDialog();
    } catch (err) {
      console.error("Error cancelling booking:", err);
      
      // Handle different error scenarios
      if (err.response) {
        // Server responded with an error
        const errorMessage = err.response.data || 
          "Failed to cancel booking. Please try again.";
        
        setError(errorMessage);
      } else if (err.request) {
        // Request made but no response received
        setError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getFullName = () => {
    return customer.customerName || user?.username || "User";
  };

  const getInitial = () => {
    if (customer.customerName && customer.customerName.length > 0) {
      return customer.customerName.charAt(0).toUpperCase();
    }
    return user?.username
      ? user.username.charAt(0).toUpperCase()
      : customer.email
      ? customer.email.charAt(0).toUpperCase()
      : "U";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatFare = (fare, isEstimate = false) => {
    if (!fare) return "LKR 0.00";
    return isEstimate ? `Est. LKR ${fare.toFixed(2)}` : `LKR ${fare.toFixed(2)}`;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <AlertTriangle size={20} className="mr-2" />
            {error}
          </div>
        )}
        <div className="bg-white shadow-lg overflow-hidden sm:rounded-lg mb-6 border border-gray-100">
          <div className="px-4 py-5 sm:px-6 bg-blue-950 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center text-blue-950 text-4xl font-bold shadow-lg border-4 border-white">
                  {getInitial()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{getFullName()}</h3>
                </div>
              </div>
              <div className="flex space-x-3">
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-yellow-500 text-blue-950 rounded-md flex items-center shadow-md hover:bg-yellow-400 transition-all font-semibold"
                  >
                    <Edit size={18} className="mr-2" />
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center shadow-md hover:bg-red-700 transition-all font-semibold"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "profile"
                    ? "border-yellow-500 text-blue-950"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "bookings"
                    ? "border-yellow-500 text-blue-950"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Your Bookings
              </button>
            </nav>
          </div>

          {activeTab === "profile" && (
            <div className="px-4 py-5 sm:p-6">
              {!isEditing ? (
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Mail size={16} className="mr-2 text-blue-950" />
                      Email Address
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">{customer.email}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Phone size={16} className="mr-2 text-blue-950" />
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">{customer.customerPhone}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPin size={16} className="mr-2 text-blue-950" />
                      Home Address
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">{customer.customerAddress}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <User size={16} className="mr-2 text-blue-950" />
                      NIC Number
                    </dt>
                    <dd className="mt-1 text-lg text-gray-900">{customer.customerNIC}</dd>
                  </div>
                </dl>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="customerName"
                          id="customerName"
                          value={editedCustomer.customerName || ""}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={editedCustomer.email || ""}
                          onChange={handleInputChange}
                          className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="customerPhone"
                          id="customerPhone"
                          value={editedCustomer.customerPhone || ""}
                          onChange={handleInputChange}
                          className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">
                        Home address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin size={16} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="customerAddress"
                          id="customerAddress"
                          value={editedCustomer.customerAddress || ""}
                          onChange={handleInputChange}
                          className="focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="customerNIC" className="block text-sm font-medium text-gray-700">
                        NIC Number
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="customerNIC"
                          id="customerNIC"
                          value={editedCustomer.customerNIC || ""}
                          onChange={handleInputChange}
                          className="focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedCustomer({ ...customer });
                      }}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                      <X size={18} className="mr-2" />
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-950 bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-hidden">
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.bookingId}
                        className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-blue-950 mr-2">{booking.bookingId}</p>
                              <span
                                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                  ${
                                    booking.status === "COMPLETED"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : booking.status === "CANCELLED"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                              >
                                {booking.status === "COMPLETED" ? (
                                  <CheckCircle size={14} className="mr-1" />
                                ) : booking.status === "PENDING" ? (
                                  <Clock size={14} className="mr-1" />
                                ) : booking.status === "CANCELLED" ? (
                                  <AlertTriangle size={14} className="mr-1" />
                                ) : (
                                  <Clock size={14} className="mr-1" />
                                )}
                                {booking.status}
                              </span>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <Calendar size={16} className="mr-1 text-blue-950" />
                              {formatDate(booking.pickupDate)} at {formatTime(booking.pickupTime)}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{formatFare(booking.totalAmount, booking.status === "PENDING")}</p>
                            {booking.status === "PENDING" && (
                              <button
                                onClick={() => openCancelDialog(booking.bookingId)}
                                className="mt-2 text-sm text-red-600 hover:text-red-900 flex items-center justify-end ml-auto"
                              >
                                <X size={16} className="mr-1" />
                                Cancel
                              </button>
                            )}
                            {booking.status === "CANCELLED" && booking.refundAmount && (
                              <div className="mt-2 text-sm text-green-600 flex items-center justify-end ml-auto">
                                
                                Refund: LKR {booking.refundAmount.toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 bg-gray-50">
                          <div className="flex items-center text-sm text-gray-500">
                            <div className="flex-1">
                              <p className="font-medium text-gray-700">From: {booking.pickupLocation}</p>
                            </div>
                            <ArrowRight size={16} className="mx-2 text-yellow-500" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-700">To: {booking.destination}</p>
                            </div>
                          </div>
                          {booking.status === "CANCELLED" && booking.cancellationReason && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-sm font-medium text-gray-500">Cancellation Reason:</p>
                              <p className="text-sm text-gray-700 mt-1">{booking.cancellationReason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">You have no bookings yet or there was an error loading them.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {showCancelDialog && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Booking</h3>
              <div className="mb-4">
                <label htmlFor="cancellationReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Please provide a reason for cancellation
                </label>
                <textarea
                  id="cancellationReason"
                  rows="3"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    cancellationReasonError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your reason here..."
                  value={cancellationReason}
                  onChange={(e) => {
                    setCancellationReason(e.target.value);
                    if (e.target.value.trim()) setCancellationReasonError(false);
                  }}
                ></textarea>
                {cancellationReasonError && (
                  <p className="mt-1 text-sm text-red-600">Please provide a cancellation reason</p>
                )}
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">You will receive a 10% refund of your fare amount in LKR.</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeCancelDialog}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  onClick={submitCancellation}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerProfile;