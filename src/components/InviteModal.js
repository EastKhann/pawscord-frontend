import ReactDOM from 'react-dom';
import { FaHashtag, FaTimes } from 'react-icons/fa';
import st, { injectInviteStyles } from './InviteModal/inviteModalStyles';
import useInviteLogic from './InviteModal/useInviteLogic';
import FriendList from './InviteModal/FriendList';
import LinkSection from './InviteModal/LinkSection';

injectInviteStyles();

const InviteModal = ({ onClose, server, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const logic = useInviteLogic({ server, fetchWithAuth, apiBaseUrl, currentUser });

    return ReactDOM.createPortal(
        <div style={st.overlay} onClick={onClose}>
            <div style={st.modal} onClick={e => e.stopPropagation()}>
                <div style={st.header}>
                    <div>
                        <div style={st.headerRow}>
                            <FaHashtag style={{ color: '#b5bac1', fontSize: '14px' }} />
                            <span style={st.serverLabel}>{server?.name || 'Sunucu'}</span>
                        </div>
                        <h2 style={st.title}>Arkada{'ş'}lar{'ı'}n{'ı'} Davet Et</h2>
                    </div>
                    <button onClick={onClose} style={st.closeBtn}><FaTimes /></button>
                </div>
                <FriendList {...logic} />
                <LinkSection {...logic} />
            </div>
        </div>,
        document.body
    );
};

export default InviteModal;
