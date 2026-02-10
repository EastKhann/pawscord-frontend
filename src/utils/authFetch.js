// frontend/src/utils/authFetch.js
/**
 * 🔐 Authenticated Fetch Wrapper
 * Handles token expiration and automatic refresh with retry
 */

import { jwtDecode } from 'jwt-decode';
import { API_URL_BASE_STRING } from './constants';

const API_URL_BASE = API_URL_BASE_STRING;

// Token refresh lock to prevent multiple simultaneous refreshes
let isRefreshing = false;
let refreshSubscribers = [];

// Add subscriber to wait for token refresh
const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

// Notify all subscribers when token is refreshed
const onTokenRefreshed = (newToken) => {
    refreshSubscribers.forEach(callback => callback(newToken));
    refreshSubscribers = [];
};

// Check if token is expired or about to expire
const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        // Token is "expired" if it expires in less than 30 seconds
        return decoded.exp < (currentTime + 30);
    } catch {
        return true;
    }
};

// Refresh the access token
const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem('refresh_token');
    if (!refreshTokenValue) {
        throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_URL_BASE}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshTokenValue })
    });

    if (!response.ok) {
        throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);

    if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
    }

    return data.access;
};

/**
 * Authenticated fetch wrapper
 * - Checks token before request
 * - Refreshes if expired
 * - Retries on 401
 */
export const authFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem('access_token');

    // Check if token needs refresh BEFORE making request
    if (isTokenExpired(accessToken)) {

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                accessToken = await refreshToken();
                onTokenRefreshed(accessToken);
            } catch (error) {
                console.error('❌ [AuthFetch] Token refresh failed:', error);
                isRefreshing = false;
                // Redirect to login or handle logout
                window.dispatchEvent(new CustomEvent('auth:logout'));
                throw error;
            } finally {
                isRefreshing = false;
            }
        } else {
            // Wait for the ongoing refresh
            accessToken = await new Promise((resolve) => {
                subscribeTokenRefresh((token) => resolve(token));
            });
        }
    }

    // Make the request with the valid token
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`
    };

    let response = await fetch(url, { ...options, headers });

    // If we still get 401, try one more refresh
    if (response.status === 401) {
        console.warn('⚠️ [AuthFetch] Got 401, attempting token refresh...');

        if (!isRefreshing) {
            isRefreshing = true;
            try {
                accessToken = await refreshToken();
                onTokenRefreshed(accessToken);

                // Retry the request with new token
                headers['Authorization'] = `Bearer ${accessToken}`;
                response = await fetch(url, { ...options, headers });
            } catch (error) {
                console.error('❌ [AuthFetch] Retry refresh failed:', error);
                window.dispatchEvent(new CustomEvent('auth:logout'));
                throw error;
            } finally {
                isRefreshing = false;
            }
        } else {
            // Wait for the ongoing refresh and retry
            accessToken = await new Promise((resolve) => {
                subscribeTokenRefresh((token) => resolve(token));
            });
            headers['Authorization'] = `Bearer ${accessToken}`;
            response = await fetch(url, { ...options, headers });
        }
    }

    return response;
};

/**
 * GET request with auth
 */
export const authGet = async (url, options = {}) => {
    return authFetch(url, { ...options, method: 'GET' });
};

/**
 * POST request with auth
 */
export const authPost = async (url, body, options = {}) => {
    return authFetch(url, {
        ...options,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        body: JSON.stringify(body)
    });
};

/**
 * PUT request with auth
 */
export const authPut = async (url, body, options = {}) => {
    return authFetch(url, {
        ...options,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        body: JSON.stringify(body)
    });
};

/**
 * DELETE request with auth
 */
export const authDelete = async (url, options = {}) => {
    return authFetch(url, { ...options, method: 'DELETE' });
};

export default authFetch;
