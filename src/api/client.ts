/**
 * Type-safe API client generated from the OpenAPI schema.
 *
 * Generate / refresh the schema types:
 *   npm run api:generate
 *
 * This module re-exports createClient from openapi-fetch wired to the
 * backend base URL, so every API call is validated against the schema at
 * compile time with zero runtime overhead.
 */
import createClient from 'openapi-fetch';
import type { paths } from './schema.d';

const BASE_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_API_BASE_URL ?? '/api';

export const apiClient = createClient<paths>({ baseUrl: BASE_URL });

// Inject access token on every request
apiClient.use({
    onRequest({ request }) {
        const token = localStorage.getItem('access_token');
        if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
        }
        return request;
    },
});
