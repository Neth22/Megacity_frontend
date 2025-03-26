import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useAuth } from "../../util/AuthContext";

const ModernCarLogo = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3,12 C3,12 3,14 3,15" />
    <path d="M21,12 C21,12 21,14 21,15" />
    <path d="M4,10 C7,9 17,9 20,10 L19,14 C16,13 8,13 5,14 L4,10z" strokeLinejoin="round" />
    <path d="M7,10 C9,7.5 15,7.5 17,10" strokeLinecap="round" />
    <circle cx="7.5" cy="14" r="2" />
    <circle cx="16.5" cy="14" r="2" />
    <path d="M19,11.5 L18.5,13" strokeLinecap="round" />
    <path d="M5,11.5 L5.5,13" strokeLinecap="round" />
    <path d="M9.5,10.5 L14.5,10.5" strokeLinecap="round" strokeWidth="1" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth(); // Get user from AuthContext

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative font-sans antialiased">
      <div
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <nav className="container mx-auto">
          <div className="flex justify-between items-center py-3 px-8">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div
                className={`text-blue-950 transition-all duration-300 ${
                  isScrolled ? "scale-95" : "scale-100"
                }`}
              >
                <ModernCarLogo />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-950">MEGACITY</span>
                <span className="text-xs tracking-widest text-slate-600">
                  PREMIUM TRANSPORT
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              <ul className="flex gap-8">
                {["Home", "OurFleet", "About", "Contact"].map((item) => (
                  <li key={item} className="relative group">
                    <a
                      href={`/${item.toLowerCase()}`}
                      className="text-slate-800 font-medium py-1.5 transition-colors hover:text-blue-950"
                    >
                      {item}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-950/90 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="/drivers"
                className="group relative px-4 py-1.5 font-medium text-slate-700 hover:text-blue-950 transition-colors"
              >
                Drive
                <span className="absolute inset-x-0 bottom-0 h-px bg-blue-950/90 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              <a
                href="/ourfleet"
                className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-white font-medium bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl"
              >
                <span>Book a Ride</span>
                <ArrowRight
                  size={16}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </a>

              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-3 focus:outline-none group">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-blue-950 text-white flex items-center justify-center border-2 border-blue-950 group-hover:border-blue-950/80 transition-colors shadow-md">
                        {/* Use user.username directly from AuthContext */}
                        {user.username ? user.username.charAt(0).toUpperCase() : "U"}
                      </div>
                      <ChevronDown className="w-4 h-4 text-blue-950 absolute -right-6 top-1/2 -translate-y-1/2" />
                    </div>
                  </button>
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-100">
                    <div className="px-4 py-3 text-sm font-medium text-blue-950 border-b border-gray-100 capitalize">
                      {user.role?.replace("ROLE_", "").toLowerCase()}
                    </div>
                    {user.role === "ROLE_DRIVER" && (
                      <a
                        href="/driverProfile"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-950 hover:bg-gray-50 transition-colors"
                      >
                        Profile
                      </a>
                    )}
                    {user.role === "ROLE_CUSTOMER" && (
                      <a
                        href="/customerProfile"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-950 hover:bg-gray-50 transition-colors"
                      >
                        Profile
                      </a>
                    )}
                    
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2.5 text-sm text-blue-950 hover:bg-gray-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <a
                  href="/login"
                  className="group relative inline-flex items-center gap-2 px-6 py-2.5 text-blue-950 font-medium bg-transparent border-2 border-blue-950 rounded-lg hover:bg-blue-950 hover:text-white transition-all shadow-sm hover:shadow-md"
                >
                  <span>Login</span>
                </a>
              )}
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
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm px-6 py-3">
              <ul className="divide-y divide-slate-200">
                {["Home", "Our Fleet", "Services", "About", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="block py-2.5 text-slate-700 hover:text-blue-950 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
                <li className="pt-3 space-y-2.5">
                  <a
                    href="/drivers"
                    className="block w-full py-2 text-center text-slate-700 border border-slate-200 rounded-lg hover:border-blue-950/20 hover:text-blue-950 transition-colors"
                  >
                    Drive
                  </a>
                  <a
                    href="/book"
                    className="block w-full py-2 text-center text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition-colors"
                  >
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