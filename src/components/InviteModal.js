import ReactDOM from 'react-dom';
import { FaHashtag, FaTimes } from 'react-icons/fa';
import st, { injectInviteStyles } from './InviteModal/inviteModalStyles';
import useModalA11y from '../hooks/useModalA11y';
import useInviteLogic from './InviteModal/useInviteLogic';
import FriendList from './InviteModal/FriendList';
import LinkSection from './InviteModal/LinkSection';

injectInviteStyles();

/**
 * @param {Object} props
 * @param {Function} props.onClose - Close modal handler
 * @param {Object} props.server - Server object to invite to
 * @param {Function} props.fetchWithAuth - Authenticated fetch wrapper
 * @param {string} props.apiBaseUrl - API base URL
 * @param {Object} props.currentUser - Current user object
 */
const InviteModal = ({ onClose, server, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Davet Et' });
    const logic = useInviteLogic({ server, fetchWithAuth, apiBaseUrl, currentUser });

    return ReactDOM.createPortal(
        <div style={st.overlay} {...overlayProps}>
            <div style={st.modal} {...dialogProps}>
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

InviteModal.displayName = 'InviteModal';

export default InviteModal;
