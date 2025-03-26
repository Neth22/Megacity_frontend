import React from 'react';
import aboutUs_img from "/src/assets/aboutUs_img.png";

import { 
  Users, 
  Car,
  Shield,
  MapPin,
  PhoneCall,
  Mail,
  ChevronRight,
  Clock,
  Star,
  Navigation
} from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AboutUs = () => {
  const stats = [
    { number: "10K+", label: "Monthly Rides", icon: Car },
    { number: "5K+", label: "Active Customers", icon: Users },
    { number: "500+", label: "Verified Drivers", icon: Shield },
    { number: "98%", label: "Satisfaction Rate", icon: Star }
  ];

  const features = [
    { 
      icon: Clock, 
      title: "24/7 Service",
      description: "Round-the-clock cab service in Colombo city and suburbs, ready whenever you need us."
    },
    { 
      icon: Shield, 
      title: "Safe Rides",
      description: "All our drivers are verified and trained to ensure your safety and comfort."
    },
    { 
      icon: Navigation, 
      title: "City Coverage",
      description: "Extensive coverage across Colombo with quick pickup times and reliable service."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      {/* Hero Section */}
      <div className="relative bg-blue-950 h-[70vh]">
        <div 
          className="absolute inset-0 bg-[url('/src/assets/aboutUs_img1.jpg')] bg-cover bg-center"
          style={{ opacity: 0.3 }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b " />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl animate-fade-in">
            <div className="flex items-center text-white/80 space-x-2 mb-6">
              <a href="/home" className="hover:text-yellow-200 transition-colors">Home</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-yellow-500">About Us</span>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6">
              Your Trusted Cab Service in
              <span className="text-yellow-500 block mt-2">Colombo City</span>
            </h1>
            <p className="text-xl text-gray-300">
              Providing safe, reliable, and comfortable transportation services to thousands of 
              customers across Colombo since 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 container mx-auto px-4 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-up">
          {stats.map((stat, index) => (
            <div key={index} 
                 className="bg-white rounded-xl shadow-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <stat.icon className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-950 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section with Image */}
      <div className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold text-blue-950">
              Sri Lanka's Leading
              <span className="text-yellow-500 block mt-2">Cab Service Provider</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Mega City Cab has transformed urban transportation in Colombo with our commitment 
              to excellence and customer satisfaction. We understand the pulse of the city and 
              provide tailored solutions for all your transportation needs.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-yellow-500" />
                <span className="text-blue-950">Verified Drivers</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-yellow-500" />
                <span className="text-blue-950">24/7 Service</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src={aboutUs_img }
                alt="Mega City Cab Service" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-950/80 to-transparent p-6">
                <p className="text-white text-xl">Experience the Difference</p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-blue-950 rounded-2xl -z-10" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-950 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Why Choose <span className="text-yellow-500">Mega City Cab</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-lg p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-up"
              >
                <div className="bg-yellow-500 text-blue-950 p-4 rounded-xl inline-block mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-16">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a 
                href="tel:1234567890" 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group animate-fade-up"
              >
                <div className="bg-blue-950 text-yellow-500 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">Call Us</h3>
                <span className="text-gray-600">+94 (11) 234-5678</span>
              </a>
              <a 
                href="mailto:info@megacitycab.lk" 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group animate-fade-up"
              >
                <div className="bg-blue-950 text-yellow-500 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">Email Us</h3>
                <span className="text-gray-600">info@megacitycab.lk</span>
              </a>
              <a 
                href="#location" 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group animate-fade-up"
              >
                <div className="bg-blue-950 text-yellow-500 p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">Visit Us</h3>
                <span className="text-gray-600">Colombo 03, Sri Lanka</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-950 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Experience Our Service?
          </h2>
          <a href='/ourfleet' className="bg-yellow-500 text-blue-950 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-400 transition-colors animate-bounce">
            Book a Ride Now
          </a>
        </div>
        
      </div>
      <Footer/>
      

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-up {
          animation: fadeUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
