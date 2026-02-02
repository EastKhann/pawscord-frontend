// frontend/src/components/AdvancedSearchModal.js
import React, { useState } from 'react';
import { FaSearch, FaFilter, FaTimes, FaCalendar, FaUser, FaFile, FaImage } from 'react-icons/fa';

const AdvancedSearchModal = ({ onSearch, onClose }) => {
    const [filters, setFilters] = useState({
        query: '',
        from: '',
        in: '',
        has: [],
        before: '',
        after: '',
        during: '',
        fileType: ''
    });

    const hasOptions = [
        { value: 'link', label: 'Link', icon: '🔗' },
        { value: 'embed', label: 'Embed', icon: '📎' },
        { value: 'file', label: 'Dosya', icon: '📄' },
        { value: 'image', label: 'Resim', icon: '🖼️' },
        { value: 'video', label: 'Video', icon: '🎥' },
        { value: 'pinned', label: 'Sabitlenen', icon: '📌' }
    ];

    const fileTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'zip', 'rar'];

    const toggleHas = (value) => {
        setFilters(prev => ({
            ...prev,
            has: prev.has.includes(value)
                ? prev.has.filter(h => h !== value)
                : [...prev.has, value]
        }));
    };

    const buildQuery = () => {
        let query = filters.query;
        if (filters.from) query += ` from:@${filters.from}`;
        if (filters.in) query += ` in:#${filters.in}`;
        if (filters.has.length > 0) query += ` has:${filters.has.join(',')}`;
        if (filters.before) query += ` before:${filters.before}`;
        if (filters.after) query += ` after:${filters.after}`;
        if (filters.fileType) query += ` filetype:${filters.fileType}`;
        return query.trim();
    };

    const handleSearch = () => {
        onSearch(buildQuery(), filters);
        onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaFilter /> Gelişmiş Arama
                    </h3>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {/* Main Query */}
                    <div style={styles.field}>
                        <label style={styles.label}>
                            <FaSearch /> Arama Terimi
                        </label>
                        <input
                            type="text"
                            placeholder="Mesaj içeriği ara..."
                            value={filters.query}
                            onChange={(e) => setFilters({...filters, query: e.target.value})}
                            style={styles.input}
                        />
                    </div>

                    {/* From User */}
                    <div style={styles.field}>
                        <label style={styles.label}>
                            <FaUser /> Kullanıcıdan
                        </label>
                        <input
                            type="text"
                            placeholder="Kullanıcı adı"
                            value={filters.from}
                            onChange={(e) => setFilters({...filters, from: e.target.value})}
                            style={styles.input}
                        />
                    </div>

                    {/* In Channel */}
                    <div style={styles.field}>
                        <label style={styles.label}>📍 Kanalda</label>
                        <input
                            type="text"
                            placeholder="Kanal adı"
                            value={filters.in}
                            onChange={(e) => setFilters({...filters, in: e.target.value})}
                            style={styles.input}
                        />
                    </div>

                    {/* Has Options */}
                    <div style={styles.field}>
                        <label style={styles.label}>
                            <FaFile /> İçerir
                        </label>
                        <div style={styles.hasOptions}>
                            {hasOptions.map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => toggleHas(option.value)}
                                    style={{
                                        ...styles.hasButton,
                                        ...(filters.has.includes(option.value) ? styles.hasButtonActive : {})
                                    }}
                                >
                                    {option.icon} {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Date Range */}
                    <div style={styles.dateRange}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                <FaCalendar /> Başlangıç
                            </label>
                            <input
                                type="date"
                                value={filters.after}
                                onChange={(e) => setFilters({...filters, after: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                <FaCalendar /> Bitiş
                            </label>
                            <input
                                type="date"
                                value={filters.before}
                                onChange={(e) => setFilters({...filters, before: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                    </div>

                    {/* File Type */}
                    <div style={styles.field}>
                        <label style={styles.label}>
                            <FaImage /> Dosya Tipi
                        </label>
                        <select
                            value={filters.fileType}
                            onChange={(e) => setFilters({...filters, fileType: e.target.value})}
                            style={styles.select}
                        >
                            <option value="">Tümü</option>
                            {fileTypes.map(type => (
                                <option key={type} value={type}>{type.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    {/* Query Preview */}
                    <div style={styles.queryPreview}>
                        <label style={styles.label}>Sorgu Önizlemesi:</label>
                        <code style={styles.queryCode}>{buildQuery() || 'Filtre ekleyin...'}</code>
                    </div>
                </div>

                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.cancelButton}>
                        İptal
                    </button>
                    <button onClick={handleSearch} style={styles.searchButton}>
                        <FaSearch /> Ara
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '600px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    header: {
        padding: '16px 20px',
        borderBottom: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: '18px',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '20px',
        cursor: 'pointer'
    },
    content: {
        padding: '20px'
    },
    field: {
        marginBottom: '16px'
    },
    label: {
        color: '#b9bbbe',
        fontSize: '14px',
        marginBottom: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1f22',
        border: '1px solid #4e5058',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1f22',
        border: '1px solid #4e5058',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    hasOptions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
    },
    hasButton: {
        padding: '6px 12px',
        backgroundColor: '#1e1f22',
        border: '1px solid #4e5058',
        borderRadius: '16px',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '13px',
        transition: 'all 0.2s'
    },
    hasButtonActive: {
        backgroundColor: '#5865f2',
        borderColor: '#5865f2',
        color: '#fff'
    },
    dateRange: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px'
    },
    queryPreview: {
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#1e1f22',
        borderRadius: '6px',
        border: '1px solid #4e5058'
    },
    queryCode: {
        color: '#23a559',
        fontSize: '13px',
        fontFamily: 'monospace',
        display: 'block',
        marginTop: '8px'
    },
    footer: {
        padding: '16px 20px',
        borderTop: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '12px'
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        border: '1px solid #4e5058',
        borderRadius: '6px',
        color: '#b9bbbe',
        cursor: 'pointer'
    },
    searchButton: {
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }
};

export default AdvancedSearchModal;



