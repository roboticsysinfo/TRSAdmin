// src/components/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  
  const { user, token } = useSelector((state) => state.auth);

  return user && token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
