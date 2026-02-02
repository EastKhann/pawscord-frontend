// frontend/src/StickerPicker.js
import React, { useEffect, useState } from 'react';

const StickerPicker = ({ categoryId, onSelect, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [stickers, setStickers] = useState([]);

    useEffect(() => {
        if (!categoryId) return;
        fetchWithAuth(`${apiBaseUrl}/servers/${categoryId}/stickers/`)
            .then(res => res.json())
            .then(data => setStickers(data))
            .catch(err => console.error("Sticker hatası:", err));
    }, [categoryId, apiBaseUrl, fetchWithAuth]);

    return (
        <div style={styles.pickerContainer}>
            <div style={styles.header}>Sunucu Stickerları</div>
            <div style={styles.grid}>
                {stickers.map(sticker => (
                    <img
                        key={sticker.id}
                        src={sticker.image}
                        alt={sticker.name}
                        style={styles.sticker}
                        onClick={() => onSelect(sticker.image)} // Resmi seçince mesaj olarak gönderir
                    />
                ))}
                {stickers.length === 0 && <p style={{ padding: 10 }}>Bu sunucuda sticker yok.</p>}
            </div>
        </div>
    );
};

const styles = {
    pickerContainer: {
        position: 'absolute', bottom: '60px', right: '10px',
        width: '300px', height: '250px', backgroundColor: '#2f3136',
        borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        zIndex: 100, overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: { padding: '10px', fontWeight: 'bold', borderBottom: '1px solid #202225', color: '#fff' },
    grid: { padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', overflowY: 'auto' },
    sticker: { width: '100%', cursor: 'pointer', transition: 'transform 0.1s' }
};

export default React.memo(StickerPicker);

