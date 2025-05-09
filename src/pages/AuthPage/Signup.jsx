import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import loginPageImg from "../../assets/loginPage_img.jpg";
import Navbar from "../../components/Navbar/Navbar";

// Custom Modern Car Logo component
const ModernCarLogo = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    {/* Modern Car Design */}
    <path d="M3,12 C3,12 3,14 3,15" />
    <path d="M21,12 C21,12 21,14 21,15" />
    {/* Sleek Body */}
    <path
      d="M4,10 C7,9 17,9 20,10 L19,14 C16,13 8,13 5,14 L4,10z"
      strokeLinejoin="round"
    />
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

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    nic: "", // Added NIC field
    address: "", // Added Address field
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Prepare the data to match the backend `Customer` entity
      const customerData = {
        customerName: formData.fullName,
        customerAddress: formData.address,
        customerNIC: formData.nic,
        customerPhone: formData.phone,
        email: formData.email,
        password: formData.password,
      };

      // Send a POST request to the backend
      const response = await fetch("http://localhost:8080/auth/customers/createCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const result = await response.json();
      console.log("Customer created successfully:", result);

      // Reset the form after successful submission
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        nic: "",
        address: "",
      });

      // Redirect or show a success message
      alert("Customer created successfully!");
    } catch (error) {
      console.error("Error creating customer:", error);
      setError("Failed to create customer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <div
        className="fixed inset-0 w-full h-full bg-no-repeat bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${loginPageImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Signup Form Container - More transparent with increased backdrop-blur */}
        <div className="z-10 backdrop-blur-sm bg-blue-950/30 rounded-xl shadow-2xl overflow-hidden w-full max-w-md mx-4 border border-blue-500/30">
          {/* Header with more transparency */}
          <div className="bg-blue-950/20 p-3 relative">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400"></div>

            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-blue-900 shadow-lg mr-3">
                <ModernCarLogo />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-wider">
                  MEGACITY
                </h2>
                <p className="text-xs text-blue-200">Join our community</p>
              </div>
            </div>
          </div>

          {/* Form - More transparent with subtle backdrop blur */}
          <div className="p-4 bg-blue-900/10 backdrop-blur-sm">
            {error && (
              <div className="mb-3 bg-red-900/30 backdrop-blur-sm border border-red-500/50 p-2 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-medium text-blue-100"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-1.5 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg shadow-sm placeholder-blue-300 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm transition-all duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-medium text-blue-100"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-1.5 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg shadow-sm placeholder-blue-300 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm transition-all duration-200"
                      placeholder="+94 71 234 5678"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-blue-100"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-1.5 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg shadow-sm placeholder-blue-300 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm transition-all duration-200"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="nic"
                  className="block text-xs font-medium text-blue-100"
                >
                  NIC Number
                </label>
                <div className="mt-1">
                  <input
                    id="nic"
                    name="nic"
                    type="text"
                    required
                    value={formData.nic}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-1.5 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg shadow-sm placeholder-blue-300 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm transition-all duration-200"
                    placeholder="123456789V"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-xs font-medium text-blue-100"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-1.5 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg shadow-sm placeholder-blue-300 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm transition-all duration-200"
                    placeholder="123 Main St, City"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-blue-100"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-1.5 bg-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-lg shadow-sm placeholder-blue-300 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex justify-center py-1.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-blue-900 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-4 w-4 text-blue-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Create account"
                  )}
                </button>
              </div>
            </form>

            {/* Link to Login Page */}
            <div className="mt-4 text-center">
              <p className="text-xs text-blue-200">
                Already have an account?{" "}
                <Link
                  to="/login" // Link to the login page
                  className="font-medium text-yellow-400 hover:text-yellow-300 focus:outline-none transition-all duration-200"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-blue-950/30 px-3 py-2 text-center text-xs text-blue-300 border-t border-blue-400/30">
            &copy; 2025 Mega City Cab. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;