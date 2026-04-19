import { authFetchJson } from '../../utils/authFetch';
import { getToken } from '../../utils/tokenStorage';
import { getApiBase } from '../../utils/apiEndpoints';

export const API_URL = getApiBase();

export const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
});

export const authGet = (path) => authFetchJson(`${API_URL}${path}`);
export const authPost = (path, data = {}, opts = {}) => {
    const isFormData = data instanceof FormData;
    return authFetchJson(`${API_URL}${path}`, {
        method: 'POST',
        headers: isFormData
            ? opts.headers
            : { 'Content-Type': 'application/json', ...opts.headers },
        body: isFormData ? data : JSON.stringify(data),
    });
};
export const authDelete = (path) => authFetchJson(`${API_URL}${path}`, { method: 'DELETE' });
