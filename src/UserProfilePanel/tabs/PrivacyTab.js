import React from 'react';
import PropTypes from 'prop-types';
import profileStyles from '../styles';

// -- extracted inline style constants --
const _st1 = { color: '#b5bac1', marginBottom: '24px' };
const _st2 = { color: '#b5bac1', textAlign: 'center', padding: '32px' };
const _st3 = { display: 'flex', alignItems: 'center', gap: '12px' };
const _st4 = { width: '40px', height: '40px', borderRadius: '50%' };
const _st5 = { color: '#fff', margin: 0, fontWeight: '600' };
const _st6 = {
    marginTop: '32px',
    padding: '16px',
    background: 'rgba(250, 166, 26, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(250, 166, 26, 0.3)',
};
const _st7 = { color: '#f0b232', margin: '0 0 8px 0', fontSize: '14px' };
const _st8 = { color: '#b5bac1', margin: 0, fontSize: '13px' };

const PrivacyTab = ({ blockedUsers: rawBU, unblockUser }) => {
    const blockedUsers = rawBU || [];
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🚫 Blocked Users</h3>

            <p style={_st1}>Blocked users cannot contact you or see your messages.</p>

            {blockedUsers.length === 0 && <p style={_st2}>No blocked users.</p>}

            {blockedUsers.map((blockedUser) => (
                <div key={blockedUser.id} style={styles.sessionCard}>
                    <div style={_st3}>
                        <img
                            src={
                                blockedUser.avatar_url ||
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect fill="%235865f2" width="40" height="40" rx="20"/%3E%3Ctext x="20" y="20" font-size="18" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'
                            }
                            alt={blockedUser.username}
                            style={_st4}
                        />
                        <div>
                            <p style={_st5}>{blockedUser.username}</p>
                            <p style={styles.settingRowDesc}>
                                Blocked on:{' '}
                                {new Date(blockedUser.blocked_at).toLocaleDateString('tr-TR')}
                            </p>
                        </div>
                    </div>
                    <button
                        style={styles.button('secondary')}
                        aria-label="action-button"
                        onClick={() => unblockUser(blockedUser.user_id)}
                    >
                        ✅ Unblock
                    </button>
                </div>
            ))}

            <div style={_st6}>
                <h4 style={_st7}>ℹ️ Privacy Tip</h4>
                <p style={_st8}>
                    To block a user from their profile page "Block" butonunu kullanabilirsiniz.
                </p>
            </div>
        </div>
    );
};

PrivacyTab.propTypes = {
    blockedUsers: PropTypes.array,
    unblockUser: PropTypes.object,
};
export default PrivacyTab;
