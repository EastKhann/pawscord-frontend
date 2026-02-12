// ⚡ ADVANCED SECURITY MIDDLEWARE
// Adds comprehensive security headers and CSRF protection

export const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' wss: https:; object-src 'none'; base-uri 'self'; worker-src 'self' blob:;",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(self), camera=(self)'
};

export const applySecurityHeaders = (headers = {}) => {
    return { ...headers, ...securityHeaders };
};

export const validateCSRF = (token) => {
    const storedToken = sessionStorage.getItem('csrf_token');
    return token === storedToken;
};

export const generateCSRFToken = () => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    sessionStorage.setItem('csrf_token', token);
    return token;
};


