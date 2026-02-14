import { FaLink, FaSync } from 'react-icons/fa';
import st from './inviteModalStyles';

const LinkSection = ({
    loadingLink, inviteLink, copied,
    copyToClipboard, getOrCreatePermanentLink,
    regenerateLink, isRegenerating,
}) => (
    <div style={st.linkSection}>
        <div style={st.linkLabel}>VEYA B\u0130R SUNUCU DAVET L\u0130NK\u0130 G\u00D6NDER</div>
        <div style={st.linkBox}>
            {loadingLink ? (
                <div style={st.linkLoading}>
                    <div style={st.spinner} />
                    <span style={{ color: '#b5bac1', fontSize: '13px' }}>Link haz\u0131rlan\u0131yor...</span>
                </div>
            ) : inviteLink ? (
                <>
                    <div style={st.linkInputWrap}>
                        <FaLink style={{ color: '#b5bac1', marginRight: '8px', flexShrink: 0 }} />
                        <input type="text" value={inviteLink} readOnly style={st.linkInput} onClick={e => e.target.select()} />
                    </div>
                    <button
                        onClick={copyToClipboard}
                        style={{ ...st.copyBtn, ...(copied ? st.copyBtnDone : {}) }}
                    >
                        {copied ? 'Kopyaland\u0131!' : 'Kopyala'}
                    </button>
                </>
            ) : (
                <div style={st.linkError}>
                    <span style={{ color: '#f0b232', fontSize: '13px' }}>Link olu\u015Fturulamad\u0131</span>
                    <button onClick={getOrCreatePermanentLink} style={st.retryBtn}>Tekrar Dene</button>
                </div>
            )}
        </div>
        {inviteLink && !loadingLink && (
            <button
                onClick={regenerateLink}
                disabled={isRegenerating}
                style={{ ...st.regenBtn, cursor: isRegenerating ? 'wait' : 'pointer' }}
                onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.color = '#fff'; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#b5bac1'; }}
            >
                <FaSync style={{ fontSize: '11px', animation: isRegenerating ? 'inviteSpin 1s linear infinite' : 'none' }} />
                {isRegenerating ? 'Olu\u015Fturuluyor...' : 'Yeni Link Olu\u015Ftur'}
            </button>
        )}
        <div style={st.linkNote}>Bu davet linki s\u00FCresiz ge\u00E7erli ve s\u0131n\u0131rs\u0131z kullan\u0131ml\u0131.</div>
    </div>
);

export default LinkSection;
