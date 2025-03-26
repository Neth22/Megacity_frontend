import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset previous states
    setError('');
    setSubscribeSuccess(false);

    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate newsletter subscription (replace with actual API call)
    console.log('Subscribing with email:', email);
    
    // Show success message
    setSubscribeSuccess(true);
    
    // Clear input
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Mega City Cab</h3>
            <p className="mb-4">Your trusted transportation partner in Colombo City, serving thousands of customers monthly.</p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/megacitycab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/megacitycab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.twitter.com/megacitycab" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/ourfleet" className="hover:text-white">Book a Ride</a></li>
              <li><a href="/drivers" className="hover:text-white">Career</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Join Our Newsletter</h4>
            <p className="mb-4">Subscribe to get the latest updates, exclusive offers, and travel tips directly in your inbox.</p>
            
            {subscribeSuccess ? (
              <div className="flex items-center space-x-2 text-green-500">
                <CheckCircle size={24} />
                <p>Thank you for subscribing!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            )}
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;