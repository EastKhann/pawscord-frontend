/**
 * 🔒 Güvenli API İstek Wrapper
 * 
 * Tüm API çağrılarını CSRF token ile korur
 * XSS, injection saldırılarını önler
 */

import { csrfTokenManager } from './csrfToken';

/**
 * Güvenli fetch wrapper (CSRF token otomatik ekleme)
 * @param {string} url - API endpoint
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>}
 */
export async function fetchWithAuth(url, options = {}) {
    const csrfToken = csrfTokenManager.getToken();

    // Default headers
    const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
        ...options.headers
    };

    // Authorization token varsa ekle
    const authToken = localStorage.getItem('access_token');
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    // Merge options
    const fetchOptions = {
        ...options,
        headers,
        credentials: 'include' // Cookie gönder (CSRF için gerekli)
    };

    try {
        const response = await fetch(url, fetchOptions);

        // CSRF token refresh gerekiyorsa
        if (response.status === 403) {
            const errorData = await response.json();
            if (errorData.error === 'CSRF_TOKEN_EXPIRED') {
                // Token'ı yenile ve tekrar dene
                csrfTokenManager.generateToken();
                return fetchWithAuth(url, options);
            }
        }

        // Rate limit kontrolü
        if (response.status === 429) {
            const retryAfter = response.headers.get('Retry-After') || 60;
            throw new Error(`Rate limit aşıldı. ${retryAfter} saniye sonra tekrar deneyin.`);
        }

        return response;
    } catch (error) {
        console.error('🔒 [FetchWithAuth] Hata:', error);
        throw error;
    }
}

/**
 * GET isteği
 * @param {string} url - API endpoint
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>}
 */
export async function get(url, options = {}) {
    const response = await fetchWithAuth(url, {
        ...options,
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error(`GET hatası: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * POST isteği (CSRF protected)
 * @param {string} url - API endpoint
 * @param {any} data - Gönderilecek data
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>}
 */
export async function post(url, data, options = {}) {
    const response = await fetchWithAuth(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `POST hatası: ${response.status}`);
    }

    return response.json();
}

/**
 * PUT isteği (CSRF protected)
 * @param {string} url - API endpoint
 * @param {any} data - Güncellenecek data
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>}
 */
export async function put(url, data, options = {}) {
    const response = await fetchWithAuth(url, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`PUT hatası: ${response.status}`);
    }

    return response.json();
}

/**
 * DELETE isteği (CSRF protected)
 * @param {string} url - API endpoint
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>}
 */
export async function del(url, options = {}) {
    const response = await fetchWithAuth(url, {
        ...options,
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`DELETE hatası: ${response.status}`);
    }

    // 204 No Content response için
    if (response.status === 204) {
        return { success: true };
    }

    return response.json();
}

/**
 * PATCH isteği (CSRF protected)
 * @param {string} url - API endpoint
 * @param {any} data - Partial update data
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>}
 */
export async function patch(url, data, options = {}) {
    const response = await fetchWithAuth(url, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`PATCH hatası: ${response.status}`);
    }

    return response.json();
}

/**
 * Dosya upload (multipart/form-data)
 * @param {string} url - Upload endpoint
 * @param {FormData} formData - Form data (dosya içerir)
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>}
 */
export async function uploadFile(url, formData, options = {}) {
    const csrfToken = csrfTokenManager.getToken();

    const response = await fetch(url, {
        ...options,
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            ...options.headers
            // Content-Type: multipart/form-data otomatik set edilir
        },
        body: formData,
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error(`Upload hatası: ${response.status}`);
    }

    return response.json();
}

// Export all methods
export default {
    fetchWithAuth,
    get,
    post,
    put,
    patch,
    delete: del,
    uploadFile
};


