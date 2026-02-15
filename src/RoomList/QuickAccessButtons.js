// frontend/src/RoomList/QuickAccessButtons.js
import React from 'react';

const buttonDefs = [
    { key: 'payment', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '💰', title: '💰 Payment Panel' },
    { key: 'store', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '🛒', title: '🛒 Store' },
    { key: 'daily', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', emoji: '🎁', title: '🎁 Daily Rewards' },
    { key: 'api', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', emoji: '📊', title: '📊 API Usage' },
    { key: 'export', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', emoji: '📥', title: '📥 Export Jobs' },
    { key: 'announce', gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', emoji: '📢', title: '📢 Scheduled Announcements' },
    { key: 'games', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🎮', title: '🎮 Mini Games' },
    { key: 'projects', gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', emoji: '📂', title: '📂 Projects' },
    { key: 'avatar', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '🎨', title: '🎨 Avatar Studio' },
];

const btnStyle = (gradient) => ({
    minWidth: '36px', width: '36px', height: '36px', padding: '0',
    background: gradient, border: 'none', borderRadius: '8px',
    fontSize: '18px', cursor: 'pointer', transition: 'all 0.2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
});

const hoverIn = (e) => { e.target.style.transform = 'scale(1.1)'; };
const hoverOut = (e) => { e.target.style.transform = 'scale(1)'; };

const QuickAccessButtons = ({ handlers }) => {
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
        <div style={{
            display: 'flex', gap: '5px', marginBottom: '10px', padding: '5px',
            backgroundColor: '#1e1f22', borderRadius: '8px', overflowX: 'auto', scrollbarWidth: 'thin'
        }}>
            {buttonDefs.map(btn => {
                const handler = handlerMap[btn.key];
                if (!handler) return null;
                return (
                    <button key={btn.key} onClick={handler} style={btnStyle(btn.gradient)}
                        title={btn.title} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                        {btn.emoji}
                    </button>
                );
            })}
        </div>
    );
};

export default React.memo(QuickAccessButtons);
