import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        alert('Login successful!');
        navigate('/landing'); // Redirect to LandingPage
      }
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728807699/2021-10-feature-wallet_rdg0e3.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Login</h1>

      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
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

        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>

      {/* Navigation Buttons for Update and Delete */}
      <div className="mt-6">
        <button
          onClick={() => navigate('/update')}
          className="w-full bg-green-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-green-700 transition-colors mb-2"
        >
          Update Details
        </button>

        <button
          onClick={() => navigate('/delete')}
          className="w-full bg-red-500 text-white text-lg font-bold py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Login;
