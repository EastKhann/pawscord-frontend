// frontend/src/components/Message/EditHistory.js
// 📜 EDIT HISTORY - Shows message edit history dropdown

import { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

const S = {
    size: { maxHeight: '200px', overflowY: 'auto' },
    rel: { position: 'relative', display: 'inline-block', marginLeft: '5px' },
};

export const EditHistory = memo(({ messageId, messageEditHistoryUrl, fetchWithAuth }) => {
    const { t } = useTranslation();
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const historyRef = useRef(null);

    useEffect(() => {
        if (!showHistory) return;

        const fetchHistory = async () => {
            try {
                const response = await fetchWithAuth(`${messageEditHistoryUrl}${messageId}/edit_history/`);
                if (response.ok) setHistory(await response.json());
            } catch (e) {
                logger.error(e);
            }
        };

        fetchHistory();

        const handleClickOutside = (e) => {
            if (historyRef.current && !historyRef.current.contains(e.target)) {
                setShowHistory(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showHistory, messageId, messageEditHistoryUrl, fetchWithAuth]);

    return (
        <div aria-label={t('message.editHistory', 'Edit history')} style={S.rel}>ref={historyRef}>
            <span
                onClick={(e) => { e.stopPropagation(); setShowHistory(!showHistory); }}
                style={styles.editedLabel}>
                (editndi)
            </span>

            {showHistory && (
                <div style={styles.historyDropdown}>
                    <h4 style={styles.historyHeader}>History ({history.length})</h4>
                    <div style={S.size}>
                        {history.map((h, i) => (
                            <div key={`item-${i}`} style={styles.historyItem}>
                                <small>{new Date(h.edited_at).toLocaleString()}</small>
                                <div><del>{h.old_content}</del></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

const styles = {
    editedLabel: {
        fontSize: '0.7em',
        color: '#949ba4',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    historyDropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '280px',
        backgroundColor: '#0d0e10',
        border: '1px solid #0e1222',
        borderRadius: '8px',
        padding: '12px',
        zIndex: 100,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    historyHeader: {
        margin: '0 0 10px 0',
        fontSize: '0.9em',
        color: '#fff',
        borderBottom: '1px solid #0e1222',
        paddingBottom: '8px'
    },
    historyItem: {
        marginBottom: '12px',
        fontSize: '0.85em',
        color: '#b5bac1',
        paddingBottom: '8px',
        borderBottom: '1px solid #0e1222'
    }
};

EditHistory.displayName = 'EditHistory';
EditHistory.propTypes = {
    messageId: PropTypes.string,
    messageEditHistoryUrl: PropTypes.string,
    fetchWithAuth: PropTypes.func,
};
export default EditHistory;