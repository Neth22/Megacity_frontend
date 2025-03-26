import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Base URL for API - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8080';

// Add authorization headers to all axios requests
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const CarDashboard = () => {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    carBrand: '',
    carModel: '',
    carLicensePlate: '',
    capacity: 4,
    baseRate: 0,
    driverRate: 0,
    carImg: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/all/viewCars`);
      setCars(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cars. Please try again later.');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files[0]
      });
    } else if (type === 'number') {
      const parsedValue = value === '' ? 0 : parseFloat(value);
      setFormData({
        ...formData,
        [name]: isNaN(parsedValue) ? 0 : parsedValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddNew = () => {
    setFormData({
      carBrand: '',
      carModel: '',
      carLicensePlate: '',
      capacity: 4,
      baseRate: 0,
      driverRate: 0,
      carImg: null
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (car) => {
    setFormData({
      carBrand: car.carBrand,
      carModel: car.carModel,
      carLicensePlate: car.carLicensePlate,
      capacity: car.capacity || 4,
      baseRate: car.baseRate || 0,
      driverRate: car.driverRate || 0,
    });
    setCurrentCar(car);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isEditing) {
        const updateData = {
          carBrand: formData.carBrand,
          carModel: formData.carModel,
          carLicensePlate: formData.carLicensePlate,
          capacity: parseInt(formData.capacity) || 4,
          baseRate: parseFloat(formData.baseRate) || 0,
          driverRate: parseFloat(formData.driverRate) || 0,
          carImgUrl: currentCar.carImgUrl,
          available: currentCar.available,
          assignedDriverId: currentCar.assignedDriverId
        };
        
        const response = await axios.put(
          `${API_BASE_URL}/auth/cars/updateCar/${currentCar.carId}`, 
          updateData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        setCars(cars.map(car => car.carId === currentCar.carId ? response.data : car));
      } else {
        const formDataObj = new FormData();
        formDataObj.append('carBrand', formData.carBrand);
        formDataObj.append('carModel', formData.carModel);
        formDataObj.append('carLicensePlate', formData.carLicensePlate);
        formDataObj.append('capacity', parseInt(formData.capacity) || 4);
        formDataObj.append('baseRate', parseFloat(formData.baseRate) || 0);
        formDataObj.append('driverRate', parseFloat(formData.driverRate) || 0);
        
        if (formData.carImg) {
          formDataObj.append('carImg', formData.carImg);
        }
        
        const response = await axios.post(
          `${API_BASE_URL}/auth/cars/createCar`, 
          formDataObj,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        
        setCars([...cars, response.data]);
      }
      
      setShowModal(false);
      setFormData({
        carBrand: '',
        carModel: '',
        carLicensePlate: '',
        capacity: 4,
        baseRate: 0,
        driverRate: 0,
        carImg: null
      });
      setIsEditing(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          (isEditing ? 'Failed to update car.' : 'Failed to create car.');
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/auth/cars/${carId}`);
        setCars(cars.filter(car => car.carId !== carId));
        setError(null);
      } catch (err) {
        setError('Failed to delete car.');
        console.error('Error deleting car:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setFormData({
      carBrand: '',
      carModel: '',
      carLicensePlate: '',
      capacity: 4,
      baseRate: 0,
      driverRate: 0,
      carImg: null
    });
    setIsEditing(false);
  };

  return (
    <div className="ml-64 bg-gray-100 min-h-screen"> {/* Added ml-64 to offset the fixed sidebar */}
      <div className="p-6"> {/* Adjusted padding to match DriverDashboard */}
        <div className="bg-blue-900 text-white rounded-lg shadow-lg mb-6 p-4">
          <h1 className="text-2xl font-bold">MegaCity Cab - Car Management</h1>
          <p className="text-blue-200 text-sm">Manage your fleet with ease</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg shadow">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={handleAddNew}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center text-sm"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Car
          </button>
        </div>
        
        {loading && !showModal && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-blue-900 border-t-transparent"></div>
            <p className="mt-1 text-blue-900 text-sm">Loading...</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-3 bg-blue-900 text-white">
            <h2 className="font-bold text-lg">Your Fleet</h2>
            <p className="text-blue-200 text-xs">{cars.length} {cars.length === 1 ? 'car' : 'cars'} in your fleet</p>
          </div>
          
          {cars.length > 0 ? (
            <div className="max-h-96 overflow-y-auto p-4">
              <div className="space-y-4">
                {cars.map(car => (
                  <div key={car.carId} className="bg-gray-50 rounded-lg shadow-sm p-3 hover:shadow-md transition duration-300 border border-gray-200">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/5 mb-2 sm:mb-0 flex items-center justify-center">
                        {car.carImgUrl ? (
                          <img 
                            src={car.carImgUrl} 
                            alt={`${car.carBrand} ${car.carModel}`}
                            className="h-20 w-auto object-contain" 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/100x80?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="sm:w-3/5 px-2">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-sm">{car.carBrand} {car.carModel}</h3>
                          <span 
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              car.available 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}
                          >
                            {car.available ? 'Available' : 'Assigned'}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mb-2">{car.carLicensePlate}</p>
                        
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-gray-600">Capacity:</span>
                            <span className="font-semibold ml-1">{car.capacity || 4} seats</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Base Rate:</span>
                            <span className="font-semibold ml-1">LKR {(car.baseRate || 0).toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Driver Rate:</span>
                            <span className="font-semibold ml-1">LKR {(car.driverRate || 0).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="sm:w-1/5 mt-2 sm:mt-0 flex sm:flex-col justify-end gap-2">
                        <button
                          onClick={() => handleEdit(car)}
                          className="flex-1 bg-blue-900 hover:bg-blue-800 text-white px-3 py-1 text-xs rounded-lg transition duration-300"
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(car.carId)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded-lg transition duration-300"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : !loading && (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <p className="text-lg text-gray-600">No cars available</p>
              <p className="text-gray-500 mb-4 text-sm">Add a new car to get started</p>
              <button 
                onClick={handleAddNew}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 text-sm"
              >
                Add Your First Car
              </button>
            </div>
          )}
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-screen overflow-auto">
            <div className="p-4 bg-blue-900 text-white rounded-t-lg">
              <h2 className="text-lg font-semibold">{isEditing ? 'Update Car' : 'Add New Car'}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Car Brand</label>
                  <input
                    type="text"
                    name="carBrand"
                    value={formData.carBrand}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    placeholder="Toyota"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Car Model</label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    placeholder="Camry"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">License Plate</label>
                  <input
                    type="text"
                    name="carLicensePlate"
                    value={formData.carLicensePlate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                    placeholder="ABC-1234"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Base Rate (LKR)</label>
                  <input
                    type="number"
                    name="baseRate"
                    value={formData.baseRate}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Driver Rate (LKR)</label>
                  <input
                    type="number"
                    name="driverRate"
                    value={formData.driverRate}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-900 focus:border-blue-900"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Car Image</label>
                  <input
                    type="file"
                    name="carImg"
                    onChange={handleInputChange}
                    className="w-full p-1 text-sm"
                    accept="image/*"
                    required={!isEditing}
                  />
                  {isEditing && currentCar?.carImgUrl && (
                    <div className="mt-1 flex items-center">
                      <div className="mr-2 bg-gray-100 p-1 rounded-lg">
                        <img 
                          src={currentCar.carImgUrl} 
                          alt={`${currentCar.carBrand} ${currentCar.carModel}`} 
                          className="h-12 w-auto object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/100x80?text=No+Image';
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">Current image will be preserved if no new image is selected</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 text-sm rounded-lg transition duration-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm rounded-lg shadow-md transition duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    isEditing ? 'Update Car' : 'Add Car'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDashboard;