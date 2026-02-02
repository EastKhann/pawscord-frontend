// frontend/src/components/CompactModeToggle.js
import React from 'react';
import { FaCompress, FaExpand } from 'react-icons/fa';

/**
 * 📐 Compact Mode Toggle
 * Mesaj görünümünü sıkıştırılmış/normal arasında değiştirir
 */
const CompactModeToggle = ({ isCompact, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            style={styles.button}
            title={isCompact ? 'Normal Görünüm' : 'Kompakt Görünüm'}
        >
            {isCompact ? <FaExpand /> : <FaCompress />}
        </button>
    );
};

const styles = {
    button: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        transition: 'all 0.2s',
        ':hover': {
            color: '#fff',
            backgroundColor: '#40444b'
        }
    }
};

export default CompactModeToggle;


