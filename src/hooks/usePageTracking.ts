// frontend/src/hooks/usePageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../utils/apiEndpoints';

// Session ID oluştur (ilk ziyarette)
const getOrCreateSessionId = (): string => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
};

const usePageTracking = (): void => {
    const location = useLocation();

    useEffect(() => {
        // Her route değişiminde track et
        const trackPageView = async () => {
            try {
                const sessionId = getOrCreateSessionId();
                const token = localStorage.getItem('access_token');

                const headers: Record<string, string> = {
                    'Content-Type': 'application/json',
                };
                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                await fetch(`${API_BASE_URL}/analytics/track/`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        path: location.pathname,
                        session_id: sessionId,
                        referrer: document.referrer,
                        timestamp: new Date().toISOString()
                    })
                });

            } catch (error) {
                // Silently fail — analytics should never break the app
            }
        };

        trackPageView();
    }, [location.pathname]);
};

export default usePageTracking;



