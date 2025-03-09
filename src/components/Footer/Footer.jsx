import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Mega City Cab</h3>
            <p className="mb-4">Your trusted transportation partner in Colombo City, serving thousands of customers monthly.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Book a Ride</a></li>
              <li><a href="#" className="hover:text-white">Career</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">City Rides</a></li>
              <li><a href="#" className="hover:text-white">Airport Transfer</a></li>
              <li><a href="#" className="hover:text-white">Corporate Services</a></li>
              <li><a href="#" className="hover:text-white">Tour Packages</a></li>
              <li><a href="#" className="hover:text-white">Luxury Fleet</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <span>+94 11 2345678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <span>info@megacitycab.lk</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} />
                <span>123 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Mega City Cab. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="mx-3 hover:text-white">Privacy Policy</a>
              <a href="#" className="mx-3 hover:text-white">Terms of Service</a>
              <a href="#" className="mx-3 hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;