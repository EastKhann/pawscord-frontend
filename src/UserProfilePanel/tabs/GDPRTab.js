import React from 'react';
import PropTypes from 'prop-types';
import profileStyles from '../styles';

// -- dynamic style helpers (pass 2) --
const _st1111 = {
    ...profileStyles.button('secondary'),
    padding: '8px 16px',
    fontSize: '12px',
    textDecoration: 'none',
};

// -- extracted inline style constants --
const _st1 = {
    padding: '16px',
    background: 'rgba(88, 101, 242, 0.1)',
    borderRadius: '8px',
    borderLeft: '4px solid #5865f2',
    marginBottom: '24px',
};
const _st2 = { color: '#fff', margin: '0 0 8px 0', fontSize: '14px' };
const _st3 = { color: '#b5bac1', margin: 0, fontSize: '13px' };
const _st4 = { marginTop: '24px' };
const _st5 = { color: '#fff', marginBottom: '12px' };
const _st6 = {
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    marginBottom: '8px',
};
const _st7 = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const _st8 = { color: '#b5bac1', margin: '4px 0 0 0', fontSize: '12px' };

const GDPRTab = ({ exportRequested, gdprExports: rawGE, requestGDPRExport }) => {
    const gdprExports = rawGE || [];
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div style={styles.card}>
            <h3 style={styles.sectionTitle}>🔒 GDPR & Data Privacy</h3>

            <div style={_st1}>
                <h4 style={_st2}>ℹ️ Data Export Rights</h4>
                <p style={_st3}>
                    Under GDPR (General Data Protection Regulation), you can export all your
                    personal data. This includes messages, profile information, activities, and
                    more.
                </p>
            </div>

            <button
                style={styles.button('primary')}
                aria-label="requestGDPRExport"
                onClick={requestGDPRExport}
                disabled={exportRequested}
            >
                {exportRequested ? '⏳ Processing...' : '📥 GDPR Exportma Talebi Create'}
            </button>

            {gdprExports.length > 0 && (
                <div style={_st4}>
                    <h4 style={_st5}>📋 Export History</h4>
                    {gdprExports.map((exp, idx) => (
                        <div key={`item-${idx}`} style={_st6}>
                            <div style={_st7}>
                                <div>
                                    <p style={styles.settingRowTitle}>
                                        {exp.status === 'pending' && '⏳ Processing'}
                                        {exp.status === 'completed' && '✅ Completed'}
                                        {exp.status === 'failed' && '❌ Failed'}
                                    </p>
                                    <p style={_st8}>
                                        {new Date(exp.created_at).toLocaleString('tr-TR')}
                                    </p>
                                </div>
                                {exp.status === 'completed' && exp.download_url && (
                                    <a href={exp.download_url} style={_st1111}>
                                        📥 Download
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

GDPRTab.propTypes = {
    exportRequested: PropTypes.object,
    gdprExports: PropTypes.array,
    requestGDPRExport: PropTypes.object,
};
export default GDPRTab;
