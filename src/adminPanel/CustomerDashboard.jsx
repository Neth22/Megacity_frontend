import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Fetch customers from the backend
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/customers/viewCustomers");
        setCustomers(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching customers. Please try again later.");
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="ml-64 p-6 bg-gray-100 min-h-screen">Loading...</div>; // Added ml-64
  }

  if (error) {
    return <div className="ml-64 p-6 bg-gray-100 min-h-screen">{error}</div>; // Added ml-64
  }

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen"> {/* Added ml-64 */}
      <h1 className="text-2xl font-bold mb-6">Customer List</h1>

      {/* Table to display customers */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {customers.length > 0 ? (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIC
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.customerPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.customerNIC}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                      onClick={() => handleViewCustomer(customer)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">No customers available</p>
            <p className="text-gray-500 text-sm">There are currently no customers to display.</p>
          </div>
        )}
      </div>

      {/* Modal for viewing customer details */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>
            <p><strong>Name:</strong> {selectedCustomer.customerName}</p>
            <p><strong>NIC:</strong> {selectedCustomer.customerNIC}</p>
            <p><strong>Phone Number:</strong> {selectedCustomer.customerPhone}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Address:</strong> {selectedCustomer.customerAddress}</p>
            
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;