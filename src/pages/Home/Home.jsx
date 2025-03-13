import React from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Features from '../../components/Features/Features';
import { TestimonialSection } from '../../components/Testimonials/TestimonialSection';
import CabServiceSection from '../../components/CabServiceSection/CabServiceSection';




const Home = () => {
  return (
    <div className="home">
      <Navbar/>
      <Header/>
      <Features/>
      <CabServiceSection/>
      <TestimonialSection/>
      <Footer/>
      
    </div>
  );
}

export default Home;
