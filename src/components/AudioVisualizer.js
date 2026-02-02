import React, { useRef, useEffect, memo } from 'react';
import { useVoice } from '../VoiceContext';

/**
 * 🎵 AudioVisualizer - Real-time audio waveform visualization
 * 
 * Props:
 * - type: 'local' | 'remote' - Which audio to visualize
 * - username: string - For remote, which user's audio (optional)
 * - width: number - Canvas width (default: 150)
 * - height: number - Canvas height (default: 40)
 * - barWidth: number - Width of each bar (default: 3)
 * - barGap: number - Gap between bars (default: 1)
 * - color: string - Bar color (default: gradient)
 * - style: 'bars' | 'wave' | 'circle' - Visualization style
 */
const AudioVisualizer = memo(({
    type = 'local',
    username = null,
    width = 150,
    height = 40,
    barWidth = 3,
    barGap = 1,
    color = null,
    style = 'bars',
    className = ''
}) => {
    const canvasRef = useRef(null);
    const { audioVisualizerData, isVisualizerEnabled, isInVoice, isTalking } = useVoice();

    useEffect(() => {
        if (!isVisualizerEnabled || !isInVoice) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // High DPI support
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Get appropriate data
        let data;
        if (type === 'local') {
            data = audioVisualizerData.local;
        } else if (type === 'remote' && username) {
            data = audioVisualizerData.remote[username] || new Uint8Array(128);
        } else {
            data = new Uint8Array(128);
        }

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Create gradient if no color specified
        let fillColor;
        if (color) {
            fillColor = color;
        } else {
            const gradient = ctx.createLinearGradient(0, 0, width, 0);
            if (isTalking && type === 'local') {
                // Talking gradient (green)
                gradient.addColorStop(0, '#22c55e');
                gradient.addColorStop(0.5, '#4ade80');
                gradient.addColorStop(1, '#86efac');
            } else {
                // Normal gradient (brand colors)
                gradient.addColorStop(0, '#6366f1');
                gradient.addColorStop(0.5, '#8b5cf6');
                gradient.addColorStop(1, '#a855f7');
            }
            fillColor = gradient;
        }

        ctx.fillStyle = fillColor;

        if (style === 'bars') {
            // Bar visualization
            const barCount = Math.floor(width / (barWidth + barGap));
            const step = Math.floor(data.length / barCount);

            for (let i = 0; i < barCount; i++) {
                const value = data[i * step] || 0;
                const barHeight = (value / 255) * height * 0.9;
                const x = i * (barWidth + barGap);
                const y = (height - barHeight) / 2;

                // Rounded bars
                ctx.beginPath();
                ctx.roundRect(x, y, barWidth, barHeight || 2, 1);
                ctx.fill();
            }
        } else if (style === 'wave') {
            // Waveform visualization
            ctx.beginPath();
            ctx.moveTo(0, height / 2);

            const sliceWidth = width / data.length;
            let x = 0;

            for (let i = 0; i < data.length; i++) {
                const value = data[i] / 255;
                const y = (value * height * 0.8) / 2 + height / 4;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }

            ctx.lineTo(width, height / 2);
            ctx.strokeStyle = fillColor;
            ctx.lineWidth = 2;
            ctx.stroke();
        } else if (style === 'circle') {
            // Circular visualization
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 3;

            ctx.beginPath();

            for (let i = 0; i < data.length; i++) {
                const value = data[i] / 255;
                const angle = (i / data.length) * Math.PI * 2;
                const r = radius + value * radius * 0.5;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.closePath();
            ctx.strokeStyle = fillColor;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }, [audioVisualizerData, isVisualizerEnabled, isInVoice, isTalking, type, username, width, height, barWidth, barGap, color, style]);

    if (!isVisualizerEnabled || !isInVoice) {
        return null;
    }

    return (
        <canvas
            ref={canvasRef}
            className={`audio-visualizer ${className}`}
            style={{
                display: 'block',
                borderRadius: '4px',
            }}
        />
    );
});

AudioVisualizer.displayName = 'AudioVisualizer';

/**
 * 🎵 MiniVisualizer - Compact 3-bar indicator for user avatars
 */
export const MiniVisualizer = memo(({ username, isTalking = false, size = 16 }) => {
    const { audioVisualizerData, isVisualizerEnabled, isInVoice } = useVoice();

    if (!isVisualizerEnabled || !isInVoice) {
        return null;
    }

    // Get audio level
    const data = username
        ? audioVisualizerData.remote[username]
        : audioVisualizerData.local;

    const level = data
        ? Math.max(...Array.from(data.slice(0, 20))) / 255
        : 0;

    const barHeights = [
        Math.max(3, level * size * 0.6),
        Math.max(4, level * size),
        Math.max(3, level * size * 0.7)
    ];

    return (
        <div
            className="mini-visualizer"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2px',
                height: size,
                padding: '0 2px'
            }}
        >
            {barHeights.map((h, i) => (
                <div
                    key={i}
                    style={{
                        width: 3,
                        height: h,
                        backgroundColor: isTalking ? '#22c55e' : '#6366f1',
                        borderRadius: 1,
                        transition: 'height 50ms ease-out'
                    }}
                />
            ))}
        </div>
    );
});

MiniVisualizer.displayName = 'MiniVisualizer';

export default AudioVisualizer;
