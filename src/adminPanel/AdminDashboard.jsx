import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  // Sample data
  const metrics = {
    totalCustomers: 4823,
    totalDrivers: 267,
    totalBookings: 18945
  };
  
  // Line chart data - daily trend
  const lineData = [
    { day: 'Mar 1', value: 10000 },
    { day: 'Mar 3', value: 30000 },
    { day: 'Mar 5', value: 20000 },
    { day: 'Mar 7', value: 29000 },
    { day: 'Mar 9', value: 33000 },
    { day: 'Mar 11', value: 25000 },
    { day: 'Mar 13', value: 39000 }
  ];

  // Bar chart data - monthly data
  const barData = [
    { month: 'January', value: 4200 },
    { month: 'February', value: 5300 },
    { month: 'March', value: 6100 },
    { month: 'April', value: 7500 },
    { month: 'May', value: 9800 },
    { month: 'June', value: 14800 }
  ];

  return (
    <div className="ml-64 bg-gray-100 min-h-screen p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Total Customers</p>
              <h3 className="text-2xl font-bold">{metrics.totalCustomers}</h3>
            </div>
            <div className="p-2 bg-blue-400 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500 text-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Total Drivers</p>
              <h3 className="text-2xl font-bold">{metrics.totalDrivers}</h3>
            </div>
            <div className="p-2 bg-yellow-400 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-green-500 text-white rounded-lg shadow p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Total Bookings</p>
              <h3 className="text-2xl font-bold">{metrics.totalBookings}</h3>
            </div>
            <div className="p-2 bg-green-400 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Daily Booking Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;