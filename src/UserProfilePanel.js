// frontend/src/UserProfilePanel.js (TAM KOD)

import React, { useState, useRef } from 'react';

const UserProfilePanel = ({ 
    user, onClose, onProfileUpdate, updateProfileUrl, getDeterministicAvatar 
}) => {
    const [statusMessage, setStatusMessage] = useState(user?.status_message || '');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setPreview(null);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setIsLoading(true);

        const formData = new FormData();
        formData.append('username', user.username);
        formData.append('status_message', statusMessage);
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }

        try {
            const response = await fetch(updateProfileUrl, {
                method: 'POST',
                body: formData,
            });
            const updatedData = await response.json();
            if (response.ok) {
                onProfileUpdate(updatedData);
                onClose();
            } else {
                alert(`Hata: ${updatedData.error || 'Profil güncellenemedi.'}`);
            }
        } catch (error) {
            console.error("Profil güncelleme hatası:", error);
            alert("Bir ağ hatası oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    const avatarUrl = preview || user?.avatar || getDeterministicAvatar(user?.username);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={e => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                <h2>Profili Düzenle</h2>
                
                <div style={styles.avatarSection}>
                    <img src={avatarUrl} style={styles.avatar} alt="Avatar" />
                    <button onClick={() => fileInputRef.current.click()} style={styles.changeAvatarButton}>
                        Resmi Değiştir
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*" 
                        onChange={handleFileChange}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="status">Durum Mesajı</label>
                    <input
                        id="status"
                        type="text"
                        value={statusMessage}
                        onChange={(e) => setStatusMessage(e.target.value)}
                        placeholder="Ne düşünüyorsun?"
                        maxLength="100"
                        style={styles.input}
                    />
                </div>

                <button onClick={handleSave} disabled={isLoading} style={styles.saveButton}>
                    {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    panel: { backgroundColor: '#36393f', padding: '25px', borderRadius: '8px', color: 'white', width: '400px', position: 'relative', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' },
    closeButton: { position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.5em', cursor: 'pointer' },
    avatarSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' },
    avatar: { width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px', objectFit: 'cover' },
    changeAvatarButton: { padding: '8px 12px', backgroundColor: '#5865f2', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' },
    inputGroup: { marginBottom: '20px' },
    input: { width: '100%', padding: '10px', backgroundColor: '#2f3136', border: '1px solid #202225', borderRadius: '4px', color: 'white', marginTop: '5px', boxSizing: 'border-box' },
    saveButton: { width: '100%', padding: '12px', backgroundColor: '#43b581', border: 'none', borderRadius: '4px', color: 'white', fontSize: '1em', fontWeight: 'bold', cursor: 'pointer' },
};

export default UserProfilePanel;