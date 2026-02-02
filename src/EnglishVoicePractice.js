// frontend/src/EnglishVoicePractice.js

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaArrowLeft, FaRobot, FaUser, FaStop } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import toast from './utils/toast';

const EnglishVoicePractice = ({ apiBaseUrl }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState([]); // { sender: 'user' | 'ai', text: '...' }
    const [processing, setProcessing] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const messagesEndRef = useRef(null);

    // AuthContext'ten token'ı çekiyoruz
    const { token } = useAuth();

    // Mesaj gelince en alta kaydır
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, processing]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = handleStop;
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            toast.error("❌ Mikrofon izni gerekli!");
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

        // Sesi Backend'e Gönder
        const formData = new FormData();
        formData.append('audio', audioBlob, 'voice.webm');

        try {
            // AI Sohbet Endpoint'ine istek atıyoruz
            const res = await fetch(`${apiBaseUrl}/eng-learn/voice-chat/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Content-Type EKLENMEMELİDİR (FormData otomatik ekler)
                },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();

                // 1. Mesajları ekle
                setMessages(prev => [
                    ...prev,
                    { sender: 'user', text: data.user_text },
                    { sender: 'ai', text: data.ai_text }
                ]);

                // 2. Sesi Çal (Base64'ten)
                const audio = new Audio(`data:audio/mp3;base64,${data.audio_base64}`);
                audio.play();
            } else {
                console.error("Sunucu hatası:", res.status);
                toast.error("❌ Anlaşılamadı veya hata oluştu.");
            }
        } catch (e) {
            console.error(e);
            toast.error("❌ Bağlantı hatası.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Link to="/eng-learn" style={styles.backBtn}><FaArrowLeft /> Geri</Link>
                <h2>AI ile Konuş (Speaking)</h2>
            </div>

            <div style={styles.chatArea}>
                {messages.length === 0 && (
                    <div style={styles.emptyState}>
                        <FaRobot size={60} color="#5865f2" style={{marginBottom: 20}} />
                        <h3>İngilizce Pratik Yap</h3>
                        <p>Mikrofona basılı tut ve konuşmaya başla.</p>
                        <small style={{color: '#72767d'}}>"Hello, how are you?" diyebilirsin.</small>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div key={i} style={{
                        ...styles.messageBubble,
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: msg.sender === 'user' ? '#5865f2' : '#2b2d31',
                        color: 'white',
                        borderBottomRightRadius: msg.sender === 'user' ? '0' : '12px',
                        borderBottomLeftRadius: msg.sender === 'ai' ? '0' : '12px',
                    }}>
                        <div style={styles.msgHeader}>
                            {msg.sender === 'user' ? <FaUser size={12}/> : <FaRobot size={12}/>}
                            <span style={{marginLeft: 5, fontSize:'0.8em', fontWeight: 'bold'}}>{msg.sender === 'user' ? 'Sen' : 'AI Öğretmen'}</span>
                        </div>
                        {msg.text}
                    </div>
                ))}

                {processing && (
                    <div style={{alignSelf: 'flex-start', color:'#949ba4', marginLeft: 10, fontStyle: 'italic'}}>
                        Yazıyor ve seslendiriyor...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div style={styles.controls}>
                <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    style={{
                        ...styles.micButton,
                        backgroundColor: isRecording ? '#f04747' : '#5865f2',
                        transform: isRecording ? 'scale(1.1)' : 'scale(1)'
                    }}
                >
                    {isRecording ? <FaStop size={24} /> : <FaMicrophone size={30} />}
                </button>
                <p style={{marginTop: 15, color: '#949ba4', fontSize: '0.9em'}}>
                    {isRecording ? 'Dinliyor... (Bırakınca Gönderir)' : 'Basılı Tut ve Konuş'}
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#313338', color: 'white',
        padding: '20px', boxSizing: 'border-box', fontFamily: 'Poppins, sans-serif'
    },
    header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #1f2023', paddingBottom: '15px' },
    backBtn: { color: '#b9bbbe', fontSize: '1em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' },

    chatArea: {
        flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '20px',
        paddingRight: '5px' // Scrollbar için
    },
    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#949ba4', opacity: 0.8, textAlign: 'center' },

    messageBubble: {
        maxWidth: '85%', padding: '15px', borderRadius: '12px', fontSize: '1em', lineHeight: '1.5',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', position: 'relative'
    },
    msgHeader: { display: 'flex', alignItems: 'center', marginBottom: '5px', opacity: 0.8 },

    controls: { display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid #1f2023' },
    micButton: {
        width: '80px', height: '80px', borderRadius: '50%', border: 'none', color: 'white',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        transition: 'all 0.1s ease', boxShadow: '0 5px 20px rgba(0,0,0,0.4)'
    }
};

export default EnglishVoicePractice;

