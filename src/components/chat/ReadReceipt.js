// frontend/src/components/ReadReceipt.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaCheckDouble } from 'react-icons/fa';

const ReadReceipt = ({ status, readBy = [] }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /*
    Status:
    - 'sent': Sent (tek tik)
    - 'delivered': Forwardildi (çift tik gri)
    - 'read': Read (çift tik mavi)
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
                return `${readBy[0]} by a okundu`;
            } else if (readBy.length === 2) {
                return `${readBy[0]} ve ${readBy[1]} by a okundu`;
            } else {
                return `${readBy.length} kişi by a okundu`;
            }
        }
        return status === 'sent' ? 'Sent' : status === 'delivered' ? 'Forwardildi' : 'Read';
    };

    return (
        <span aria-label="read receipt" style={styles.container} title={getTooltip()}>
            {getIcon()}
        </span>
    );
};
const styles = {
    container: {
        display: 'inline-flex',
        alignItems: 'center',
        marginLeft: '4px',
        cursor: 'help',
    },
    iconSingle: {
        fontSize: '12px',
        color: '#949ba4',
    },
    iconDelivered: {
        fontSize: '12px',
        color: '#949ba4',
    },
    iconRead: {
        fontSize: '12px',
        color: '#5865f2', // Blue = Read
    },
};

ReadReceipt.propTypes = {
    status: PropTypes.string,
    readBy: PropTypes.object,
};
export default ReadReceipt;
