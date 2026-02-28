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

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/launch' }) => {
    const { isAuthenticated, token } = useAuth();
    const location = useLocation();

    if (!isAuthenticated || !token) {
        // Preserve the current path so we can redirect back after login
        return (
            <Navigate
                to={redirectTo}
                state={{ from: location.pathname }}
                replace
            />
        );
    }

    return children;
};

export default React.memo(ProtectedRoute);
