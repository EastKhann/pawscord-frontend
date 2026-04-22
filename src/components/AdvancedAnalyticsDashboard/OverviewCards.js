import { useTranslation } from 'react-i18next';
import { FaUsers, FaEye, FaComments, FaClock } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { formatNumber, getGrowthIndicator } from './useAdvancedAnalytics';

const CARDS = [
    { key: 'total_members', icon: FaUsers, label: t('analytics.totalMembers', 'Total Members'), cls: 'members', growth: 'member' },
    { key: 'active_members', icon: FaEye, label: t('analytics.activeMembers', 'Active Members'), cls: 'active' },
    {
        key: 'messages_count',
        icon: FaComments,
        label: 'Mesajlar',
        cls: 'messages',
        growth: 'message',
    },
    { key: 'voice_minutes', icon: FaClock, label: 'Sesli Dakika', cls: 'voice' },
];

const OverviewCards = ({ overview }) => {
    const memberGrowth = getGrowthIndicator(overview.member_growth);
    const messageGrowth = getGrowthIndicator(overview.message_growth);
    const growths = { member: memberGrowth, message: messageGrowth };

    return (
        <div aria-label={t('analytics.overviewCards', 'Overview cards')} className="overview-section">
            {CARDS.map((card) => {
                const g = card.growth ? growths[card.growth] : null;
                const growthStyle = g ? { color: g.color } : null;
                return (
                    <div key={card.key} className="overview-card">
                        <div className={`card-icon ${card.cls}`}>
                            <card.icon />
                        </div>
                        <div className="card-content">
                            <span className="card-value">{formatNumber(overview[card.key])}</span>
                            <span className="card-label">{card.label}</span>
                            {g ? (
                                <span className="card-growth" style={growthStyle}>
                                    <g.icon /> {g.text}
                                </span>
                            ) : card.key === 'active_members' ? (
                                <span className="card-detail">
                                    {(
                                        (overview.active_members / overview.total_members) * 100 ||
                                        0
                                    ).toFixed(1)}
                                    % aktiflik
                                </span>
                            ) : (
                                <span className="card-detail">
                                    {Math.round(overview.voice_minutes / 60)} hour
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

OverviewCards.propTypes = {
    overview: PropTypes.object,
};
export default OverviewCards;
