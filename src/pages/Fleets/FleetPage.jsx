import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Fleets from '../../components/Fleets/Fleets';
import Footer from '../../components/Footer/Footer';

const FleetPage = () => {
  return (
    <div className='ourfleet'>

        <Navbar/>
        <Fleets/>
        <Footer/>
      
    </div>
  );
}

export default FleetPage;
