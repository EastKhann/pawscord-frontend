import { FaLink, FaSync } from 'react-icons/fa';

import PropTypes from 'prop-types';

import st from './inviteModalStyles';

import { useTranslation } from 'react-i18next';

const S = {
    txt2: { color: '#f0b232', fontSize: '13px' },

    txt: { color: '#b5bac1', marginRight: '8px', flexShrink: 0 },
};

const LinkSection = ({
    loadingLink,
    inviteLink,
    copied,

    copyToClipboard,
    getOrCreateThumanentLink,

    regenerateLink,
    isRegenerating,
}) => {
    const { t } = useTranslation();

    const copyBtnStyle = { ...st.copyBtn, ...(copied ? st.copyBtnDone : {}) };

    const regenBtnStyle = { ...st.regenBtn, cursor: isRegenerating ? 'wait' : 'pointer' };

    const syncIconStyle = {
        fontSize: '11px',
        animation: isRegenerating ? 'inviteSpin 1s linear infinite' : 'none',
    };

    return (
        <div aria-label="link section" style={st.linkSection}>
            <div style={st.linkLabel}>{t('veya_bi̇r_sunucu_davet_li̇nki̇_gönder')}</div>

            <div style={st.linkBox}>
                {loadingLink ? (
                    <div style={st.linkLoading}>
                        <div style={st.spinner} />

                        <span className="text-b5-13">{t('link_hazırlanıyor')}</span>
                    </div>
                ) : inviteLink ? (
                    <>
                        <div style={st.linkInputWrap}>
                            <FaLink style={S.txt} />

                            <input
                                type="text"
                                value={inviteLink}
                                readOnly
                                style={st.linkInput}
                                onClick={(e) => e.target.select()}
                                aria-label="Invite Link"
                            />
                        </div>

                        <button onClick={copyToClipboard} style={copyBtnStyle}>
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </>
                ) : (
                    <div style={st.linkError}>
                        <span style={S.txt2}>{t('link_oluşturulamadı')}</span>

                        <button onClick={getOrCreateThumanentLink} style={st.retryBtn}>
                            {t('tekrar_dene')}
                        </button>
                    </div>
                )}
            </div>

            {inviteLink && !loadingLink && (
                <button
                    onClick={regenerateLink}
                    disabled={isRegenerating}
                    style={regenBtnStyle}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.06)';
                        e.target.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#b5bac1';
                    }}
                >
                    <FaSync style={syncIconStyle} />

                    {isRegenerating ? t('invite.generating') : t('invite.newLink')}
                </button>
            )}

            <div style={st.linkNote}>
                {t('bu_davet_linki_süresiz_geçerli_ve_sınırsız_kullanımlı')}
            </div>
        </div>
    );
};

LinkSection.propTypes = {
    loadingLink: PropTypes.bool,

    inviteLink: PropTypes.string,

    copied: PropTypes.object,

    copyToClipboard: PropTypes.object,

    getOrCreateThumanentLink: PropTypes.func,

    regenerateLink: PropTypes.string,

    isRegenerating: PropTypes.bool,
};

export default LinkSection;
