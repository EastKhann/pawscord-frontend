// frontend/src/components/CustomEmojiUploader.js - FEATURE #17
import React, { useState } from 'react';
import { FaUpload, FaSmile } from 'react-icons/fa';

const CustomEmojiUploader = ({ serverId, apiBaseUrl, fetchWithAuth, onUploadSuccess }) => {
    const [uploading, setUploading] = useState(false);
    const [emojiName, setEmojiName] = useState('');

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file || !emojiName) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', emojiName);
        formData.append('server', serverId);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/emojis/upload/`, {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                onUploadSuccess();
                setEmojiName('');
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}><FaSmile /> Özel Emoji Ekle</h3>
            <input
                type="text"
                placeholder="Emoji adı (örn: custom_smile)"
                value={emojiName}
                onChange={(e) => setEmojiName(e.target.value)}
                style={styles.input}
            />
            <label style={styles.uploadButton}>
                <FaUpload /> {uploading ? 'Yükleniyor...' : 'Dosya Seç'}
                <input type="file" accept="image/*" onChange={handleFileSelect} style={styles.fileInput} disabled={!emojiName || uploading} />
            </label>
            <p style={styles.hint}>PNG, GIF, JPG (max 256KB)</p>
        </div>
    );
};

const styles = {
    container: { padding: '16px', backgroundColor: '#2b2d31', borderRadius: '8px' },
    title: { color: '#fff', fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
    input: { width: '100%', padding: '10px', backgroundColor: '#1e1f22', border: '1px solid #4e5058', borderRadius: '6px', color: '#fff', marginBottom: '12px' },
    uploadButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', backgroundColor: '#5865f2', color: '#fff', borderRadius: '6px', cursor: 'pointer', justifyContent: 'center' },
    fileInput: { display: 'none' },
    hint: { color: '#72767d', fontSize: '12px', marginTop: '8px', textAlign: 'center' }
};

export default CustomEmojiUploader;



