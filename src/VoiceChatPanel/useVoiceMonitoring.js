// frontend/src/VoiceChatPanel/useVoiceMonitoring.js
// 🎤 Voice Monitoring Custom Hook - Extracted from VoiceChatPanel
// Connection quality, echo detection, network monitoring, volume normalization, talking indicators

import { useState, useEffect, useRef } from 'react';
import logger from '../utils/logger';

/**
 * Custom hook for voice chat monitoring effects.
 *
 * @param {Object} params
 * @param {boolean} params.isInVoice - Whether the user is currently in a voice channel
 * @param {MediaStream|null} params.localAudioStream - Local audio stream reference
 * @param {boolean} params.isMuted - Whether the user is muted
 * @param {Function|null} params.startStatsMonitoring - Start WebRTC stats monitoring (from VoiceContext)
 * @param {Function|null} params.stopStatsMonitoring - Stop WebRTC stats monitoring (from VoiceContext)
 * @param {string} params.screenShareQuality - Current screen share quality setting
 * @param {Function|null} params.updateScreenQuality - Function to update screen share quality
 */
export default function useVoiceMonitoring({
    isInVoice,
    localAudioStream,
    isMuted,
    startStatsMonitoring,
    stopStatsMonitoring,
    screenShareQuality,
    updateScreenQuality,
}) {
    // ── State ──────────────────────────────────────────────

    // Connection Quality Monitoring
    const [connectionQuality, setConnectionQuality] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Echo Detection
    const [hasEchoRisk, setHasEchoRisk] = useState(false);

    // Network Quality Monitor
    const [networkQuality, setNetworkQuality] = useState('good'); // 'excellent', 'good', 'poor'
    const [networkType, setNetworkType] = useState('unknown');
    const [autoQualityEnabled, setAutoQualityEnabled] = useState(true);

    // Volume Normalization
    // 🔥 FIX: DISABLED by default — Effect #5 was calling createMediaElementSource() on audio elements
    // every 2 seconds, permanently capturing them and then immediately closing the AudioContext.
    // createMediaElementSource can only be called ONCE per element — subsequent calls throw.
    // This destroyed audio routing for UserVideoCard elements and wasted AudioContext resources.
    // The computed normalizedGains are never applied anywhere anyway.
    const [volumeNormalization, setVolumeNormalization] = useState(false);
    const [userAudioLevels, setUserAudioLevels] = useState({}); // Track audio levels per user
    const [normalizedGains, setNormalizedGains] = useState({}); // Auto-adjusted gains

    // Visual Enhancements
    const [talkingIndicators, setTalkingIndicators] = useState({}); // Animated waves when talking
    const [activeSpeaker, setActiveSpeaker] = useState(null); // Currently dominant speaker

    // ── Effect #1: Connection Quality Monitoring (polls WebRTC getStats() every 3s) ──

    useEffect(() => {
        if (!isInVoice) return;

        const monitorConnections = async () => {
            // Use global reference to access peer connections from VoiceContext
            const peerConnections = window.__pawscord_peer_connections__ || {};

            for (const [username, pc] of Object.entries(peerConnections)) {
                if (pc && pc.getStats) {
                    try {
                        const stats = await pc.getStats();
                        stats.forEach((report) => {
                            if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                                setConnectionQuality((prev) => ({
                                    ...prev,
                                    [username]: {
                                        rtt: Math.round((report.currentRoundTripTime || 0) * 1000), // ms
                                        packetLoss:
                                            report.packetsLost && report.packetsSent
                                                ? Math.round(
                                                      (report.packetsLost / report.packetsSent) *
                                                          100 *
                                                          10
                                                  ) / 10
                                                : 0,
                                        quality:
                                            (report.currentRoundTripTime || 0) < 0.1
                                                ? 'excellent'
                                                : (report.currentRoundTripTime || 0) < 0.2
                                                  ? 'good'
                                                  : 'poor',
                                    },
                                }));
                            }
                        });
                    } catch (err) {
                        logger.warn('[Quality] Failed to get stats for', username, err);
                    }
                }
            }
        };

        const interval = setInterval(monitorConnections, 3000);
        monitorConnections(); // First run

        return () => clearInterval(interval);
    }, [isInVoice]);

    // ── Effect #2: WebRTC Stats Monitoring from VoiceContext ──

    useEffect(() => {
        if (isInVoice && startStatsMonitoring) {
            startStatsMonitoring();
        }
        return () => {
            if (stopStatsMonitoring) {
                stopStatsMonitoring();
            }
        };
    }, [isInVoice, startStatsMonitoring, stopStatsMonitoring]);

    // ── Effect #3: Echo Detection (AudioContext frequency analysis every 1s) ──

    useEffect(() => {
        if (!localAudioStream || isMuted || !isInVoice) {
            setHasEchoRisk(false);
            return;
        }

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            analyser.smoothingTimeConstant = 0.8;

            const source = audioContext.createMediaStreamSource(localAudioStream);
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            let consecutiveHighReadings = 0;

            const detectEcho = () => {
                analyser.getByteFrequencyData(dataArray);

                // High frequency feedback detection (2-4 kHz range)
                const highFreqRange = dataArray.slice(80, 160);
                const highFreqPeak = Math.max(...highFreqRange);
                const highFreqAvg = highFreqRange.reduce((a, b) => a + b, 0) / highFreqRange.length;

                // Low frequency (our own voice)
                const lowFreqRange = dataArray.slice(10, 40);
                const lowFreqAvg = lowFreqRange.reduce((a, b) => a + b, 0) / lowFreqRange.length;

                // Echo risk: High frequency too loud AND disproportionate to low frequency
                if (highFreqPeak > 180 && highFreqAvg > 100 && highFreqAvg > lowFreqAvg * 1.5) {
                    consecutiveHighReadings++;
                    if (consecutiveHighReadings > 3) {
                        // 3 seconds in a row
                        setHasEchoRisk(true);
                    }
                } else {
                    consecutiveHighReadings = 0;
                    if (highFreqPeak < 120) {
                        setHasEchoRisk(false);
                    }
                }
            };

            const interval = setInterval(detectEcho, 1000);

            return () => {
                clearInterval(interval);
                source.disconnect();
                audioContext.close();
            };
        } catch (err) {
            logger.warn('[Echo] Detection failed:', err);
        }
    }, [localAudioStream, isMuted, isInVoice]);

    // ── Effect #4: Network Quality Monitoring (Network Info API + auto quality adjust every 10s) ──

    useEffect(() => {
        if (!isInVoice) return;

        // Check if Network Information API is available
        const connection =
            navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        const updateNetworkQuality = () => {
            if (!connection) {
                setNetworkQuality('good');
                setNetworkType('unknown');
                return;
            }

            // Get network type (4g, 3g, wifi, etc.)
            const effectiveType = connection.effectiveType || 'unknown';
            setNetworkType(effectiveType);

            // Get downlink speed (Mbps)
            const downlink = connection.downlink || 10; // Default 10 Mbps
            const rtt = connection.rtt || 50; // Round trip time

            // Determine quality based on network conditions
            let quality = 'good';
            if (effectiveType === '4g' && downlink >= 5 && rtt < 100) {
                quality = 'excellent';
            } else if (effectiveType === 'slow-2g' || downlink < 1 || rtt > 300) {
                quality = 'poor';
            } else if (
                effectiveType === '2g' ||
                effectiveType === '3g' ||
                downlink < 3 ||
                rtt > 150
            ) {
                quality = 'good';
            } else {
                quality = 'excellent';
            }

            setNetworkQuality(quality);

            // Auto-adjust video quality if enabled
            if (autoQualityEnabled && updateScreenQuality) {
                if (quality === 'poor' && screenShareQuality !== '720p') {
                    updateScreenQuality('720p');
                } else if (quality === 'excellent' && screenShareQuality === '720p') {
                    updateScreenQuality('1080p');
                }
            }
        };

        // Initial check
        updateNetworkQuality();

        // Listen for network changes
        if (connection) {
            connection.addEventListener('change', updateNetworkQuality);
        }

        // Periodic check (every 10 seconds)
        const interval = setInterval(updateNetworkQuality, 10000);

        return () => {
            clearInterval(interval);
            if (connection) {
                connection.removeEventListener('change', updateNetworkQuality);
            }
        };
    }, [isInVoice, autoQualityEnabled, screenShareQuality, updateScreenQuality]);

    // ── Effect #5: Volume Normalization & Audio Level Monitoring (every 2s) ──

    useEffect(() => {
        if (!volumeNormalization || !isInVoice) return;

        const monitorAudioLevels = () => {
            const remoteAudios = document.querySelectorAll('audio[data-username]');
            const levels = {};
            const newGains = { ...normalizedGains };

            remoteAudios.forEach((audio) => {
                const username = audio.getAttribute('data-username');
                if (!username) return;

                try {
                    // Create audio context for analysis
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const source = audioContext.createMediaElementSource(audio);
                    const analyser = audioContext.createAnalyser();
                    analyser.fftSize = 256;

                    source.connect(analyser);
                    analyser.connect(audioContext.destination);

                    const dataArray = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(dataArray);

                    // Calculate average audio level
                    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                    levels[username] = average;

                    // Auto-adjust gain for quiet/loud talkers
                    // Target level: 70-100 (good speaking volume)
                    if (average > 0) {
                        if (average < 50) {
                            // Quiet talker - boost volume
                            newGains[username] = Math.min(1.5, (newGains[username] || 1) * 1.05);
                        } else if (average > 120) {
                            // Loud talker - reduce volume
                            newGains[username] = Math.max(0.7, (newGains[username] || 1) * 0.95);
                        }
                    }

                    audioContext.close();
                } catch (err) {
                    // Ignore errors for already connected sources
                    logger.debug('Audio analysis error (expected):', err.message);
                }
            });

            setUserAudioLevels(levels);
            setNormalizedGains(newGains);
        };

        const interval = setInterval(monitorAudioLevels, 2000);
        return () => clearInterval(interval);
    }, [volumeNormalization, isInVoice, normalizedGains]);

    // ── Effect #6: Talking Indicator & Active Speaker Detection (every 100ms) ──

    useEffect(() => {
        if (!isInVoice) return;

        const detectTalking = () => {
            const indicators = {};
            let loudestUser = null;
            let maxLevel = 0;

            // Check all users including self
            Object.entries(userAudioLevels).forEach(([username, level]) => {
                // Talking threshold: 30+ (adjusted for sensitivity)
                if (level > 30) {
                    indicators[username] = true;

                    // Track loudest speaker
                    if (level > maxLevel) {
                        maxLevel = level;
                        loudestUser = username;
                    }
                } else {
                    indicators[username] = false;
                }
            });

            setTalkingIndicators(indicators);

            // Update active speaker (with debounce to avoid flickering)
            if (loudestUser && maxLevel > 50) {
                setActiveSpeaker(loudestUser);
            } else if (maxLevel === 0) {
                // No one talking
                setActiveSpeaker(null);
            }
        };

        const interval = setInterval(detectTalking, 100); // 10 FPS for smooth animation
        return () => clearInterval(interval);
    }, [isInVoice, userAudioLevels]);

    // ── Return ─────────────────────────────────────────────

    return {
        // Connection quality
        connectionQuality,
        setConnectionQuality,

        // Echo detection
        hasEchoRisk,
        setHasEchoRisk,

        // Network quality
        networkQuality,
        setNetworkQuality,
        networkType,
        setNetworkType,
        autoQualityEnabled,
        setAutoQualityEnabled,

        // Volume normalization
        volumeNormalization,
        setVolumeNormalization,
        userAudioLevels,
        setUserAudioLevels,
        normalizedGains,
        setNormalizedGains,

        // Talking indicators & active speaker
        talkingIndicators,
        setTalkingIndicators,
        activeSpeaker,
        setActiveSpeaker,
    };
}
