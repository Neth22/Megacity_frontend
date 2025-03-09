import React from 'react';
import Header from '../../components/Header/Header';
import VehicleShowcase from '../../components/VehicleShowcase/VehicleShowcase';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Features from '../../components/Features/Features';
import { TestimonialSection } from '../../components/Testimonials/TestimonialSection';




const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <Header/>
      <Features/>
      <VehicleShowcase/>
      <TestimonialSection/>
      <Footer/>
      
    </div>
  );
}

export default Home;
