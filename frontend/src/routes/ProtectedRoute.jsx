import React from 'react'
import { useAuth } from '@/context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '@/components/common/Loader';

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading, initialized } = useAuth();
    const location = useLocation();
    // Show loading while verifying token
    if (!initialized || loading) {
        return <Loader />;
    }

    // Not authenticated - redirect to login
    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // User is authenticated and authorized
    return children;
};

export default ProtectedRoute;