import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
};
const _st7 = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const _st8 = { color: '#fff', margin: 0, fontSize: '14px', fontWeight: '600' };
const _st9 = { color: '#b5bac1', margin: '4px 0 0 0', fontSize: '12px' };
const _st10 = { color: '#b5bac1', fontSize: '12px' };

const NicknameHistoryTab = ({ nicknameHistory: rawNH }) => {
    const { t } = useTranslation();
    const nicknameHistory = rawNH || [];
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div aria-label={t('aria.nicknameHistoryTab', 'Name History')} style={styles.card}>
            <h3 style={styles.sectionTitle}>📜 Name Change History</h3>

            {nicknameHistory.length === 0 ? (
                <div style={_st1}>
                    <div style={_st2}>📜</div>
                    <h4 style={_st3}>{t('nicknameHistory.noChanges', 'No changes')}</h4>
                    <p style={_st4}>{t('nicknameHistory.willAppear', 'Your name changes will appear here')}</p>
                </div>
            ) : (
                <div style={_st5}>
                    {nicknameHistory.map((history, idx) => (
                        <div key={`item-${idx}`} style={_st6}>
                            <div style={_st7}>
                                <div>
                                    <p style={_st8}>
                                        {history.old_nickname} → {history.new_nickname}
                                    </p>
                                    <p style={_st9}>{history.server_name}</p>
                                </div>
                                <span style={_st10}>
                                    {new Date(history.changed_at).toLocaleString('tr-TR')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

NicknameHistoryTab.propTypes = {
    nicknameHistory: PropTypes.object,
};
export default NicknameHistoryTab;
