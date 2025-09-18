import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-50 p-6 mt-10 max-w-xl mx-auto" role="navigation" aria-label="Main Navigation">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
