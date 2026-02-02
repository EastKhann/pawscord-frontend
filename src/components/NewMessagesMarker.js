// frontend/src/components/NewMessagesMarker.js
import React from 'react';

const NewMessagesMarker = () => {
    return (
        <div style={styles.container}>
            <div style={styles.line}></div>
            <span style={styles.text}>YENİ MESAJLAR</span>
            <div style={styles.line}></div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '12px',
        margin: '8px 0'
    },
    line: {
        flex: 1,
        height: '1px',
        backgroundColor: '#f23f42',
        opacity: 0.6
    },
    text: {
        color: '#f23f42',
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '0.5px'
    }
};

export default React.memo(NewMessagesMarker);



