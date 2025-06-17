import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
  return (
    <nav className="bg-gray-50 p-6 mt-10 max-w-xl mx-auto" role="navigation" aria-label="Main Navigation">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
