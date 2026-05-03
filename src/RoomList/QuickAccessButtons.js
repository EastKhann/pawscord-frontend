// frontend/src/RoomList/QuickAccessButtons.js
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --
const _st1 = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginBottom: '10px',
    padding: '5px',
    backgroundColor: '#0b0e1b',
    borderRadius: '8px',
};

const buttonDefs = [
    {
        key: 'payment',
        gradient: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
        emoji: '💳',
    },
    {
        key: 'store',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        emoji: '🛒',
    },
    {
        key: 'daily',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        emoji: '🎁',
    },
    {
        key: 'api',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        emoji: '⚡',
    },
    {
        key: 'export',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        emoji: '📤',
    },
    {
        key: 'announce',
        gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        emoji: '📢',
    },
    {
        key: 'games',
        gradient: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
        emoji: '🎮',
    },
    {
        key: 'projects',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        emoji: '🚀',
    },
    {
        key: 'avatar',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        emoji: '🎨',
    },
];

const btnStyle = (gradient) => ({
    minWidth: '36px',
    width: '36px',
    height: '36px',
    padding: '0',
    background: gradient,
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
});

const hoverIn = (e) => {
    e.target.style.transform = 'scale(1.1)';
};
const hoverOut = (e) => {
    e.target.style.transform = 'scale(1)';
};

const QuickAccessButtons = ({ handlers }) => {
    const { t } = useTranslation();
    const handlerMap = {
        payment: handlers.onOpenPaymentPanel,
        store: handlers.onOpenStoreModal,
        daily: handlers.onOpenDailyRewards,
        api: handlers.onOpenAPIUsage,
        export: handlers.onOpenExportJobs,
        announce: handlers.onOpenScheduledAnnouncements,
        games: handlers.onOpenMiniGames,
        projects: handlers.onOpenProjectCollaboration,
        avatar: handlers.onOpenAvatarStudio,
    };

    return (
        <div style={_st1}>
            {buttonDefs.map((btn) => {
                const handler = handlerMap[btn.key];
                if (!handler) return null;
                return (
                    <button
                        key={btn.key}
                        onClick={handler}
                        style={btnStyle(btn.gradient)}
                        title={t(`chat.quickAccessButtons.${btn.key}`, btn.emoji)}
                        aria-label={t(`chat.quickAccessButtons.${btn.key}`, btn.emoji)}
                        onMouseEnter={hoverIn}
                        onMouseLeave={hoverOut}
                    >
                        {btn.emoji}
                    </button>
                );
            })}
        </div>
    );
};

QuickAccessButtons.propTypes = {
    handlers: PropTypes.func,
};
export default React.memo(QuickAccessButtons);
