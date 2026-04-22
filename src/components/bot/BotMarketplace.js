import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BotCard from '../BotMarketplace/BotCard';
import BotDetailModal from '../BotMarketplace/BotDetailModal';
import useBotMarketplace from '../BotMarketplace/useBotMarketplace';
import './BotMarketplace.css';

const BotMarketplace = ({ onClose }) => {
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
        bots,
        featuredBots,
        trendingBots,
        categories,
        loading,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        selectedBot,
        setSelectedBot,
        page,
        setPage,
        totalPages,
        loadBotDetail,
    } = useBotMarketplace();

    if (loading) {
        return (
            <div className="bot-marketplace">
                <div className="marketplace-loading">
                    <div className="loading-spinner" />
                    <p>{t('botMarket.loading', 'Loading Bot Marketplace...')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bot-marketplace">
            <div className="marketplace-header">
                <div className="header-content">
                    <h1>🤖 Bot Marketplace</h1>
                    <p>{t('botMarket.subtitle', 'Discover thousands of bots to enhance your server')}</p>
                </div>
                {onClose && (
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                )}
            </div>

            <div className="marketplace-filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder={t('botMarket.searchPlaceholder', 'Search bots...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label={t('common.search', 'Search')}
                    />
                    <span className="search-icon">🔍</span>
                </div>
                <div className="filter-group">
                    <select
                        value={selectedCategory || ''}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}
                    >
                        <option value="">{t('botMarket.allCategories', 'All Categories')}</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                                {cat.icon} {cat.name} ({cat.bot_count})
                            </option>
                        ))}
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popular">{t('botMarket.popular', 'Popular')}</option>
                        <option value="new">Yeni</option>
                        <option value="rated">{t('botMarket.topRated', 'Top Rated')}</option>
                    </select>
                </div>
            </div>

            <div className="marketplace-content">
                {featuredBots.length > 0 && !searchQuery && !selectedCategory && (
                    <section className="featured-section">
                        <h2>⭐ {t('botMarket.featured', 'Featured Bots')}</h2>
                        <div className="featured-grid">
                            {featuredBots.map((bot) => (
                                <BotCard key={bot.id} bot={bot} onClick={loadBotDetail} />
                            ))}
                        </div>
                    </section>
                )}

                {trendingBots.length > 0 && !searchQuery && !selectedCategory && (
                    <section className="trending-section">
                        <h2>📈 {t('botMarket.trending', 'Trending Bots')}</h2>
                        <div className="trending-grid">
                            {trendingBots.map((bot) => (
                                <BotCard key={bot.id} bot={bot} onClick={loadBotDetail} />
                            ))}
                        </div>
                    </section>
                )}

                <section className="all-bots-section">
                    <h2>
                        {selectedCategory
                            ? categories.find((c) => c.slug === selectedCategory)?.name || 'Botlar'
                            : searchQuery
                                ? `"${searchQuery}" for resultlar`
                                : t('ui.tum_botlar')}
                    </h2>
                    {bots.length === 0 ? (
                        <div className="no-results">
                            <p>{t('botMarket.notFound', 'No bots found')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="bots-grid">
                                {bots.map((bot) => (
                                    <BotCard key={bot.id} bot={bot} onClick={loadBotDetail} />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        aria-label={t('common.previous', '← Previous')}
                                        disabled={page <= 1}
                                        onClick={() => setPage((p) => p - 1)}
                                    >
                                        ← {t('common.previous', 'Previous')}
                                    </button>
                                    <span>
                                        Sayfa {page} / {totalPages}
                                    </span>
                                    <button
                                        aria-label={t('botMarketplace.nextPage', 'Next page')}
                                        disabled={page >= totalPages}
                                        onClick={() => setPage((p) => p + 1)}
                                    >
                                        Sonraki →
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>

            {selectedBot && (
                <BotDetailModal bot={selectedBot} onClose={() => setSelectedBot(null)} />
            )}
        </div>
    );
};

BotMarketplace.propTypes = {
    onClose: PropTypes.func,
};
export default BotMarketplace;
