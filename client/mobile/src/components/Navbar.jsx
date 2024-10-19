import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen); // Toggle menu state
  };

  const handleCloseMenu = () => {
    setIsOpen(false); // Close the menu when an item is clicked
  };

  return (
    <nav className="flex justify-between p-4 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg">
      <h1 className="text-4xl md:text-5xl text-white font-bold drop-shadow-lg">
        Flash Charge
      </h1>

      <div className="flex">
        {/* Menu Button - Shown only on mobile devices */}
        <button
          className="text-2xl md:hidden text-white font-semibold shadow-md"
          onClick={handleClick}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        {/* Links - Responsive, show horizontally on larger screens */}
        <div
          className={`flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 ${
            isOpen ? 'block' : 'hidden md:flex'
          }`}
        >
          <Link
            to="/" // Change to appropriate route
            onClick={handleCloseMenu} // Close menu when clicked
            className="text-xl md:text-2xl text-white py-2 transition hover:text-yellow-300 drop-shadow-lg"
          >
            Home
          </Link>
         
          
          <Link
            to="/login" // Change to appropriate route
            onClick={handleCloseMenu} // Close menu when clicked
            className="text-xl md:text-2xl text-white py-2 transition hover:text-yellow-300 drop-shadow-lg"
          >
            Login
          </Link>
          <Link
            to="/signup" // Change to appropriate route
            onClick={handleCloseMenu} // Close menu when clicked
            className="text-xl md:text-2xl text-white py-2 transition hover:text-yellow-300 drop-shadow-lg"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
