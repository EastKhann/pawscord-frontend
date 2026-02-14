import { useState, useEffect, useRef } from 'react';

export const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function useVideoCall(isOpen, localStream, remoteStream) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [selectedCamera, setSelectedCamera] = useState('');
    const [selectedMicrophone, setSelectedMicrophone] = useState('');
    const [devices, setDevices] = useState({ cameras: [], microphones: [] });
    const [videoQuality, setVideoQuality] = useState('720p');

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const containerRef = useRef(null);

    // Get available devices
    useEffect(() => {
        if (!isOpen) return;
        (async () => {
            try {
                const deviceList = await navigator.mediaDevices.enumerateDevices();
                const cameras = deviceList.filter(d => d.kind === 'videoinput');
                const microphones = deviceList.filter(d => d.kind === 'audioinput');
                setDevices({ cameras, microphones });
                if (cameras.length > 0 && !selectedCamera) setSelectedCamera(cameras[0].deviceId);
                if (microphones.length > 0 && !selectedMicrophone) setSelectedMicrophone(microphones[0].deviceId);
            } catch (err) { console.error('Failed to enumerate devices:', err); }
        })();
    }, [isOpen]);

    // Attach streams to video elements
    useEffect(() => { if (localVideoRef.current && localStream) localVideoRef.current.srcObject = localStream; }, [localStream]);
    useEffect(() => { if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream; }, [remoteStream]);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            try { await containerRef.current?.requestFullscreen(); setIsFullscreen(true); }
            catch (err) { console.error('Fullscreen failed:', err); }
        } else { await document.exitFullscreen(); setIsFullscreen(false); }
    };

    return {
        isFullscreen, showSettings, setShowSettings,
        selectedCamera, setSelectedCamera, selectedMicrophone, setSelectedMicrophone,
        devices, videoQuality, setVideoQuality,
        localVideoRef, remoteVideoRef, containerRef, toggleFullscreen
    };
}
