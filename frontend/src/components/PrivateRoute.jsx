 import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

 const PrivateRoute = () => {
     const { user, loading } = useAuth();

     if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin h-10 w-10 border-4 border-accent-cyan border-t-transparent rounded-full"></div>
            </div>
        );
    }

     
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;