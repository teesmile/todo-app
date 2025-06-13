import React from 'react';
import { Link } from '@tanstack/react-router';

const NotFound = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">404 - Not Found</h1>
      <p>We can't find the page you're looking for.</p>
      <Link to="/" className="mt-4 inline-block text-blue-500 underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
