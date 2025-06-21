 import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component acts as a gatekeeper for routes that require authentication.
const PrivateRoute = () => {
    // 1. Get the current user and the initial loading state from our AuthContext.
    const { user, loading } = useAuth();

    // 2. Show a loading indicator while the app is checking for a user session.
    // This is crucial to prevent a "flash" of the login page for already-logged-in users on a page refresh.
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