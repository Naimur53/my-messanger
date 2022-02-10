import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Shared/hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    let location = useLocation();
    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
            <CircularProgress />
        </div>
    }
    if (!user.email) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return (
        <>
            {children}
        </>
    );
};

export default PrivateRoute;