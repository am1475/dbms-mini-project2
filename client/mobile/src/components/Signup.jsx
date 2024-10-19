import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    flatNo: '',
    apartmentName: '',
    area: '',
    pincode: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      console.log(response.data);
      // Handle success (e.g., show a success message or redirect)
      if (response.status === 201) {
        navigate('/login'); // Navigate to Landing page
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Half - Image */}
      <div className="flex-1 bg-gray-300 flex items-center justify-center">
        <img src="https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728589041/thumbnail-what-is-a-relational-database-1024x585_pirdey.webp" alt="Signup" className="w-full h-full object-cover" />
      </div>

      {/* Right Half - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="flatNo"
              placeholder="Flat No"
              value={formData.flatNo}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="apartmentName"
              placeholder="Apartment Name"
              value={formData.apartmentName}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={formData.area}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
