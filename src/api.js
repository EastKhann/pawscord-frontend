// frontend/src/api.js
// 🔐 Simple API wrapper for AuthCallback
// Uses axios-like interface for compatibility

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.pawscord.com';

const api = {
    async post(url, data, config = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...config.headers
        };

        // Add auth token if exists
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        console.log('📡 [API] POST request:', url);

        const response = await fetch(url, {
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
    },

    async get(url, config = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...config.headers
        };

        const token = localStorage.getItem('accessToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        console.log('📡 [API] GET request:', url);

        const response = await fetch(url, {
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
    }
};

export default api;
