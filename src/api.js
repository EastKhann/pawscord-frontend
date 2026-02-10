// frontend/src/api.js
// 🔐 Simple API wrapper for AuthCallback
// Uses axios-like interface for compatibility

import { authFetch } from './utils/authFetch';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.pawscord.com';

const api = {
    async post(url, data, config = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...config.headers
        };


        try {
            // 🔥 authFetch ile otomatik token refresh
            const response = await authFetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
                credentials: 'include'
            });

            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.error || 'Request failed');
                error.response = { data: responseData, status: response.status };
                throw error;
            }

            return { data: responseData, status: response.status };
        } catch (error) {
            // Fallback for non-auth requests
            if (error.message === 'No refresh token available') {
                const response = await fetch(url, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
                const responseData = await response.json();
                if (!response.ok) {
                    const err = new Error(responseData.error || 'Request failed');
                    err.response = { data: responseData, status: response.status };
                    throw err;
                }
                return { data: responseData, status: response.status };
            }
            throw error;
        }
    },

    async get(url, config = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...config.headers
        };


        try {
            // 🔥 authFetch ile otomatik token refresh
            const response = await authFetch(url, {
                method: 'GET',
                headers,
                credentials: 'include'
            });

            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.error || 'Request failed');
                error.response = { data: responseData, status: response.status };
                throw error;
            }

            return { data: responseData, status: response.status };
        } catch (error) {
            // Fallback for non-auth requests
            if (error.message === 'No refresh token available') {
                const response = await fetch(url, {
                    method: 'GET',
                    headers,
                    credentials: 'include'
                });
                const responseData = await response.json();
                if (!response.ok) {
                    const err = new Error(responseData.error || 'Request failed');
                    err.response = { data: responseData, status: response.status };
                    throw err;
                }
                return { data: responseData, status: response.status };
            }
            throw error;
        }
    }
};

export default api;
