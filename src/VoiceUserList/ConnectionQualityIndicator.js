// frontend/src/VoiceUserList/ConnectionQualityIndicator.js
import React from 'react';

/**
 * 🔥 Bağlantı Kalitesi Göstergesi — sinyal çubukları (1-4 bar)
 * 
 * Props:
 *   - quality: 'excellent' | 'good' | 'fair' | 'poor' | undefined
 *   - rtt: RTT (ms)
 *   - packetLossRate: paket kaybı (%)
 *   - qualityScore: 0-100
 *   - size: piksel boyutu (varsayılan 16)
 */
const qualityConfig = {
    excellent: { bars: 4, color: '#23a559', label: 'Mükemmel' },
    good: { bars: 3, color: '#7BC96F', label: 'İyi' },
    fair: { bars: 2, color: '#f0b232', label: 'Orta' },
    poor: { bars: 1, color: '#f23f42', label: 'Zayıf' },
};

const ConnectionQualityIndicator = ({ quality, rtt, packetLossRate, qualityScore, size = 16 }) => {
    if (!quality) return null;

    const config = qualityConfig[quality] || qualityConfig.poor;
    const barWidth = Math.max(2, size / 6);
    const barGap = 1;
    const totalWidth = (barWidth + barGap) * 4;

    // Tooltip bilgisi
    const tooltip = [
        config.label,
        rtt != null ? `RTT: ${Math.round(rtt)}ms` : null,
        packetLossRate != null ? `Kayıp: ${packetLossRate.toFixed(1)}%` : null,
        qualityScore != null ? `Skor: ${qualityScore}/100` : null,
    ].filter(Boolean).join(' | ');

    return (
        <div
            title={tooltip}
            style={{
                display: 'inline-flex',
                alignItems: 'flex-end',
                width: totalWidth,
                height: size,
                marginLeft: 4,
                cursor: 'default',
            }}
        >
            {[1, 2, 3, 4].map(barIndex => {
                const isActive = barIndex <= config.bars;
                const barHeight = (barIndex / 4) * size;
                return (
                    <div
                        key={barIndex}
                        style={{
                            width: barWidth,
                            height: barHeight,
                            marginRight: barIndex < 4 ? barGap : 0,
                            borderRadius: 1,
                            backgroundColor: isActive ? config.color : 'rgba(255,255,255,0.15)',
                            transition: 'background-color 0.3s ease',
                        }}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(ConnectionQualityIndicator);
