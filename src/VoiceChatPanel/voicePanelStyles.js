// frontend/src/VoiceChatPanel/voicePanelStyles.js
// 🎨 Voice Panel CSS Injection - Fullscreen, badge, talking animations
// Auto-injects on import (same pattern as RoomList/animations.js)

export function injectVoicePanelStyles() {
    if (typeof document === 'undefined') return;

    if (document.head.querySelector('style#voice-fullscreen-styles')) return;

    const style = document.createElement('style');
    style.id = 'voice-fullscreen-styles';
    style.textContent = `
            /* Tam Ekran Video Stilleri */
            div:fullscreen video,
            div:-webkit-full-screen video,
            div:-moz-full-screen video,
            div:-ms-fullscreen video {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                background: #000 !important;
            }

            /* Tam Ekran Container */
            div:fullscreen,
            div:-webkit-full-screen,
            div:-moz-full-screen,
            div:-ms-fullscreen {
                background: #000 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            /* Tam Ekran Kontrolleri */
            div:fullscreen .hover-actions,
            div:-webkit-full-screen .hover-actions,
            div:-moz-full-screen .hover-actions,
            div:-ms-fullscreen .hover-actions {
                opacity: 1 !important;
                z-index: 9999 !important;
            }

            /* 🔥 YENİ: Badge Animasyonları */
            @keyframes badgePulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(88, 101, 242, 0.9), 0 0 0 3px rgba(255, 255, 255, 0.4);
                }
            }

            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.7;
                    transform: scale(1.2);
                }
            }

            /* 🔥 YENİ: Talking Indicator Wave Animations */
            @keyframes wave1 {
                0%, 100% { height: 12px; }
                50% { height: 20px; }
            }
            @keyframes wave2 {
                0%, 100% { height: 16px; }
                50% { height: 24px; }
            }
            @keyframes wave3 {
                0%, 100% { height: 12px; }
                50% { height: 20px; }
            }

            /* 🔥 YENİ: Avatar Talking Pulse Animation */
            @keyframes talkingPulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.7);
                    transform: scale(1);
                }
                50% {
                    box-shadow: 0 0 0 15px rgba(67, 181, 129, 0);
                    transform: scale(1.02);
                }
            }

            @keyframes slideIn {
                from { opacity: 0; transform: translateY(10px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes connectionGlow {
                0%, 100% { box-shadow: 0 0 12px rgba(67, 181, 129, 0.3); }
                50% { box-shadow: 0 0 20px rgba(67, 181, 129, 0.6); }
            }
            @keyframes screenShareGlow {
                0%, 100% { border-color: rgba(88, 101, 242, 0.5); }
                50% { border-color: rgba(88, 101, 242, 0.9); }
            }

            /* Smooth grid transitions */
            .voice-grid-item {
                animation: slideIn 0.3s ease forwards;
            }
            /* Video card hover effects */
            .voice-video-card:hover {
                transform: scale(1.01);
                z-index: 10;
            }
            /* Active speaker highlight */
            .voice-active-speaker {
                animation: connectionGlow 2s ease-in-out infinite;
            }
            /* Screen share border animation */
            .voice-screen-share {
                animation: screenShareGlow 2s ease-in-out infinite;
            }
    `;
    document.head.appendChild(style);
}

export function removeVoicePanelStyles() {
    const existingStyle = document.getElementById('voice-fullscreen-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
}

// Auto-execute on import
injectVoicePanelStyles();
