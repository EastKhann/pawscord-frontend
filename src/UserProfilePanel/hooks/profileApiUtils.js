import axios from 'axios';
import { getApiBase } from '../../utils/apiEndpoints';

export const API_URL = getApiBase();

export const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
});

export const authGet = (path) => axios.get(`${API_URL}${path}`, { headers: authHeaders() });
export const authPost = (path, data = {}, opts = {}) =>
    axios.post(`${API_URL}${path}`, data, { headers: authHeaders(), ...opts });
export const authDelete = (path) => axios.delete(`${API_URL}${path}`, { headers: authHeaders() });
