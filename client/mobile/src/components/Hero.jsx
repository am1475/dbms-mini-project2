import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Hero = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Half - Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 drop-shadow-lg">
            Easy and Fast Mobile Recharge
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Recharge your phone instantly, with the most reliable and secure service.
          </p>
          <Link to="/signup"> {/* Link to /signup */}
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg md:text-xl font-semibold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right Half - Image (Smaller size) */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://res.cloudinary.com/dqm8rxpzq/image/upload/v1728746382/oE5crasnRNaQa5TCOQ_7zCcVEz6ecvvALm3U9Nxybyxv49kXR-gIQklgg0UivbSK4P2J_mbds6c.png"
            alt="Mobile Recharge"
            className="w-3/4 md:w-1/2 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
