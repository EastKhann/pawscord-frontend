import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import profileStyles from '../styles';

// -- dynamic style helpers (pass 2) --
const _st1110 = {
    ...profileStyles.button('danger'),
    padding: '8px 16px',
    fontSize: '12px',
    marginLeft: '12px',
};

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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
};
const _st7 = { flex: 1 };
const _st8 = { color: '#fff', margin: '0 0 8px 0', fontSize: '14px' };
const _st9 = {
    color: '#b5bac1',
    margin: 0,
    fontSize: '13px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};
const _st10 = { color: '#949ba4', fontSize: '11px', marginTop: '4px', display: 'block' };

const DraftsTab = ({ deleteDraft, drafts: rawDrafts }) => {
    const drafts = rawDrafts || [];
    const styles = profileStyles;
    const { t } = useTranslation();
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div style={styles.card}>
            <h3 style={styles.sectionTitle}>{t('drafts.title')}</h3>

            {drafts.length === 0 ? (
                <div style={_st1}>
                    <div style={_st2}>📝</div>
                    <h4 style={_st3}>{t('drafts.noDrafts')}</h4>
                    <p style={_st4}>{t('drafts.autoSaved')}</p>
                </div>
            ) : (
                <div style={_st5}>
                    {drafts.map((draft, idx) => (
                        <div key={`item-${idx}`} style={_st6}>
                            <div style={_st7}>
                                <h4 style={_st8}>
                                    {draft.channel_name || `Channel ${draft.channel_id}`}
                                </h4>
                                <p style={_st9}>{draft.content}</p>
                                <span style={_st10}>
                                    {new Date(draft.updated_at).toLocaleString('tr-TR')}
                                </span>
                            </div>
                            <button
                                style={_st1110}
                                aria-label="action-button"
                                onClick={() => deleteDraft(draft.key)}
                            >
                                🗑️ {t('common.delete')}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

DraftsTab.propTypes = {
    deleteDraft: PropTypes.func,
    drafts: PropTypes.array,
};
export default DraftsTab;
