import { useState, useCallback, useRef, useEffect } from 'react';

export function useAudioVisualizer({ isVisualizerEnabled, localAudioStream, remoteStreams, isInVoice, globalAudioContextRef }) {
    const [audioVisualizerData, setAudioVisualizerData] = useState({
        local: new Uint8Array(128),
        remote: {}
    });
    const visualizerIntervalRef = useRef(null);
    const visualizerAnalyserRef = useRef(null);

    // 📊 YENİ: Start Audio Visualizer
    const startVisualizer = useCallback(() => {
        if (!isVisualizerEnabled || !localAudioStream) return;
        if (visualizerIntervalRef.current) return; // Already running

        try {
            if (!globalAudioContextRef.current) {
                globalAudioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            const audioContext = globalAudioContextRef.current;

            // Local audio analyser
            const localAnalyser = audioContext.createAnalyser();
            localAnalyser.fftSize = 256;
            const localSource = audioContext.createMediaStreamSource(localAudioStream);
            localSource.connect(localAnalyser);
            visualizerAnalyserRef.current = { local: localAnalyser, localSource, remote: {} };

            // Remote audio analysers
            Object.entries(remoteStreams).forEach(([key, stream]) => {
                if (!key.includes('_camera') && !key.includes('_screen')) {
                    const remoteAnalyser = audioContext.createAnalyser();
                    remoteAnalyser.fftSize = 256;
                    const remoteSource = audioContext.createMediaStreamSource(stream);
                    remoteSource.connect(remoteAnalyser);
                    visualizerAnalyserRef.current.remote[key] = { analyser: remoteAnalyser, source: remoteSource };
                }
            });

            // Update interval (60fps = 16.67ms)
            visualizerIntervalRef.current = setInterval(() => {
                const localData = new Uint8Array(128);
                visualizerAnalyserRef.current.local.getByteFrequencyData(localData);

                const remoteData = {};
                Object.entries(visualizerAnalyserRef.current.remote).forEach(([key, { analyser }]) => {
                    const data = new Uint8Array(128);
                    analyser.getByteFrequencyData(data);
                    remoteData[key] = data;
                });

                setAudioVisualizerData({ local: localData, remote: remoteData });
            }, 33); // ~30fps for performance

        } catch (err) {
            console.error('[Visualizer] Failed to start:', err);
        }
    }, [isVisualizerEnabled, localAudioStream, remoteStreams, globalAudioContextRef]);

    // 📊 YENİ: Stop Audio Visualizer
    const stopVisualizer = useCallback(() => {
        if (visualizerIntervalRef.current) {
            clearInterval(visualizerIntervalRef.current);
            visualizerIntervalRef.current = null;
        }
        if (visualizerAnalyserRef.current) {
            try {
                visualizerAnalyserRef.current.localSource?.disconnect();
                Object.values(visualizerAnalyserRef.current.remote).forEach(({ source }) => {
                    source?.disconnect();
                });
            } catch (_) { /* AudioNode cleanup - safe to ignore */ }
            visualizerAnalyserRef.current = null;
        }
        setAudioVisualizerData({ local: new Uint8Array(128), remote: {} });
    }, []);

    // 📊 Auto-start/stop visualizer based on voice state
    useEffect(() => {
        if (isInVoice && isVisualizerEnabled) {
            startVisualizer();
        } else {
            stopVisualizer();
        }
        return () => stopVisualizer();
    }, [isInVoice, isVisualizerEnabled, startVisualizer, stopVisualizer]);

    return {
        audioVisualizerData,
        startVisualizer,
        stopVisualizer,
    };
}
