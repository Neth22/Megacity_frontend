import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
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

  const handleEdit = (id) => {
    console.log("Edit booking with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete booking with ID:", id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return { icon: FaCheckCircle, color: "text-green-500" };
      case "Pending":
        return { icon: FaClock, color: "text-yellow-500" };
      case "Cancelled":
        return { icon: FaTimesCircle, color: "text-red-500" };
      default:
        return { icon: FaClock, color: "text-gray-500" };
    }
  };

  if (loading) {
    return <div className="p-6 bg-gray-100 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 bg-gray-100 min-h-screen">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">View Bookings</h1>
      <div className="bg-white shadow-md rounded-lg p-6 max-h-[70vh] overflow-y-auto">
        {bookings.map((booking) => {
          const StatusIcon = getStatusIcon(booking.status).icon;
          const statusColor = getStatusIcon(booking.status).color;

          return (
            <div
              key={booking.bookingId}
              className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{booking.customerId}</h2>
                <StatusIcon className={`w-6 h-6 ${statusColor}`} />
              </div>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Pickup Location:</span> {booking.pickupLocation}
                </p>
                <p>
                  <span className="font-medium">Destination:</span> {booking.destination}
                </p>
                <p>
                  <span className="font-medium">Booking Date:</span> {booking.bookingDate}
                </p>
                <p>
                  <span className="font-medium">Pickup Date:</span> {booking.pickupDate}
                </p>
                <p>
                  <span className="font-medium">Pickup Time:</span> {booking.pickupTime}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> ${booking.totalAmount.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className={`${statusColor}`}>{booking.status}</span>
                </p>
              </div>
             
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBookings;