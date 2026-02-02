// frontend/src/PronunciationPage.js

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaArrowLeft, FaVolumeUp, FaForward, FaRedo } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import toast from './utils/toast';

// 👇 YENİ LİSTEYİ IMPORT EDİYORUZ
import { pronunciationList } from './data/pronunciationList';

const PronunciationPage = ({ apiBaseUrl }) => {
    const { token } = useAuth();

    // State'ler
    const [currentCard, setCurrentCard] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const [score, setScore] = useState(0);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // İlk açılışta rastgele kelime seç
    useEffect(() => {
        pickRandomCard();
    }, []);

    const pickRandomCard = () => {
        // 👇 IMPORT ETTİĞİMİZ LİSTEYİ KULLANIYORUZ
        const randomIndex = Math.floor(Math.random() * pronunciationList.length);
        setCurrentCard(pronunciationList[randomIndex]);
        setStatus('idle');
        setFeedbackMsg("");
    };

    // ... (Geri kalan tüm fonksiyonlar ve return kısmı AYNEN kalacak, bir değişiklik yok) ...

    const playPronunciation = async () => {
        if (!currentCard) return;
        try {
            const res = await fetch(`${apiBaseUrl}/eng-learn/speak-text/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: currentCard.text })
            });
            if (res.ok) {
                const data = await res.json();
                const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
                audio.play();
            }
        } catch (e) { console.error(e); }
    };

    const startRecording = async () => {
        setFeedbackMsg("");
        setStatus('recording');
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };
            mediaRecorderRef.current.onstop = handleStop;
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            toast.error("❌ Mikrofon izni gerekli!");
            setStatus('idle');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleStop = async () => {
        setProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'voice.webm');
        formData.append('target_text', currentCard.text);

        try {
            const res = await fetch(`${apiBaseUrl}/eng-learn/check-pronunciation/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            const data = await res.json();

            if (data.is_correct) {
                setStatus('success');
                setFeedbackMsg(`Harika! 🎉 (${data.spoken_text})`);
                setScore(s => s + 1);
            } else {
                setStatus('error');
                setFeedbackMsg(`Algılanan: "${data.spoken_text || '???'}" - Tekrar dene!`);
            }
        } catch (e) {
            console.error(e);
            setFeedbackMsg("Sunucu hatası.");
            setStatus('error');
        } finally {
            setProcessing(false);
        }
    };

    if (!currentCard) return <div style={styles.container}>Yükleniyor...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Link to="/eng-learn" style={styles.backBtn}><FaArrowLeft /> Çıkış</Link>
                <div style={styles.scoreBadge}>Skor: {score}</div>
            </div>

            <div style={styles.mainContent}>

                <div style={{
                    ...styles.card,
                    borderColor: status === 'success' ? '#43b581' : (status === 'error' ? '#f04747' : 'transparent'),
                    boxShadow: status === 'success' ? '0 0 30px rgba(67, 181, 129, 0.3)' : (status === 'error' ? '0 0 30px rgba(240, 71, 71, 0.3)' : '0 10px 30px rgba(0,0,0,0.3)')
                }}>
                    {/* Zorluk Rozetinin Rengi Dinamik Olsun */}
                    <span style={{
                        ...styles.difficulty,
                        backgroundColor: currentCard.difficulty === 'Efsane' ? '#eb459e' : (currentCard.difficulty === 'Zor' ? '#f04747' : '#202225'),
                        color: currentCard.difficulty === 'Efsane' || currentCard.difficulty === 'Zor' ? 'white' : '#949ba4'
                    }}>
                        {currentCard.difficulty}
                    </span>

                    <h1 style={styles.wordText}>{currentCard.text}</h1>

                    <div style={{ height: '30px', marginTop: '10px', color: status === 'success' ? '#43b581' : '#f04747', fontWeight: 'bold' }}>
                        {processing ? "Analiz ediliyor..." : feedbackMsg}
                    </div>

                    <div style={styles.controls}>
                        <button onClick={playPronunciation} style={styles.iconButton} title="Doğrusunu Dinle">
                            <FaVolumeUp size={24} />
                        </button>

                        <button
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onTouchStart={startRecording}
                            onTouchEnd={stopRecording}
                            style={{
                                ...styles.micButton,
                                backgroundColor: isRecording ? '#f04747' : (status === 'success' ? '#43b581' : '#5865f2'),
                                transform: isRecording ? 'scale(1.1)' : 'scale(1)'
                            }}
                        >
                            <FaMicrophone size={32} />
                        </button>
                    </div>

                    <p style={styles.hint}>
                        {isRecording ? "Dinliyor..." : "Mikrofona basılı tut ve oku"}
                    </p>
                </div>

                <div style={styles.bottomNav}>
                    <button onClick={pickRandomCard} style={styles.skipButton}>
                        {status === 'success' ? (
                            <>Sonraki Kelime <FaForward /></>
                        ) : (
                            <>Bunu Geç <FaRedo /></>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e1f22', color: 'white',
        padding: '20px', boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif', alignItems: 'center'
    },
    header: {
        width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'
    },
    backBtn: { color: '#b9bbbe', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
    scoreBadge: { backgroundColor: '#f0b232', color: '#000', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' },

    mainContent: {
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'
    },
    card: {
        backgroundColor: '#2b2d31', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '500px', // Kartı biraz genişlettik
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        border: '3px solid transparent', transition: 'all 0.3s ease'
    },
    difficulty: {
        padding: '4px 12px', borderRadius: '12px', fontSize: '0.85em', marginBottom: '20px', fontWeight: 'bold'
    },
    wordText: {
        fontSize: '2.2em', fontWeight: '800', margin: '0 0 10px 0', color: '#fff', letterSpacing: '1px', lineHeight: '1.3'
    },
    controls: {
        display: 'flex', alignItems: 'center', gap: '30px', marginTop: '30px'
    },
    iconButton: {
        width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #40444b',
        backgroundColor: 'transparent', color: '#b9bbbe', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
    },
    micButton: {
        width: '80px', height: '80px', borderRadius: '50%', border: 'none', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        boxShadow: '0 5px 20px rgba(0,0,0,0.4)', transition: 'all 0.1s ease'
    },
    hint: { marginTop: '20px', color: '#72767d', fontSize: '0.9em' },

    bottomNav: { marginTop: '50px' },
    skipButton: {
        background: 'transparent', border: 'none', color: '#b9bbbe', fontSize: '1.1em', fontWeight: '600',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px',
        borderRadius: '8px', transition: 'background 0.2s',
        ':hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
    }
};

export default React.memo(PronunciationPage);

