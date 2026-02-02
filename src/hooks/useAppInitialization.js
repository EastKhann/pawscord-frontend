// frontend/src/hooks/useAppInitialization.js
// 🎯 App initialization logic - Theme, auth check, etc.

import { useEffect } from 'react';
import { loadSavedTheme } from '../utils/ThemeManager';
import logger from '../utils/logger';

export const useAppInitialization = (username) => {
    // Theme initialization
    useEffect(() => {
        logger.log('🎨 Loading saved theme...');
        loadSavedTheme();
    }, []);

    // Auth check on mount
    useEffect(() => {
        if (username) {
            logger.log('✅ User authenticated:', username);
        }
    }, [username]);

    // Window focus handler
    useEffect(() => {
        const handleFocus = () => {
            logger.log('🔍 Window focused');
        };

        const handleBlur = () => {
            logger.log('😴 Window blurred');
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    // Prevent accidental page close
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            // Only show warning if user is in a voice chat or typing
            const isInVoice = document.querySelector('[data-voice-active="true"]');
            const hasUnsavedText = document.querySelector('textarea[data-has-content="true"]');

            if (isInVoice || hasUnsavedText) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
};



