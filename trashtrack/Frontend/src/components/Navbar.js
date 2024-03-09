import React from 'react';
import logo from "./trashtrack.png"

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
function NavBar({ isLoggedIn }) {
  return (
    <nav className="bg-gray-800  ">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 ">
          {/* Logo and Home Link */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-lg font-bold rounded-full">
              <img src={logo} alt="Logo" width={45} style={{ borderRadius: '50%' }} />
            </Link>          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              {isLoggedIn ? (
                <>
                  <Link to="/upload" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Upload</Link>
                  {/* <Link to="/task-queue" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Task Queue</Link> */}
                  <Link to="/resources" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Resources</Link>
                  <Link to="/ec" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">GHG calculator</Link>

                  <Link to="/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>

                </>
              ) : (
                <>
                  <Link to="/resources" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Resources</Link>
                  <Link to="/about" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                  <Link to="/ec" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">GHG calculator</Link>
                  <Link to="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                  <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
