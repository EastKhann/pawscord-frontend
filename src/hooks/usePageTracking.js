// frontend/src/hooks/usePageTracking.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Session ID oluştur (ilk ziyarette)
const getOrCreateSessionId = () => {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
};

const usePageTracking = (apiBaseUrl, fetchWithAuth) => {
    const location = useLocation();

    useEffect(() => {
        // Her route değişiminde track et
        const trackPageView = async () => {
            try {
                const sessionId = getOrCreateSessionId();

                await fetch(`${apiBaseUrl}/analytics/track/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        path: location.pathname,
                        session_id: sessionId,
                        referrer: document.referrer,
                        timestamp: new Date().toISOString()
                    })
                });

                console.log('📊 Page tracked:', location.pathname);
            } catch (error) {
                console.error('Analytics tracking error:', error);
            }
        };

        trackPageView();
    }, [location.pathname, apiBaseUrl]);
};

export default usePageTracking;



