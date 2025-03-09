import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Clock, MapPin, ChevronRight, Shield, Star, ArrowRight } from 'lucide-react';

const ModernCarLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    {/* Modern Car Design */}
    <path d="M3,12 C3,12 3,14 3,15" />
    <path d="M21,12 C21,12 21,14 21,15" />
    {/* Sleek Body */}
    <path d="M4,10 C7,9 17,9 20,10 L19,14 C16,13 8,13 5,14 L4,10z" strokeLinejoin="round" />
    {/* Roof */}
    <path d="M7,10 C9,7.5 15,7.5 17,10" strokeLinecap="round" />
    {/* Wheels */}
    <circle cx="7.5" cy="14" r="2" />
    <circle cx="16.5" cy="14" r="2" />
    {/* Headlights */}
    <path d="M19,11.5 L18.5,13" strokeLinecap="round" />
    <path d="M5,11.5 L5.5,13" strokeLinecap="round" />
    {/* Additional Details */}
    <path d="M9.5,10.5 L14.5,10.5" strokeLinecap="round" strokeWidth="1" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Adjust the threshold as needed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative font-sans antialiased">
      
      {/* Main Navbar */}
      <div className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white/90 backdrop-blur-md'
      }`}>
        <nav className="container mx-auto">
          <div className="flex justify-between items-center py-3 px-8">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className={`text-blue-950 transition-all duration-300 ${
                isScrolled ? 'scale-95' : 'scale-100'
              }`}>
                <ModernCarLogo />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-950">
                  MEGACITY
                </span>
                <span className="text-xs tracking-widest text-slate-600">
                  PREMIUM TRANSPORT
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              <ul className="flex gap-8">
                {['Home', 'OurFleet',  'About', 'Contact'].map((item) => (
                  <li key={item} className="relative group">
                    <a href={`/${item.toLowerCase()}`} 
                       className="text-slate-800 font-medium py-1.5 transition-colors hover:text-blue-950">
                      {item}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-950/90 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-5">
              <a href="/drivers" className="group relative px-4 py-1.5 font-medium text-slate-700 hover:text-blue-950 transition-colors">
                Drive
                <span className="absolute inset-x-0 bottom-0 h-px bg-blue-950/90 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a href="/ourfleet" className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-white font-medium bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl">
                <span>Book a Ride</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </a>

              <a href="/login" className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-blue-950 font-medium bg-transparent border-2 border-blue-950 rounded-lg hover:bg-blue-950 hover:text-white transition-all shadow-sm hover:shadow-md">
                <span>Login</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm px-6 py-3">
              <ul className="divide-y divide-slate-200">
                {['Home', 'Our Fleet', 'Services', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} 
                       className="block py-2.5 text-slate-700 hover:text-blue-950 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
                <li className="pt-3 space-y-2.5">
                  <a href="/drivers" 
                     className="block w-full py-2 text-center text-slate-700 border border-slate-200 rounded-lg hover:border-blue-950/20 hover:text-blue-950 transition-colors">
                    Drive 
                  </a>
                  <a href="/book" 
                     className="block w-full py-2 text-center text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition-colors">
                    Book a Ride
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;