// frontend/src/components/ReadReceipt.js
import { FaCheck, FaCheckDouble } from 'react-icons/fa';

const ReadReceipt = ({ status, readBy = [] }) => {
    /*
    Status:
    - 'sent': Gönderildi (tek tik)
    - 'delivered': İletildi (çift tik gri)
    - 'read': Okundu (çift tik mavi)
    */

    if (!status || status === 'sending') return null;

    const getIcon = () => {
        if (status === 'sent') {
            return <FaCheck style={styles.iconSingle} />;
        } else if (status === 'delivered') {
            return <FaCheckDouble style={styles.iconDelivered} />;
        } else if (status === 'read') {
            return <FaCheckDouble style={styles.iconRead} />;
        }
        return null;
    };

    const getTooltip = () => {
        if (status === 'read' && readBy.length > 0) {
            if (readBy.length === 1) {
                return `${readBy[0]} tarafından okundu`;
            } else if (readBy.length === 2) {
                return `${readBy[0]} ve ${readBy[1]} tarafından okundu`;
            } else {
                return `${readBy.length} kişi tarafından okundu`;
            }
        }
        return status === 'sent' ? 'Gönderildi' :
               status === 'delivered' ? 'İletildi' :
               'Okundu';
    };

    return (
        <span style={styles.container} title={getTooltip()}>
            {getIcon()}
        </span>
    );
};

const styles = {
    container: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '4px',
        cursor: 'help'
    },
    iconSingle: {
        fontSize: '12px',
        color: '#72767d'
    },
    iconDelivered: {
        fontSize: '12px',
        color: '#72767d'
    },
    iconRead: {
        fontSize: '12px',
        color: '#5865f2'  // Blue = Read
    }
};

export default ReadReceipt;



