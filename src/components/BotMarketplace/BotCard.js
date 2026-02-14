import React from 'react';

const BotCard = ({ bot, onClick }) => (
    <div className="bot-card" onClick={() => onClick(bot)}>
        <div className="bot-avatar">
            <img src={bot.avatar || '/default-bot.png'} alt={bot.name} />
            {bot.is_verified && <span className="verified-badge">{'✓'}</span>}
        </div>
        <div className="bot-info">
            <h3 className="bot-name">
                {bot.name}
                {bot.is_featured && <span className="featured-tag">{'⭐'} {'Ö'}ne {'Çı'}kan</span>}
            </h3>
            <p className="bot-description">{bot.short_description}</p>
            <div className="bot-meta">
                <span className="bot-installs">
                    <i>{'📥'}</i> {bot.install_count?.toLocaleString() || 0}
                </span>
                <span className="bot-rating">
                    <i>{'⭐'}</i> {bot.avg_rating || 0}
                </span>
                {bot.category && (
                    <span className="bot-category">{bot.category}</span>
                )}
            </div>
            {bot.tags && bot.tags.length > 0 && (
                <div className="bot-tags">
                    {bot.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default BotCard;
