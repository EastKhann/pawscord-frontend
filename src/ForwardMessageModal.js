// C:\USERS\EASTKHAN\SOFTWARE\JAVASCRIPT\PAWSCORD_CHAT\FRONTEND\SRC\FORWARDMESSAGEMODAL.JS
//           --- YENİ DOSYA ---

import React, { useState, useMemo } from 'react';
import toast from './utils/toast';
import useModalA11y from './hooks/useModalA11y';

const ForwardMessageModal = ({ message, rooms, conversations, onClose, onForward, currentUsername, getDeterministicAvatar }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTarget, setSelectedTarget] = useState(null); // { type: 'room', id: 'genel' }
    const [forwardContent, setForwardContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const filePreview = message.file_name || (message.image ? "Resim" : (message.is_voice_message ? "Sesli Mesaj" : "Dosya"));

    // Odaları ve DM'leri filtrelemek için
    const filteredTargets = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();

        const filteredRooms = rooms
            .filter(room => room.slug.toLowerCase().includes(lowerSearch))
            .map(room => ({
                type: 'room',
                id: room.slug,
                name: room.name || room.slug.replace(/-\d+-\d+$/, '')
            }));

        const filteredDMs = conversations
            .map(conv => {
                const otherUser = conv.participants.find(p => p.username !== currentUsername);
                if (!otherUser) return null;
                return {
                    type: 'dm',
                    id: conv.id,
                    name: `@ ${otherUser.username}`,
                    avatar: otherUser.avatar || getDeterministicAvatar(otherUser.username)
                };
            })
            .filter(dm => dm && dm.name.toLowerCase().includes(lowerSearch));

        return [...filteredRooms, ...filteredDMs];
    }, [searchTerm, rooms, conversations, currentUsername, getDeterministicAvatar]);

    const handleSend = async () => {
        if (!selectedTarget) {
            toast.error('❌ Lütfen bir hedef sohbet seçin.');
            return;
        }
        setIsLoading(true);
        try {
            // App.js'teki asıl API çağrısını tetikle
            await onForward(selectedTarget.type, selectedTarget.id, forwardContent.trim());
            // Başarılı olursa 'onForward' fonksiyonu (App.js içinde) bu modalı kapatacak
        } catch (error) {
            toast.error(`❌ Aktarma başarısız: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Mesaj Aktar' });

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                {message.id === 'bulk' ? (
                    <>
                        <h4 style={styles.title}>{message.count} Mesaj Aktarılıyor</h4>
                        <p style={styles.previewText}>Seçilen {message.count} medya dosyasını aktarmak üzeresiniz.</p>
                    </>
                ) : (
                    <>
                        <h4 style={styles.title}>Mesajı Şuraya Aktar:</h4>
                        <p style={styles.previewText}>Aktarılıyor: {message.content || (message.image_url ? "[Resim]" : "[Dosya]")}</p>
                    </>
                )}
                <h2 style={styles.header}>Dosyayı Aktar</h2>

                <div style={styles.preview}>
                    <strong>Dosya:</strong> {filePreview}
                </div>

                <input
                    type="text"
                    placeholder="Sohbet ara (#oda veya @kullanıcı)..."
                    aria-label="Sohbet ara"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />

                <div style={styles.targetList}>
                    {filteredTargets.length > 0 ? (
                        filteredTargets.map(target => (
                            <div
                                key={`${target.type}-${target.id}`}
                                style={{
                                    ...styles.targetItem,
                                    backgroundColor: selectedTarget?.id === target.id ? 'var(--button-primary)' : 'transparent'
                                }}
                                onClick={() => setSelectedTarget(target)}
                            >
                                {target.type === 'dm' && target.avatar && (
                                    <img src={target.avatar} style={styles.avatar} alt="avatar" />
                                )}
                                {target.name}
                            </div>
                        ))
                    ) : (
                        <p style={styles.noResults}>Sonuç bulunamadı.</p>
                    )}
                </div>

                <textarea
                    placeholder="İsteğe bağlı not ekle..."
                    aria-label="Aktarım notu"
                    value={forwardContent}
                    onChange={(e) => setForwardContent(e.target.value)}
                    style={styles.textArea}
                />

                <button
                    onClick={handleSend}
                    disabled={!selectedTarget || isLoading}
                    style={styles.sendButton}
                >
                    {isLoading ? 'Gönderiliyor...' : `Aktar -> ${selectedTarget ? selectedTarget.name : '...'}`}
                </button>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modal: {
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        width: '400px',
        maxWidth: '95vw',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
        padding: '20px',
    },
    closeButton: { position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '2em', cursor: 'pointer', zIndex: 10 },
    header: { marginTop: 0, borderBottom: '1px solid var(--border-primary)', paddingBottom: '10px' },
    preview: { padding: '10px', backgroundColor: 'var(--background-tertiary)', borderRadius: '4px', marginBottom: '15px', wordBreak: 'break-all' },
    searchInput: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'var(--background-tertiary)',
        border: '1px solid var(--background-accent)',
        borderRadius: '4px',
        color: 'var(--text-primary)',
        boxSizing: 'border-box',
        marginBottom: '10px',
    },
    targetList: {
        height: '200px',
        overflowY: 'auto',
        border: '1px solid var(--background-tertiary)',
        borderRadius: '4px',
        marginBottom: '15px',
    },
    targetItem: {
        padding: '10px',
        borderBottom: '1px solid var(--background-tertiary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background-color 0.2s',
    },
    avatar: { width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' },
    noResults: { padding: '10px', color: 'var(--text-muted)', textAlign: 'center' },
    textArea: {
        width: '100%',
        height: '60px',
        padding: '10px',
        backgroundColor: 'var(--background-tertiary)',
        border: '1px solid var(--background-accent)',
        borderRadius: '4px',
        color: 'var(--text-primary)',
        boxSizing: 'border-box',
        marginBottom: '15px',
        resize: 'none',
    },
    sendButton: {
        padding: '12px',
        backgroundColor: 'var(--text-positive)',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontSize: '1em',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default React.memo(ForwardMessageModal);

