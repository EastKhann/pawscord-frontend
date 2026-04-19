/**
 * ProtectedRoute — route-level auth guard.
 *
 * Wraps any <Route> element to ensure only authenticated users can access it.
 * Unauthenticated visitors are redirected to the login / landing page.
 *
 * Usage (in main.jsx):
 *   <Route path="/settings" element={
 *     <ProtectedRoute>
 *       <SettingsPage />
 *     </ProtectedRoute>
 *   } />
 */

import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, redirectTo = '/launch' }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, token } = useAuth();
    const location = useLocation();

    if (!isAuthenticated || !token) {
        // Preserve the current path so we can redirect back after login
        return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
    }

    return children;
};

React.propTypes = {
    children: PropTypes.node,
    redirectTo: PropTypes.object,
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
    redirectTo: PropTypes.object,
};

export default React.memo(ProtectedRoute);
