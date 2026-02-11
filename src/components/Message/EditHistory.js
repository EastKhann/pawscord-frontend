// frontend/src/components/Message/EditHistory.js
// 📜 EDIT HISTORY - Shows message edit history dropdown

import { useState, useEffect, useRef, memo } from 'react';

export const EditHistory = memo(({ messageId, messageEditHistoryUrl, fetchWithAuth }) => {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const historyRef = useRef(null);

    useEffect(() => {
        if (!showHistory) return;

        const fetchHistory = async () => {
            try {
                const response = await fetchWithAuth(`${messageEditHistoryUrl}${messageId}/edit_history/`);
                if (response.ok) setHistory(await response.json());
            } catch (e) {
                console.error(e);
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
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '5px' }} ref={historyRef}>
            <span
                onClick={(e) => { e.stopPropagation(); setShowHistory(!showHistory); }}
                style={styles.editedLabel}
            >
                (düzenlendi)
            </span>

            {showHistory && (
                <div style={styles.historyDropdown}>
                    <h4 style={styles.historyHeader}>Geçmiş ({history.length})</h4>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {history.map((h, i) => (
                            <div key={i} style={styles.historyItem}>
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
        color: '#72767d',
        cursor: 'pointer',
        textDecoration: 'underline'
    },
    historyDropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '280px',
        backgroundColor: '#1e1f22',
        border: '1px solid #111214',
        borderRadius: '8px',
        padding: '12px',
        zIndex: 100,
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    },
    historyHeader: {
        margin: '0 0 10px 0',
        fontSize: '0.9em',
        color: '#fff',
        borderBottom: '1px solid #2f3136',
        paddingBottom: '8px'
    },
    historyItem: {
        marginBottom: '12px',
        fontSize: '0.85em',
        color: '#b9bbbe',
        paddingBottom: '8px',
        borderBottom: '1px solid #2b2d31'
    }
};

EditHistory.displayName = 'EditHistory';
export default EditHistory;
