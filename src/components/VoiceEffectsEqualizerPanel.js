// frontend/src/components/VoiceEffectsEqualizerPanel.js - Complete Voice Effects & Equalizer UI
import React, { useState, useEffect } from 'react';
import {
    FaMicrophone, FaRobot, FaMale, FaFemale, FaChild, FaGhost,
    FaVolumeLow, FaVolumeHigh, FaSlidersH, FaTimes, FaCheck,
    FaMusic, FaHeadphones, FaSave, FaUndo, FaMagic, FaWaveSquare
} from 'react-icons/fa';
import toast from '../utils/toast';
import './VoiceEffectsEqualizerPanel.css';

const VoiceEffectsEqualizerPanel = ({ roomId, apiBaseUrl, onClose }) => {
    const [activeTab, setActiveTab] = useState('effects'); // 'effects', 'equalizer', 'presets'
    const [activeEffect, setActiveEffect] = useState('none');
    const [effectIntensity, setEffectIntensity] = useState(50);
    const [equalizerBands, setEqualizerBands] = useState({
        '60Hz': 0,
        '170Hz': 0,
        '310Hz': 0,
        '600Hz': 0,
        '1kHz': 0,
        '3kHz': 0,
        '6kHz': 0,
        '12kHz': 0,
        '14kHz': 0,
        '16kHz': 0
    });
    const [selectedPreset, setSelectedPreset] = useState(null);
    const [loading, setLoading] = useState(false);

    const voiceEffects = [
        { id: 'none', name: 'Normal', icon: FaMicrophone, color: '#5865f2', description: 'Doğal ses' },
        { id: 'robot', name: 'Robot', icon: FaRobot, color: '#f0b132', description: 'Mekanik robot sesi' },
        { id: 'deep', name: 'Derin Ses', icon: FaMale, color: '#da373c', description: 'Daha kalın ses' },
        { id: 'high', name: 'İnce Ses', icon: FaFemale, color: '#eb459e', description: 'Daha tiz ses' },
        { id: 'chipmunk', name: 'Chipmunk', icon: FaChild, color: '#23a559', description: 'Hızlı ve tiz' },
        { id: 'echo', name: 'Eko', icon: FaGhost, color: '#8b5cf6', description: 'Yankılı ses' },
        { id: 'radio', name: 'Radyo', icon: FaMusic, color: '#3ba55c', description: 'Eski radyo efekti' },
        { id: 'underwater', name: 'Su Altı', icon: FaWaveSquare, color: '#00b0f0', description: 'Boğuk su sesi' }
    ];

    const equalizerPresets = [
        { id: 'flat', name: 'Düz', bands: { '60Hz': 0, '170Hz': 0, '310Hz': 0, '600Hz': 0, '1kHz': 0, '3kHz': 0, '6kHz': 0, '12kHz': 0, '14kHz': 0, '16kHz': 0 } },
        { id: 'bass_boost', name: 'Bass Boost', bands: { '60Hz': 8, '170Hz': 6, '310Hz': 4, '600Hz': 2, '1kHz': 0, '3kHz': 0, '6kHz': 0, '12kHz': 0, '14kHz': 0, '16kHz': 0 } },
        { id: 'treble_boost', name: 'Treble Boost', bands: { '60Hz': 0, '170Hz': 0, '310Hz': 0, '600Hz': 0, '1kHz': 2, '3kHz': 4, '6kHz': 6, '12kHz': 8, '14kHz': 8, '16kHz': 8 } },
        { id: 'voice_clarity', name: 'Ses Netliği', bands: { '60Hz': -2, '170Hz': 0, '310Hz': 2, '600Hz': 4, '1kHz': 6, '3kHz': 6, '6kHz': 4, '12kHz': 2, '14kHz': 0, '16kHz': -2 } },
        { id: 'studio', name: 'Stüdyo', bands: { '60Hz': 2, '170Hz': 1, '310Hz': 0, '600Hz': 0, '1kHz': 2, '3kHz': 3, '6kHz': 4, '12kHz': 3, '14kHz': 2, '16kHz': 1 } },
        { id: 'podcast', name: 'Podcast', bands: { '60Hz': -4, '170Hz': -2, '310Hz': 0, '600Hz': 2, '1kHz': 4, '3kHz': 5, '6kHz': 4, '12kHz': 2, '14kHz': 0, '16kHz': -2 } },
        { id: 'gaming', name: 'Oyun', bands: { '60Hz': 4, '170Hz': 2, '310Hz': 0, '600Hz': 0, '1kHz': 2, '3kHz': 4, '6kHz': 6, '12kHz': 4, '14kHz': 2, '16kHz': 0 } },
        { id: 'music', name: 'Müzik', bands: { '60Hz': 4, '170Hz': 2, '310Hz': 0, '600Hz': 0, '1kHz': 0, '3kHz': 2, '6kHz': 4, '12kHz': 4, '14kHz': 4, '16kHz': 2 } }
    ];

    useEffect(() => {
        fetchCurrentSettings();
    }, [roomId]);

    const fetchCurrentSettings = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/voice/${roomId}/effects/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setActiveEffect(data.current_effect || 'none');
                setEffectIntensity(data.intensity || 50);
                if (data.equalizer) {
                    setEqualizerBands(data.equalizer);
                }
            }
        } catch (error) {
            console.error('Fetch settings error:', error);
        }
    };

    const handleApplyEffect = async (effectId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/voice/${roomId}/effect/apply/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    effect: effectId,
                    intensity: effectIntensity
                })
            });

            if (response.ok) {
                setActiveEffect(effectId);
                const effectName = voiceEffects.find(e => e.id === effectId)?.name || effectId;
                toast.success(`✨ ${effectName} efekti uygulandı!`);
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Efekt uygulanamadı');
            }
        } catch (error) {
            console.error('Apply effect error:', error);
            toast.error('❌ Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveEffect = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/voice/${roomId}/effect/remove/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setActiveEffect('none');
                toast.success('✅ Efekt kaldırıldı');
            }
        } catch (error) {
            console.error('Remove effect error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEqualizerChange = (band, value) => {
        setEqualizerBands(prev => ({
            ...prev,
            [band]: parseInt(value)
        }));
        setSelectedPreset(null);
    };

    const handleApplyEqualizer = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/voice/${roomId}/equalizer/apply/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ bands: equalizerBands })
            });

            if (response.ok) {
                toast.success('✅ Equalizer ayarları uygulandı!');
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Equalizer uygulanamadı');
            }
        } catch (error) {
            console.error('Apply equalizer error:', error);
            toast.error('❌ Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyPreset = async (preset) => {
        setEqualizerBands(preset.bands);
        setSelectedPreset(preset.id);

        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/voice/${roomId}/equalizer/preset/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ preset: preset.id })
            });

            if (response.ok) {
                toast.success(`✅ ${preset.name} preset'i uygulandı!`);
            }
        } catch (error) {
            console.error('Apply preset error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleResetEqualizer = () => {
        const flatBands = { '60Hz': 0, '170Hz': 0, '310Hz': 0, '600Hz': 0, '1kHz': 0, '3kHz': 0, '6kHz': 0, '12kHz': 0, '14kHz': 0, '16kHz': 0 };
        setEqualizerBands(flatBands);
        setSelectedPreset('flat');
    };

    return (
        <div className="voice-effects-overlay" onClick={onClose}>
            <div className="voice-effects-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2>🎙️ Ses Efektleri & Equalizer</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeTab === 'effects' ? 'active' : ''}`}
                        onClick={() => setActiveTab('effects')}
                    >
                        <FaMagic /> Ses Efektleri
                    </button>
                    <button
                        className={`tab ${activeTab === 'equalizer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('equalizer')}
                    >
                        <FaSlidersH /> Equalizer
                    </button>
                    <button
                        className={`tab ${activeTab === 'presets' ? 'active' : ''}`}
                        onClick={() => setActiveTab('presets')}
                    >
                        <FaHeadphones /> Presetler
                    </button>
                </div>

                <div className="panel-content">
                    {/* Voice Effects Tab */}
                    {activeTab === 'effects' && (
                        <div className="effects-tab">
                            <div className="current-effect">
                                <span>Aktif Efekt:</span>
                                <strong>
                                    {voiceEffects.find(e => e.id === activeEffect)?.name || 'Yok'}
                                </strong>
                                {activeEffect !== 'none' && (
                                    <button
                                        className="remove-effect-btn"
                                        onClick={handleRemoveEffect}
                                        disabled={loading}
                                    >
                                        Kaldır
                                    </button>
                                )}
                            </div>

                            <div className="intensity-control">
                                <label>Efekt Yoğunluğu: {effectIntensity}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={effectIntensity}
                                    onChange={(e) => setEffectIntensity(parseInt(e.target.value))}
                                    className="intensity-slider"
                                />
                            </div>

                            <div className="effects-grid">
                                {voiceEffects.map(effect => {
                                    const Icon = effect.icon;
                                    const isActive = activeEffect === effect.id;
                                    return (
                                        <div
                                            key={effect.id}
                                            className={`effect-card ${isActive ? 'active' : ''}`}
                                            style={{ '--effect-color': effect.color }}
                                            onClick={() => handleApplyEffect(effect.id)}
                                        >
                                            <div className="effect-icon">
                                                <Icon />
                                            </div>
                                            <div className="effect-info">
                                                <h4>{effect.name}</h4>
                                                <p>{effect.description}</p>
                                            </div>
                                            {isActive && (
                                                <div className="active-badge">
                                                    <FaCheck />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Equalizer Tab */}
                    {activeTab === 'equalizer' && (
                        <div className="equalizer-tab">
                            <div className="equalizer-header">
                                <h3>10-Band Equalizer</h3>
                                <div className="eq-actions">
                                    <button
                                        className="reset-btn"
                                        onClick={handleResetEqualizer}
                                    >
                                        <FaUndo /> Sıfırla
                                    </button>
                                    <button
                                        className="apply-btn"
                                        onClick={handleApplyEqualizer}
                                        disabled={loading}
                                    >
                                        <FaSave /> Uygula
                                    </button>
                                </div>
                            </div>

                            <div className="equalizer-visualizer">
                                {Object.entries(equalizerBands).map(([band, value]) => (
                                    <div key={band} className="eq-band">
                                        <div className="band-slider-container">
                                            <div
                                                className="band-value-indicator"
                                                style={{
                                                    height: `${((value + 12) / 24) * 100}%`,
                                                    background: value > 0 ? '#23a559' : value < 0 ? '#da373c' : '#5865f2'
                                                }}
                                            />
                                            <input
                                                type="range"
                                                min="-12"
                                                max="12"
                                                value={value}
                                                onChange={(e) => handleEqualizerChange(band, e.target.value)}
                                                className="band-slider"
                                                orient="vertical"
                                            />
                                        </div>
                                        <span className="band-value">{value > 0 ? `+${value}` : value}</span>
                                        <span className="band-label">{band}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="eq-info">
                                <p>💡 Düşük frekanslar (sol) bas seslerini, yüksek frekanslar (sağ) tiz sesleri kontrol eder.</p>
                            </div>
                        </div>
                    )}

                    {/* Presets Tab */}
                    {activeTab === 'presets' && (
                        <div className="presets-tab">
                            <h3>Hazır Presetler</h3>
                            <p className="presets-desc">Hızlıca equalizer ayarı yapmak için bir preset seçin.</p>

                            <div className="presets-grid">
                                {equalizerPresets.map(preset => (
                                    <div
                                        key={preset.id}
                                        className={`preset-card ${selectedPreset === preset.id ? 'active' : ''}`}
                                        onClick={() => handleApplyPreset(preset)}
                                    >
                                        <div className="preset-visual">
                                            {Object.values(preset.bands).map((value, idx) => (
                                                <div
                                                    key={idx}
                                                    className="preset-bar"
                                                    style={{
                                                        height: `${((value + 12) / 24) * 100}%`,
                                                        background: value > 0 ? '#23a559' : value < 0 ? '#da373c' : '#5865f2'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span className="preset-name">{preset.name}</span>
                                        {selectedPreset === preset.id && (
                                            <div className="selected-badge">
                                                <FaCheck />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VoiceEffectsEqualizerPanel;
