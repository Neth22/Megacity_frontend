import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import axios from "axios";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("http://localhost:8080/auth/bookings/getallbookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.status} - ${err.response.data.message}`);
        } else if (err.request) {
          setError("Error: No response from server");
        } else {
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return { icon: FaCheckCircle, color: "text-emerald-500", bg: "bg-emerald-100" };
      case "Pending":
        return { icon: FaClock, color: "text-amber-500", bg: "bg-amber-100" };
      case "Cancelled":
        return { icon: FaTimesCircle, color: "text-rose-500", bg: "bg-rose-100" };
      default:
        return { icon: FaClock, color: "text-gray-500", bg: "bg-gray-100" };
    }
  };

  if (loading) {
    return (
      <div className="ml-64 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg text-rose-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="ml-64 p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">Your Bookings</h1>
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const StatusIcon = getStatusIcon(booking.status).icon;
            const statusColor = getStatusIcon(booking.status).color;
            const statusBg = getStatusIcon(booking.status).bg;

            return (
              <div
                key={booking.bookingId}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center p-6"
              >
                {/* Left Section - Booking ID and Status */}
                <div className="w-1/4 pr-6 border-r border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    #{booking.bookingId}
                  </h2>
                  <div className={`inline-flex items-center ${statusBg} px-3 py-1 rounded-full`}>
                    <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                    <span className={`ml-2 text-sm font-medium ${statusColor}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Middle Section - Details */}
                <div className="w-2/4 px-6 flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Customer:</span>
                    <span className="text-gray-800">{booking.customerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">From:</span>
                    <span className="text-gray-800">{booking.pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">To:</span>
                    <span className="text-gray-800">{booking.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Booked:</span>
                    <span className="text-gray-800">{booking.bookingDate}</span>
                  </div>
                </div>

                {/* Right Section - Pickup Info and Amount */}
                <div className="w-1/4 pl-6 border-l border-gray-100">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Date:</span>
                      <span className="text-gray-800">{booking.pickupDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-medium">Time:</span>
                      <span className="text-gray-800">{booking.pickupTime}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="text-gray-600 font-medium">Amount:</span>
                      <span className="text-gray-800 font-semibold">
                        ${booking.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-xl p-8 text-center border border-gray-100">
          <p className="text-xl text-gray-700 font-medium">No bookings available</p>
          <p className="text-gray-500 mt-2">
            There are currently no bookings to display.
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewBookings;