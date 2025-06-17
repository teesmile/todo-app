import React from 'react';
import { Outlet , createRootRoute} from '@tanstack/react-router';
import Navbar from '../components/Navbar';
import NotFound from './not-found';


const Root = () => {
  return (
    <div>
      <Navbar />
            <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

