import { useState } from "react";

import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";

import Drivers from "./pages/Drivers/Drivers.jsx";
import AboutUs from "./pages/About/AboutUs.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import AdminRoutes from "./adminPanel/AdminRoutes.jsx";
import Sidebar from "./adminPanel/Sidebar.jsx";
import Login from "./pages/AuthPage/Login.jsx";
import Signup from "./pages/AuthPage/Signup.jsx";
import FleetPage from "./pages/Fleets/FleetPage.jsx";
import BookingPage from "./pages/Booking/BookingPage.jsx";
import DriverProfile from "./pages/Drivers/DriverProfile.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Home />
            </main>
          }
        />

        <Route path="/home" element={<Home/>} />  
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/ourfleet" element={<FleetPage/>} />
        <Route path="/booking" element={<BookingPage/>} />
        <Route path="/driverProfile" element={<DriverProfile/>}/>
      </Routes>
    </>
  );
}

export default App;
