import React from 'react';
import { Routes,Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import BookingDashboard from './BookingDashboard';
import AdminLayout from './AdminLayout';
import DriverDashboard from './DriverDashboard';

const AdminRoutes = () => {
  return (
    <div >
        <Routes>

         <Route path='/' element={<AdminLayout/>} >
         <Route index element={<AdminDashboard/>} />
         <Route path='dashboard' element={<AdminDashboard/>} />
         <Route path='bookingDashboard' element={<BookingDashboard/>} />
         <Route path='driverDashboard' element={<DriverDashboard/>} />
         </Route>
         
        </Routes>
      
    </div>
  );
}

export default AdminRoutes;
