// frontend/src/components/VoiceEffectsPanel.js - FEATURE #18
import React, { useState } from 'react';
import { FaMicrophone, FaRobot, FaChild, FaMale } from 'react-icons/fa';

const VoiceEffectsPanel = ({ onEffectChange }) => {
    const [activeEffect, setActiveEffect] = useState('none');

    const effects = [
        { id: 'none', name: 'Normal', icon: FaMicrophone, color: '#5865f2' },
        { id: 'robot', name: 'Robot', icon: FaRobot, color: '#f0b132' },
        { id: 'chipmunk', name: 'Chipmunk', icon: FaChild, color: '#23a559' },
        { id: 'deep', name: 'Derin Ses', icon: FaMale, color: '#da373c' }
    ];

    const handleEffectClick = (effectId) => {
        setActiveEffect(effectId);
        onEffectChange(effectId);
    };

    return (
        <div style={styles.container}>
            <h4 style={styles.title}>Ses Efektleri</h4>
            <div style={styles.effects}>
                {effects.map(effect => {
                    const Icon = effect.icon;
                    return (
                        <button
                            key={effect.id}
                            onClick={() => handleEffectClick(effect.id)}
                            style={{
                                ...styles.effectButton,
                                ...(activeEffect === effect.id ? { ...styles.effectButtonActive, borderColor: effect.color, backgroundColor: effect.color + '20' } : {})
                            }}
                        >
                            <Icon style={{ color: activeEffect === effect.id ? effect.color : '#72767d', fontSize: '24px' }} />
                            <span style={styles.effectName}>{effect.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '16px', backgroundColor: '#2b2d31', borderRadius: '8px' },
    title: { color: '#fff', fontSize: '14px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: '600' },
    effects: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },
    effectButton: { padding: '16px', backgroundColor: '#1e1f22', border: '2px solid transparent', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'all 0.2s' },
    effectButtonActive: { transform: 'scale(1.05)' },
    effectName: { color: '#b9bbbe', fontSize: '13px', fontWeight: '500' }
};

export default VoiceEffectsPanel;



