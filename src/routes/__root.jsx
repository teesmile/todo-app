import React from 'react';
import { Outlet , createRootRoute} from '@tanstack/react-router';
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
// export const Route = createRootRoute({
//   component: () => (
//     <div className="app">
//       <Navbar />
//       <Outlet />
//     </div>
//   )
// });
