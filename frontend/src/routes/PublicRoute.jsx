import Loader from '@/components/common/Loader';
import { useAuth } from '@/context/AuthContext';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const { user, loading, initialized } = useAuth();
    
    if (!initialized || loading) {
        return <Loader />;
    }

    // Logged in - remove public page access like login/register
    if (user) {
        return <Navigate to="/" replace />;
    }

    // Not logged in - show public page
    return <Outlet/>;
};

export default PublicRoute;