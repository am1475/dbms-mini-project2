import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Delete = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent form default behavior

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
    <div className="flex h-screen">
      {/* Left Half - Image */}
      <div className="flex-1 bg-gray-300 flex items-center justify-center">
        <img src="https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728589041/thumbnail-what-is-a-relational-database-1024x585_pirdey.webp" alt="Delete" className="w-full h-full object-cover" />
      </div>

      {/* Right Half - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <form className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">Delete Account</h2>

          {error && (
            <div className="mb-4 text-red-500">
              {error}
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email to confirm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 w-full rounded"
              required
            />
          </div>

          <button 
            type="button" // Change button type to "button" to avoid form submission behavior
            onClick={handleDelete} // Attach handleDelete to onClick
            className="bg-red-500 text-white p-3 rounded w-full hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Delete;
