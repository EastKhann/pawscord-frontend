// frontend/src/components/SoundboardModal.js

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaMusic, FaVolumeUp } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --
const _st1 = {
    margin: '0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};
const _st2 = { color: '#eb459e', fontSize: '24px' };

const SoundboardModal = ({ onClose, fetchWithAuth, apiBaseUrl, sendSignal, absoluteHostUrl }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Sound Board' });
    const [sounds, setSounds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Sesleri çek
        fetchWithAuth(`${apiBaseUrl}/sounds/list/`)
            .then((res) => res.json())
            .then((data) => setSounds(data))
            .catch((err) => logger.error(err));
    }, [apiBaseUrl, fetchWithAuth]);

    const playSound = (soundUrl) => {
        // Tam URL oluştur
        const fullUrl = soundUrl.startsWith('http') ? soundUrl : `${absoluteHostUrl}${soundUrl}`;

        // Socket üzerinden odaya sinyal gönder
        // type: 'play_sound' sinyali VoiceContext by a yakalanacak
        sendSignal({ type: 'play_sound', url: fullUrl });

        // Kendim de duyayım (Gecikmesiz)
        const audio = new Audio(fullUrl);
        audio.volume = 0.5;
        audio.play();

        // Modalı closemaya gerek yok, arka arkaya basılabilir
    };

    const fallbackSounds = [
        { id: 'f1', name: 'Airhorn', file: 'https://www.myinstants.com/media/sounds/airhorn.mp3' },
        {
            id: 'f2',
            name: 'Vine Boom',
            file: 'https://www.myinstants.com/media/sounds/vine-boom.mp3',
        },
        {
            id: 'f3',
            name: 'Applause',
            file: 'https://www.myinstants.com/media/sounds/applause.mp3',
        },
        { id: 'f4', name: 'Bruh', file: 'https://www.myinstants.com/media/sounds/movie_1.mp3' },
        {
            id: 'f5',
            name: 'Cricket',
            file: 'https://www.myinstants.com/media/sounds/cricket_2.mp3',
        },
        { id: 'f6', name: 'Drum', file: 'https://www.myinstants.com/media/sounds/ba-dum-tss.mp3' },
    ];

    const displaySounds = sounds.length > 0 ? sounds : fallbackSounds;

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3 style={_st1}>
                        <FaMusic color="#eb459e" /> Sound Board
                    </h3>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.grid}>
                    {displaySounds.map((sound) => (
                        <button
                            aria-label={sound.name}
                            key={sound.id}
                            onClick={() => playSound(sound.file)}
                            style={styles.soundBtn}
                        >
                            <FaVolumeUp size={24} style={_st2} />
                            <span>{sound.name}</span>
                        </button>
                    ))}
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
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(5px)',
        zIndex: 3000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        background: 'linear-gradient(135deg, rgba(43, 45, 49, 0.9), rgba(30, 31, 34, 0.95))',
        backdropFilter: 'blur(20px)',
        width: '90%',
        maxWidth: '500px',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        color: 'white',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingBottom: '15px',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        fontSize: '1.2em',
        cursor: 'pointer',
        transition: 'color 0.2s',
        ':hover': { color: '#fff' },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: '12px',
    },
    soundBtn: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        color: '#dbdee1',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '0.95em',
        fontWeight: 'bold',
        ':hover': {
            backgroundColor: 'rgba(235, 69, 158, 0.2)',
            transform: 'translateY(-2px)',
            borderColor: '#eb459e',
            color: 'white',
        },
    },
};

SoundboardModal.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    sendSignal: PropTypes.func,
    absoluteHostUrl: PropTypes.string,
};
export default SoundboardModal;
