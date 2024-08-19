import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-gray-900 shadow-lg w-full fixed top-0 z-50 transition-all duration-500 ease-in-out`}>
      <div className={`max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 ${scrollDirection === "down" ? 'lg:py-3 py-2' : 'py-2'}`}>
        <div className={`flex justify-between items-center transition-all duration-500 ease-in-out ${scrollDirection === "down" ? 'lg:text-lg text-sm' : 'text-sm'}`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Laptop World" className="h-6 w-auto mr-2" />
              <span className="hidden sm:inline text-white font-semibold">LaptopWorld</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-2">
            <input
              type="text"
              placeholder="Search laptops..."
              className={`w-full px-2 py-1 text-white border-none rounded-lg bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out ${scrollDirection === "down" ? 'lg:text-base text-sm' : 'text-sm'}`}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <Link to="/account" className={`text-white hover:text-indigo-500 transition duration-300 ease-in-out ${scrollDirection === "down" ? 'lg:text-base text-sm' : 'text-sm'}`}>My Account</Link>
            <Link to="/cart" className={`text-white hover:text-indigo-500 transition duration-300 ease-in-out ${scrollDirection === "down" ? 'lg:text-base text-sm' : 'text-sm'}`}>My Cart</Link>
            <Link to="/adminmain" className={`text-white hover:text-indigo-500 transition duration-300 ease-in-out ${scrollDirection === "down" ? 'lg:text-base text-sm' : 'text-sm'}`}>Admin</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-indigo-500 focus:outline-none transition duration-300 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block overflow-hidden transition-all duration-500 ease-in-out ${scrollDirection === "down" ? 'md:max-h-0 md:opacity-0' : 'md:max-h-40 md:opacity-100'}`}>
        <div className="flex flex-col md:flex-row justify-evenly px-2 py-0 bg-gray-800">
          <Link to="/notebook" className="text-white hover:text-indigo-500 text-sm py-1 transition duration-300 ease-in-out">NOTEBOOK</Link>
          <Link to="/ultrabook" className="text-white hover:text-indigo-500 text-sm py-1 transition duration-300 ease-in-out">ULTRABOOK</Link>
          <Link to="/macbook" className="text-white hover:text-indigo-500 text-sm py-1 transition duration-300 ease-in-out">MACBOOK</Link>
          <Link to="/gaming-laptops" className="text-white hover:text-indigo-500 text-sm py-1 transition duration-300 ease-in-out">GAMING LAPTOPS</Link>
          <Link to="/topselling" className="text-white hover:text-indigo-500 text-sm py-1 transition duration-300 ease-in-out">TOP SELLING</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
