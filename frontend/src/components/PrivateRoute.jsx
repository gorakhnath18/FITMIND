import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Get user info from the global Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // If userInfo exists (meaning user is logged in), render the child route using <Outlet />.
  // Otherwise, redirect the user to the /login page.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;