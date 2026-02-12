import React, { useState, useEffect, useRef } from 'react';

const SettingsModal = ({
    audioSettings,
    vadSensitivity,
    isNoiseSuppressionEnabled,
    screenShareQuality,
    screenShareFPS,
    onClose,
    onSave,
    onVadChange,
    onNoiseToggle,
    onScreenQualityChange,
    onScreenFPSChange
}) => {
    const [settings, setSettings] = useState(audioSettings);
    const [tempVadSensitivity, setTempVadSensitivity] = useState(vadSensitivity);
    const [tempScreenQuality, setTempScreenQuality] = useState(screenShareQuality);
    const [tempScreenFPS, setTempScreenFPS] = useState(screenShareFPS);

    // 🔥 YENİ: Microphone Test
    const [micLevel, setMicLevel] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const testStreamRef = React.useRef(null);
    const analyserRef = React.useRef(null);
    const animationRef = React.useRef(null);

    // 🔥 YENİ: Microphone Test Start/Stop
    React.useEffect(() => {
        if (!isTesting) {
            // Stop testing
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (testStreamRef.current) {
                testStreamRef.current.getTracks().forEach(track => track.stop());
                testStreamRef.current = null;
            }
            setMicLevel(0);
            return;
        }

        // Start testing
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                testStreamRef.current = stream;

                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;
                analyser.smoothingTimeConstant = 0.8;
                analyserRef.current = analyser;

                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const updateLevel = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setMicLevel(Math.min(100, average * 1.5)); // Scale to 0-100
                    animationRef.current = requestAnimationFrame(updateLevel);
                };

                updateLevel();
            } catch (err) {
                console.error('Mic test error:', err);
                setIsTesting(false);
            }
        })();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (testStreamRef.current) {
                testStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [isTesting]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px', // Ekrana yapışmasın
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                borderRadius: '16px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh', // Ekran yüksekliğinin %90'ı
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden', // Taşma kontrolü
            }}>
                {/* Header - Sabit */}
                <div style={{
                    padding: '24px 32px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    flexShrink: 0, // Küçülmesin
                }}>
                    <h2 style={{
                        color: '#fff',
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 700,
                    }}>
                        ⚙️ Ses Ayarları
                    </h2>
                </div>

                {/* Content - Kaydırılabilir */}
                <div style={{
                    padding: '24px 32px',
                    overflowY: 'auto', // Dikey kaydırma
                    flex: 1, // Kalan alanı kaplasın
                }}>
                    {/* 🔥 YENİ: Microphone Test Panel */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        border: isTesting ? '2px solid #43b581' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                🎤 Mikrofon Testi
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                                Mikrofonunuzun çalışıp çalışmadığını test edin
                            </div>
                        </div>

                        <button
                            onClick={() => setIsTesting(!isTesting)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                background: isTesting ? '#43b581' : '#5865f2',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                marginBottom: '12px',
                            }}
                        >
                            {isTesting ? '⏹️ Testi Durdur' : '▶️ Testi Başlat'}
                        </button>

                        {isTesting && (
                            <div>
                                <div style={{
                                    height: '8px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    marginBottom: '8px',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${micLevel}%`,
                                        background: micLevel > 70 ? '#43b581' : micLevel > 40 ? '#faa61a' : '#ed4245',
                                        borderRadius: '4px',
                                        transition: 'width 0.1s ease',
                                    }} />
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: micLevel > 10 ? '#43b581' : '#ed4245',
                                    textAlign: 'center',
                                    fontWeight: 600,
                                }}>
                                    {micLevel > 10 ? '✅ Mikrofonunuz çalışıyor!' : '⚠️ Konuşun veya ses yapın'}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Echo Cancellation */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            color: '#fff',
                        }}>
                            <input
                                type="checkbox"
                                checked={settings.echoCancellation}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    echoCancellation: e.target.checked
                                })}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>
                                    🔊 Yankı Engelleme
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    marginTop: '4px',
                                }}>
                                    Hoparlörden gelen sesi mikrofona almaz
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Noise Suppression */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            color: '#fff',
                        }}>
                            <input
                                type="checkbox"
                                checked={isNoiseSuppressionEnabled}
                                onChange={() => onNoiseToggle && onNoiseToggle()}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>
                                    🎙️ Gürültü Engelleme
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    marginTop: '4px',
                                }}>
                                    Arka plan gürültüsünü azaltır (Klavye, fan vb.)
                                    <br />
                                    <span style={{ color: '#ff9800', fontWeight: 600 }}>
                                        ⚠️ Müzik paylaşırken kapatın!
                                    </span>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* 🔥 YENİ: Push-to-Talk Mode */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                🎙️ Ses Modu
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
                                Voice Activity veya Push-to-Talk
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <select
                                value={audioSettings?.pttMode ? 'ptt' : 'voice'}
                                onChange={(e) => {
                                    const isPtt = e.target.value === 'ptt';
                                    setSettings({ ...settings, pttMode: isPtt });
                                    togglePTTMode && togglePTTMode();
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: '#2b2d31',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="voice">🎤 Voice Activity (Otomatik)</option>
                                <option value="ptt">⌨️ Push-to-Talk (Tuşa basınca)</option>
                            </select>
                        </div>

                        {audioSettings?.pttMode && (
                            <div style={{ marginTop: '12px' }}>
                                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                                    ⌨️ PTT Tuşu:
                                </div>
                                <select
                                    value={audioSettings?.pttKey || 'Space'}
                                    onChange={(e) => {
                                        setSettings({ ...settings, pttKey: e.target.value });
                                        updatePTTKey && updatePTTKey(e.target.value);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        background: '#2b2d31',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <option value="Space">Space (Boşluk)</option>
                                    <option value="ControlLeft">Ctrl (Sol)</option>
                                    <option value="ControlRight">Ctrl (Sağ)</option>
                                    <option value="ShiftLeft">Shift (Sol)</option>
                                    <option value="AltLeft">Alt (Sol)</option>
                                    <option value="KeyV">V</option>
                                    <option value="KeyC">C</option>
                                </select>
                                <div style={{ fontSize: '11px', color: '#43b581', marginTop: '6px', textAlign: 'center' }}>
                                    ℹ️ Tuşa basılı tutunca konuşursunuz
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 🔥 YENİ: VAD Sensitivity Slider */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                🎚️ Mikrofon Hassasiyeti
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.6)',
                            }}>
                                Konuşma algılama eşiği (Düşük = Hassas, Yüksek = Az Hassas)
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ color: '#fff', fontSize: '14px' }}>20</span>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                value={tempVadSensitivity}
                                onChange={(e) => {
                                    setTempVadSensitivity(parseInt(e.target.value));
                                    onVadChange && onVadChange(parseInt(e.target.value));
                                }}
                                style={{
                                    flex: 1,
                                    height: '6px',
                                    borderRadius: '3px',
                                    outline: 'none',
                                    background: `linear-gradient(to right, #5865f2 0%, #5865f2 ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) ${((tempVadSensitivity - 20) / 60) * 100}%, rgba(255,255,255,0.2) 100%)`,
                                    cursor: 'pointer'
                                }}
                            />
                            <span style={{ color: '#fff', fontSize: '14px' }}>80</span>
                            <span style={{
                                color: '#5865f2',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                minWidth: '40px',
                                textAlign: 'right'
                            }}>
                                {tempVadSensitivity}
                            </span>
                        </div>
                        <div style={{
                            marginTop: '8px',
                            fontSize: '12px',
                            color: tempVadSensitivity < 35
                                ? '#ff9800'
                                : tempVadSensitivity > 60
                                    ? '#ff9800'
                                    : '#43b581',
                            textAlign: 'center'
                        }}>
                            {tempVadSensitivity < 35
                                ? '⚠️ Çok hassas - False positive olabilir'
                                : tempVadSensitivity > 60
                                    ? '⚠️ Az hassas - Konuşma algılanmayabilir'
                                    : '✅ Optimal hassasiyet'}
                        </div>
                    </div>

                    {/* 🔥 YENİ: Screen Share Quality */}
                    <div style={{
                        marginBottom: '20px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ marginBottom: '12px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                                📺 Ekran Paylaşımı Kalitesi
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.6)',
                            }}>
                                Yüksek kalite = Daha fazla bandwidth
                            </div>
                        </div>

                        {/* Quality Selector */}
                        <div style={{ marginBottom: '12px' }}>
                            <select
                                value={tempScreenQuality}
                                onChange={(e) => {
                                    setTempScreenQuality(e.target.value);
                                    onScreenQualityChange && onScreenQualityChange(e.target.value);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: '#2b2d31',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="720p">720p (HD) - Az bandwidth</option>
                                <option value="1080p">1080p (Full HD) - Önerilen ✅</option>
                                <option value="4K">4K (Ultra HD) - Çok bandwidth</option>
                            </select>
                        </div>

                        {/* FPS Slider */}
                        <div style={{ marginBottom: '8px', color: '#fff' }}>
                            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '8px' }}>
                                🎬 FPS: {tempScreenFPS}
                            </div>
                            <input
                                type="range"
                                min="15"
                                max="60"
                                step="15"
                                value={tempScreenFPS}
                                onChange={(e) => {
                                    const v = parseInt(e.target.value);
                                    setTempScreenFPS(v);
                                    onScreenFPSChange && onScreenFPSChange(v);
                                }}
                                style={{
                                    width: '100%',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: tempScreenFPS === 30 ? '#43b581' : '#faa61a',
                            textAlign: 'center',
                        }}>
                            {tempScreenFPS === 30 ? '✅ Optimal (Önerilen)' : tempScreenFPS < 30 ? '⚠️ Düşük FPS' : '⚠️ Yüksek bandwidth'}
                        </div>

                        {/* 🔥 YENİ: System Audio Checkbox */}
                        <div style={{ marginTop: '12px' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                color: '#fff',
                                fontSize: '14px',
                            }}>
                                <input
                                    type="checkbox"
                                    checked={audioSettings?.includeSystemAudio || false}
                                    onChange={(e) => {
                                        setSettings({ ...settings, includeSystemAudio: e.target.checked });
                                        toggleSystemAudio && toggleSystemAudio(e.target.checked);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span>🔊 Sistem sesini dahil et (Oyun/Video sesi)</span>
                            </label>
                        </div>
                    </div>

                    {/* Auto Gain Control */}
                    <div style={{
                        marginBottom: '32px',
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            cursor: 'pointer',
                            color: '#fff',
                        }}>
                            <input
                                type="checkbox"
                                checked={settings.autoGainControl}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    autoGainControl: e.target.checked
                                })}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    cursor: 'pointer',
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>
                                    📊 Otomatik Ses Seviyesi
                                </div>
                                <div style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    marginTop: '4px',
                                }}>
                                    Ses seviyesini otomatik ayarlar
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Footer - Sabit butonlar */}
                <div style={{
                    padding: '20px 32px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    flexShrink: 0,
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end',
                    background: 'rgba(0, 0, 0, 0.2)',
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        İptal
                    </button>
                    <button
                        onClick={() => onSave(settings)}
                        style={{
                            background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 24px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 600,
                            boxShadow: '0 4px 16px rgba(88, 101, 242, 0.4)',
                        }}
                    >
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
