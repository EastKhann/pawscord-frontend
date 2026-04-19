/**
 * tokenStorage.js — Centralized access token management.
 *
 * All code must read/write the access token through these functions.
 * This makes it trivial to swap localStorage for an in-memory store
 * (or a more secure mechanism) in a single place.
 *
 * DO NOT call localStorage.getItem('access_token') anywhere else.
 */

const TOKEN_KEY = 'access_token';

/** Read the current access token (or null if not present). */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/** Persist a new access token. */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

/** Remove the access token (called on logout). */
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/** Return standard Authorization headers for fetch calls. */
export const getAuthHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};
