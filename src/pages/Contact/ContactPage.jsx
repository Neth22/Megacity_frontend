import { motion } from "framer-motion";
import { ChevronRight, MapPin, Phone, Mail, Clock, MapIcon, MessageSquare } from "lucide-react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // 'form' or 'info'
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", form);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  // Frequently asked questions
  const faqs = [
    {
      question: "How do I book an airport transfer?",
      answer: "You can book an airport transfer through our website by filling out the contact form, calling our 24/7 booking line at +94 77 123 4567, or emailing us at bookings@megacitycab.com with your flight details and pickup location."
    },
    {
      question: "What is the cancellation policy?",
      answer: "We offer free cancellations up to 12 hours before your scheduled pickup time. Cancellations made less than 12 hours in advance may incur a 50% fee. No-shows will be charged the full fare."
    },
    {
      question: "Are your prices fixed or metered?",
      answer: "We offer fixed prices for all our routes, especially for airport transfers and city tours. The price quoted at booking is the price you pay - no hidden fees or surge pricing. For hourly bookings, we have transparent hourly rates."
    },
    {
      question: "Do you offer child seats?",
      answer: "Yes, we provide child seats upon request at no additional charge. Please specify the age of your child when booking so we can prepare the appropriate safety seat for your journey."
    },
    {
      question: "How early should I book for airport pickup?",
      answer: "We recommend booking at least 24 hours in advance for airport pickups to ensure availability. However, we do accommodate last-minute bookings subject to driver availability."
    },
    {
      question: "Do you offer multi-day tour packages?",
      answer: "Yes, we offer customized multi-day tour packages throughout Sri Lanka. Our experienced drivers double as guides to give you an authentic local experience. Contact us for a personalized itinerary."
    }
  ];

  const toggleQuestion = (index) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-white">
      <Navbar/>
      
      {/* Header Section with Parallax Effect */}
      <div className="relative h-[32rem] bg-blue-950 overflow-hidden flex items-end pb-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[url('/src/assets/contact_img.webp')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 to-blue-900/20" />
        </motion.div>
        
        {/* Animated Shapes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-10 right-0 w-96 h-96 bg-yellow-500 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-40 left-20 w-64 h-64 bg-blue-400 rounded-full"
        />
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center text-white/80 space-x-2 mb-6"
          >
            <a href='/home' className="hover:text-yellow-200 transition-colors cursor-pointer">Home</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-yellow-500">Contact</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Let's Start a <span className="text-yellow-500">Journey</span> Together<span className="text-yellow-500">.</span>
            </h1>
            <p className="text-lg text-white/80">
              Available 24/7 for your transportation needs in Colombo. Contact MegaCityCab for reliable, professional, and affordable taxi services.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* FAQ Section - Modern Style */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-950">
            Frequently <span className="text-yellow-500">Asked Questions</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
          <p className="text-blue-950 mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our services, booking process, and policies.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div 
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${expandedQuestion === index ? 'shadow-lg' : ''}`}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-950">{faq.question}</h3>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-yellow-500 transform transition-transform duration-300 ${expandedQuestion === index ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedQuestion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-blue-950/80 border-t border-gray-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Map Section with Actual Map */}
      <div className="container mx-auto px-4 py-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-blue-950">
            Find Us On The <span className="text-yellow-500">Map</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Actual Map Implementation */}
          <div className="relative w-full h-96">
            {/* Replace this with your Google Maps component */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162759946!2d79.7959725!3d6.9218374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1709997667037!5m2!1sen!2sus" 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Location Marker Overlay */}
            <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-lg shadow-lg z-10 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-yellow-500" />
              <div className="text-blue-950 font-medium">MegaCityCab, 123 Main Street, Colombo</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Contact Information and Form - Redesigned */}
      <div className="container mx-auto px-4 py-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-950">
            Get In <span className="text-yellow-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4"></div>
          <p className="text-blue-950 mt-4 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help! Reach out through any of the channels below.
          </p>
        </motion.div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          {/* Tabs for mobile view */}
          <div className="flex md:hidden border-b">
            <button 
              onClick={() => setActiveTab("form")} 
              className={`flex-1 py-4 text-center font-medium ${activeTab === "form" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-blue-950"}`}
            >
              Contact Form
            </button>
            <button 
              onClick={() => setActiveTab("info")} 
              className={`flex-1 py-4 text-center font-medium ${activeTab === "info" ? "text-yellow-500 border-b-2 border-yellow-500" : "text-blue-950"}`}
            >
              Contact Info
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`md:w-2/5 bg-gradient-to-br from-blue-900 to-blue-950 p-8 text-white ${activeTab === "info" || window.innerWidth >= 768 ? "block" : "hidden"}`}
            >
              <div className="h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-8 relative">
                  Contact Information
                  <div className="absolute -bottom-3 left-0 w-12 h-1 bg-yellow-500"></div>
                </h3>
                
                <div className="space-y-8 mb-auto">
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Our Location</h4>
                      <p className="text-white/80 mt-1">123, Main Street, Colombo 07, Sri Lanka</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Call Us</h4>
                      <p className="text-white/80 mt-1">+94 77 123 4567 (Bookings)</p>
                      <p className="text-white/80">+94 76 987 6543 (Support)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email Us</h4>
                      <p className="text-white/80 mt-1">bookings@megacitycab.com</p>
                      <p className="text-white/80">support@megacitycab.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-800/50 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Working Hours</h4>
                      <p className="text-white/80 mt-1">Cab Services: Available 24/7</p>
                      <p className="text-white/80">Office: 9AM - 6PM (Mon-Fri)</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-500 opacity-10 rounded-tl-full"></div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`md:w-3/5 p-8 ${activeTab === "form" || window.innerWidth >= 768 ? "block" : "hidden"}`}
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div className="absolute w-full h-full top-0 left-0 border-4 border-green-500 rounded-full animate-ping opacity-20"></div>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-blue-950 mb-2">Thank You!</h2>
                  <p className="text-blue-950/70 text-center max-w-md">
                    Your message has been sent successfully. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-blue-950 mb-8 relative">
                    Send Message
                    <div className="absolute -bottom-3 left-0 w-12 h-1 bg-yellow-500"></div>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input 
                        type="text" 
                        name="name" 
                        id="name"
                        value={form.name} 
                        onChange={handleChange} 
                        className="peer w-full bg-gray-100 outline-none rounded-lg px-4 pt-8 pb-2 border-2 border-transparent focus:border-yellow-500 transition-all text-black" 
                        placeholder=" " 
                        required 
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute text-blue-950/60 left-4 top-5 peer-focus:text-xs peer-focus:top-2 peer-focus:text-yellow-500 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base transition-all "
                      >
                        Your Name
                      </label>
                    </div>
                    
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={form.email} 
                        onChange={handleChange} 
                        className="peer w-full bg-gray-100 outline-none rounded-lg px-4 pt-8 pb-2 border-2 border-transparent focus:border-yellow-500 transition-all text-black" 
                        placeholder=" " 
                        required 
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute text-blue-950/60 left-4 top-5 peer-focus:text-xs peer-focus:top-2 peer-focus:text-yellow-500 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base transition-all"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input 
                        type="tel" 
                        name="phone" 
                        id="phone"
                        value={form.phone} 
                        onChange={handleChange} 
                        className="peer w-full bg-gray-100 outline-none rounded-lg px-4 pt-8 pb-2 border-2 border-transparent focus:border-yellow-500 transition-all text-black" 
                        placeholder=" " 
                        required 
                      />
                      <label 
                        htmlFor="phone" 
                        className="absolute text-blue-950/60 left-4 top-5 peer-focus:text-xs peer-focus:top-2 peer-focus:text-yellow-500 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base transition-all"
                      >
                        Phone Number
                      </label>
                    </div>
                    
                    <div className="relative">
                      <select 
                        name="service" 
                        id="service"
                        value={form.service} 
                        onChange={handleChange} 
                        className="peer w-full bg-blue-800 outline-none rounded-lg px-4 pt-8 pb-2 border-2 border-transparent focus:border-blue-100 appearance-none transition-all" 
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="airport">Airport Transfer</option>
                        <option value="city">City Tour</option>
                        <option value="corporate">Corporate Service</option>
                        <option value="events">Events & Weddings</option>
                        <option value="premium">Premium Fleet</option>
                        <option value="other">Other Services</option>
                      </select>
                      <label 
                        htmlFor="service" 
                        className="absolute text-blue-950/60 left-4 top-2 text-xs text-gray-100 transition-all"
                      >
                        Service Needed
                      </label>
                      <ChevronRight className="absolute right-4 top-6 w-4 h-4 text-blue-950/60 transform rotate-90" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <textarea 
                      name="message" 
                      id="message"
                      value={form.message} 
                      onChange={handleChange} 
                      className="peer w-full bg-gray-100 outline-none rounded-lg px-4 pt-8 pb-2 border-2 border-transparent focus:border-yellow-500 transition-all min-h-32 text-black" 
                      placeholder=" " 
                      rows="4" 
                      required 
                    ></textarea>
                    <label 
                      htmlFor="message" 
                      className="absolute text-blue-950/60 left-4 top-5 peer-focus:text-xs peer-focus:top-2 peer-focus:text-yellow-500 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base transition-all"
                    >
                      Your Message
                    </label>
                  </div>
                  
                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center"
                  >
                    Send Message
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}