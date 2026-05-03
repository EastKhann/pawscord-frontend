// 🎨 CSS Animations and Hover Effects
export function injectRoomListAnimations() {
    if (typeof document === 'undefined' || !document.head) return;

    if (document.head.querySelector('style[data-roomlist-animations]')) return;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Channel Hover Efektleri */
        .channel-item {
            position: relative;
            overflow: hidden;
        }
        
        .channel-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 50%;
            background: linear-gradient(90deg, rgba(88, 101, 242, 0.4), transparent);
            transition: width 0.3s ease;
            border-radius: 0 4px 4px 0;
        }
        
        .channel-item:hover::before {
            width: 4px;
        }
        
        .channel-item:hover {
            background: rgba(255, 255, 255, 0.05) !important;
            color: #fff !important;
            transform: translateX(2px);
        }
        
        .channel-item.active {
            background: rgba(88, 101, 242, 0.15) !important;
            box-shadow: 0 2px 8px rgba(88, 101, 242, 0.2);
        }
        
        /* Voice Channel Special Animations */
        .voice-channel.active {
            background: linear-gradient(90deg, rgba(67, 181, 129, 0.15), rgba(88, 101, 242, 0.1)) !important;
        }
        
        .voice-channel:hover {
            background: rgba(67, 181, 129, 0.08) !important;
        }
        
        /* User List Fade-in Animasyonu */
        .channel-wrapper {
            animation: channelFadeIn 0.3s ease;
        }
        
        @keyframes channelFadeIn {
            from {
                opacity: 0;
                transform: translateY(-5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Channel Icon Pulse Animation (for active voice channel) */
        
    /* 💝 Developer Support Heart Animation */
    @keyframes heartPulse {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.15); }
        50% { transform: scale(1); }
        75% { transform: scale(1.1); }
    }
    
    .voice-channel.active svg {
            animation: iconPulse 2s infinite;
        }
        
        @keyframes iconPulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.8;
            }
        }
        
        /* User Count Badge Pulse */
        .voice-channel.active > div > div:last-child {
            animation: badgePulse 1.5s infinite;
        }
        
        @keyframes badgePulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.4);
            }
            50% {
                box-shadow: 0 0 0 4px rgba(67, 181, 129, 0);
            }
        }

        /* Context Menu Slide Animation */
        @keyframes contextMenuSlide {
            from {
                opacity: 0;
                transform: translateY(-8px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* Drop indicator pulse for server reorder */
        @keyframes pulseDrop {
            from { opacity: 0.6; transform: scaleX(0.85); }
            to   { opacity: 1;   transform: scaleX(1); }
        }
    `;

    styleSheet.setAttribute('data-roomlist-animations', 'true');
    document.head.appendChild(styleSheet);
}
