import React, { useState } from 'react';
import { User, Mail, Phone, Car, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import driver_img from "/src/assets/driver_img.webp";
import axios from 'axios';

const Drivers = () => {
  const [step, setStep] = useState(1);
  const [hasCar, setHasCar] = useState(false);

  const [formData, setFormData] = useState({
    driverName: '',
    email: '',
    driverLicenseNo: '',
    driverPhoneNum: '',
    password: '',
    hasOwnCar: false,
    carLicensePlate: '',
    carBrand: '',
    carModel: '',
    capacity: 4,
    baseRate: 0,
    driverRate: 0,
    carImg: null,
  });

  const [errors, setErrors] = useState({});

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'carImg') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.driverName) newErrors.driverName = 'Full Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.driverPhoneNum) newErrors.driverPhoneNum = 'Phone Number is required';
      if (!formData.driverLicenseNo) newErrors.driverLicenseNo = 'License No is required';
      if (!formData.password) newErrors.password = 'Password is required';
    } else if (step === 2 && hasCar) {
      if (!formData.carLicensePlate) newErrors.carLicensePlate = 'Car License Plate is required';
      if (!formData.carBrand) newErrors.carBrand = 'Car Brand is required';
      if (!formData.carModel) newErrors.carModel = 'Car Model is required';
      if (!formData.capacity) newErrors.capacity = 'Number of Seats is required';
      if (!formData.baseRate) newErrors.baseRate = 'Base Rate is required';
      if (!formData.driverRate) newErrors.driverRate = 'Driver Rate is required';
      if (!formData.carImg) newErrors.carImg = 'Car Image is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('driverName', formData.driverName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('driverLicenseNo', formData.driverLicenseNo);
      formDataToSend.append('driverPhoneNum', formData.driverPhoneNum);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('hasOwnCar', formData.hasOwnCar);

      if (formData.hasOwnCar) {
        formDataToSend.append('carLicensePlate', formData.carLicensePlate);
        formDataToSend.append('carBrand', formData.carBrand);
        formDataToSend.append('carModel', formData.carModel);
        formDataToSend.append('capacity', formData.capacity);
        formDataToSend.append('baseRate', formData.baseRate);
        formDataToSend.append('driverRate', formData.driverRate);
        if (formData.carImg) {
          formDataToSend.append('carImg', formData.carImg);
        }
      }

      // Connect to the backend endpoint
      const response = await axios.post(
        'http://localhost:8080/auth/driver/createdriver', // Backend URL
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Driver created successfully:', response.data);
      alert('Driver registration successful!');

      // Reset form
      setFormData({
        driverName: '',
        email: '',
        driverLicenseNo: '',
        driverPhoneNum: '',
        password: '',
        hasOwnCar: false,
        carLicensePlate: '',
        carBrand: '',
        carModel: '',
        capacity: 4,
        baseRate: 0,
        driverRate: 0,
        carImg: null,
      });
      setStep(1);
      setHasCar(false);
    } catch (error) {
      console.error('Error creating driver:', error.response?.data || error.message);
      alert('Error creating driver: ' + (error.response?.data || 'Please try again.'));
    }
  };

  const handleNextStep = () => {
    if (!validateForm()) return;
    setStep(step + 1);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 overflow-y-auto pt-20">
          <motion.div className="mb-8" initial={fadeIn.initial} animate={fadeIn.animate} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-blue-950 mb-4 mt-8">Become a Driver</h1>
            <p className="text-lg text-gray-600">Start earning with Sri Lanka's leading ride-hailing platform</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={(e) => e.preventDefault()}>
              {step === 1 && (
                <motion.div className="space-y-6" {...fadeIn} transition={{ duration: 0.5 }}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="driverName"
                          value={formData.driverName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.driverName && <p className="text-red-500 text-sm">{errors.driverName}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Enter your email"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="driverPhoneNum"
                          value={formData.driverPhoneNum}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="+94 71 234 5678"
                        />
                      </div>
                      {errors.driverPhoneNum && <p className="text-red-500 text-sm">{errors.driverPhoneNum}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">License No</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="driverLicenseNo"
                          value={formData.driverLicenseNo}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Enter license number"
                        />
                      </div>
                      {errors.driverLicenseNo && <p className="text-red-500 text-sm">{errors.driverLicenseNo}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Enter your password"
                        />
                      </div>
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="col-span-full space-y-2">
                      <label className="text-sm font-medium text-gray-700">Do you have your own car?</label>
                      <div className="flex items-center space-x-4">
                        <button
                          type="button"
                          onClick={() => {
                            setHasCar(true);
                            setFormData({ ...formData, hasOwnCar: true });
                          }}
                          className={`px-4 py-2 rounded-lg ${hasCar ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setHasCar(false);
                            setFormData({ ...formData, hasOwnCar: false });
                          }}
                          className={`px-4 py-2 rounded-lg ${!hasCar ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && hasCar && (
                <motion.div className="space-y-6" {...fadeIn} transition={{ duration: 0.5 }}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">Vehicle Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Car License Plate</label>
                      <div className="relative">
                        <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="carLicensePlate"
                          value={formData.carLicensePlate}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          placeholder="Enter license plate"
                        />
                      </div>
                      {errors.carLicensePlate && <p className="text-red-500 text-sm">{errors.carLicensePlate}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Car Brand</label>
                      <input
                        type="text"
                        name="carBrand"
                        value={formData.carBrand}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        placeholder="e.g., Toyota"
                      />
                      {errors.carBrand && <p className="text-red-500 text-sm">{errors.carBrand}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Car Model</label>
                      <input
                        type="text"
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        placeholder="e.g., Corolla"
                      />
                      {errors.carModel && <p className="text-red-500 text-sm">{errors.carModel}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Number of Seats</label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        placeholder="e.g., 4"
                      />
                      {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Base Rate (LKR)</label>
                      <input
                        type="number"
                        name="baseRate"
                        value={formData.baseRate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        placeholder="e.g., 500"
                      />
                      {errors.baseRate && <p className="text-red-500 text-sm">{errors.baseRate}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Driver Rate (LKR/km)</label>
                      <input
                        type="number"
                        name="driverRate"
                        value={formData.driverRate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        placeholder="e.g., 50"
                      />
                      {errors.driverRate && <p className="text-red-500 text-sm">{errors.driverRate}</p>}
                    </div>

                    <div className="col-span-full space-y-2">
                      <label className="text-sm font-medium text-gray-700">Car Image</label>
                      <input
                        type="file"
                        name="carImg"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                      />
                      {errors.carImg && <p className="text-red-500 text-sm">{errors.carImg}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div className="flex justify-between mt-8 pt-6 border-t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-2 text-blue-600 font-medium hover:text-blue-900 transition-colors flex items-center"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => (step < 2 ? handleNextStep() : handleSubmit())}
                  className="ml-auto flex items-center space-x-2 px-6 py-2.5 bg-blue-950 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <span>{step === 2 ? 'Submit Application' : 'Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        <div className="hidden lg:block w-1/2 bg-blue-950 relative overflow-hidden">
          <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0">
            <img src={driver_img} alt="Driver Partner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-blue-950/50" />
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <h2 className="text-3xl font-bold mb-4">Join Our Growing Team</h2>
                <p className="text-lg text-white/90">Flexible hours, competitive earnings, and the freedom to be your own boss.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Drivers;