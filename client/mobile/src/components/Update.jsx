import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const [email, setEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [apartmentName, setApartmentName] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${email}`, {
        name: newName,
        flat_no: flatNo,
        apartment_name: apartmentName,
        area,
        pincode,
      });

      if (response.status === 200) {
        alert('User details updated successfully!');
        navigate('/landing'); // Redirect to landing or another page
      }
    } catch (err) {
      setError('Error updating user details.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/users/${email}`);
        
        if (response.status === 200) {
          alert('User deleted successfully!');
          navigate('/'); // Redirect to home or login page
        }
      } catch (err) {
        setError('Error deleting user.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Update Your Details</h1>

      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleUpdate} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="newName">
            Name
          </label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="flatNo">
            Flat No
          </label>
          <input
            type="text"
            id="flatNo"
            value={flatNo}
            onChange={(e) => setFlatNo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="apartmentName">
            Apartment Name
          </label>
          <input
            type="text"
            id="apartmentName"
            value={apartmentName}
            onChange={(e) => setApartmentName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="area">
            Area
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="pincode">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Update Details
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="mt-6 w-full bg-red-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        Delete Account
      </button>
    </div>
  );
};

export default Update;
