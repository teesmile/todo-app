import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navbar';

const Root = () => {
  return (
    <div>
      <Navbar />
      {/* Outlet is where the child routes will render */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
