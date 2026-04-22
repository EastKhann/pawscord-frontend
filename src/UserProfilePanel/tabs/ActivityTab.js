import { useTranslation } from 'react-i18next';
import React from 'react';
import PropTypes from 'prop-types';
import profileStyles from '../styles';

// -- extracted inline style constants --
const _st1 = {
    padding: '48px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
};
const _st2 = { fontSize: '64px', marginBottom: '16px' };
const _st3 = { color: '#fff', margin: '0 0 8px 0' };
const _st4 = { color: '#b5bac1', margin: 0 };
const _st5 = { display: 'flex', flexDirection: 'column', gap: '12px' };
const _st6 = {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    borderLeft: '4px solid #5865f2',
};
const _st7 = { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' };
const _st8 = { color: '#b5bac1', fontSize: '12px' };
const _st9 = { color: '#b5bac1', margin: 0, fontSize: '13px' };

const ActivityTab = ({ userActivity: rawUA }) => {
  const { t } = useTranslation();
    const userActivity = rawUA || [];
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div aria-label={t('aria.activityTab', 'Activity')} style={styles.card}>
            <h3 style={styles.sectionTitle}>📊 User Aktivitesi</h3>

            {userActivity.length === 0 ? (
                <div style={_st1}>
                    <div style={_st2}>📊</div>
                    <h4 style={_st3}>{t('activityTab.noActivity','No activity yet')}</h4>
                    <p style={_st4}>Your activities will appear here</p>
                </div>
            ) : (
                <div style={_st5}>
                    {userActivity.map((activity, idx) => (
                        <div key={`item-${idx}`} style={_st6}>
                            <div style={_st7}>
                                <h4 style={styles.settingRowTitle}>
                                    {activity.type === 'message' && ('💬 ' + t('activityTab.messageSent','Message sent'))}
                                    {activity.type === 'join' && ('👋 ' + t('activityTab.joined','Joined the server'))}
                                    {activity.type === 'voice' && ('🎤 ' + t('activityTab.voiceJoined','Joined voice chat'))}
                                    {activity.type === 'game' && ('🎮 ' + t('activityTab.gameStarted','Started a game'))}
                                </h4>
                                <span style={_st8}>
                                    {new Date(activity.timestamp).toLocaleString('tr-TR')}
                                </span>
                            </div>
                            {activity.description && <p style={_st9}>{activity.description}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

ActivityTab.propTypes = {
    userActivity: PropTypes.object,
};
export default ActivityTab;
