// frontend/src/utils/videoEffects.js

/**
 * 🎨 Video Effects & Filters
 * Background blur, virtual backgrounds, filters
 */

/**
 * Apply background blur to video stream
 * Uses Canvas API for simple blur effect
 */
export const applyBackgroundBlur = async (videoTrack, blurAmount = 10) => {
    try {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const video = document.createElement('video');

        // Set video source
        video.srcObject = new MediaStream([videoTrack]);
        video.play();

        // Wait for video metadata
        await new Promise((resolve) => {
            video.onloadedmetadata = resolve;
        });

        // Set canvas dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Create processing loop
        const processFrame = () => {
            if (video.paused || video.ended) return;

            // Draw video frame
            ctx.filter = `blur(${blurAmount}px)`;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            requestAnimationFrame(processFrame);
        };

        processFrame();

        // Return canvas stream
        return canvas.captureStream(30); // 30 FPS
    } catch (error) {
        console.error('Failed to apply background blur:', error);
        return null;
    }
};

/**
 * Apply virtual background
 */
export const applyVirtualBackground = async (videoTrack, backgroundImage) => {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const video = document.createElement('video');

        video.srcObject = new MediaStream([videoTrack]);
        video.play();

        await new Promise((resolve) => {
            video.onloadedmetadata = resolve;
        });

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Load background image
        const bgImg = new Image();
        bgImg.src = backgroundImage;
        await new Promise((resolve) => {
            bgImg.onload = resolve;
        });

        const processFrame = () => {
            if (video.paused || video.ended) return;

            // Draw background
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

            // Draw video (this is simplified - real implementation would need person segmentation)
            ctx.globalCompositeOperation = 'source-atop';
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';

            requestAnimationFrame(processFrame);
        };

        processFrame();

        return canvas.captureStream(30);
    } catch (error) {
        console.error('Failed to apply virtual background:', error);
        return null;
    }
};

/**
 * Apply brightness/contrast filter
 */
export const applyBrightnessContrast = async (videoTrack, brightness = 1.0, contrast = 1.0) => {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const video = document.createElement('video');

        video.srcObject = new MediaStream([videoTrack]);
        video.play();

        await new Promise((resolve) => {
            video.onloadedmetadata = resolve;
        });

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const processFrame = () => {
            if (video.paused || video.ended) return;

            ctx.filter = `brightness(${brightness}) contrast(${contrast})`;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            requestAnimationFrame(processFrame);
        };

        processFrame();

        return canvas.captureStream(30);
    } catch (error) {
        console.error('Failed to apply brightness/contrast:', error);
        return null;
    }
};

/**
 * Get available video constraints for quality settings
 */
export const getVideoConstraints = (quality = '720p') => {
    const constraints = {
        '480p': {
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 30, max: 30 }
        },
        '720p': {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30, max: 30 }
        },
        '1080p': {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30, max: 30 }
        }
    };

    return {
        video: constraints[quality] || constraints['720p'],
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
        }
    };
};

/**
 * Get screen share constraints
 */
export const getScreenShareConstraints = (quality = '1080p') => {
    const constraints = {
        '720p': {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 15, max: 30 }
        },
        '1080p': {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 15, max: 30 }
        }
    };

    return {
        video: {
            ...constraints[quality],
            cursor: 'always',
            displaySurface: 'monitor'
        },
        audio: false
    };
};

/**
 * Start screen sharing
 */
export const startScreenShare = async (quality = '1080p') => {
    try {
        const constraints = getScreenShareConstraints(quality);
        const stream = await navigator.mediaDevices.getDisplayMedia(constraints);

        // Handle user stopping share via browser UI
        stream.getVideoTracks()[0].onended = () => {
            console.log('Screen sharing stopped by user');
        };

        return stream;
    } catch (error) {
        console.error('Failed to start screen share:', error);
        throw error;
    }
};

/**
 * Start video call with constraints
 */
export const startVideoCall = async (quality = '720p', deviceId = null) => {
    try {
        const constraints = getVideoConstraints(quality);

        // Add device ID if specified
        if (deviceId) {
            constraints.video.deviceId = { exact: deviceId };
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        return stream;
    } catch (error) {
        console.error('Failed to start video call:', error);
        throw error;
    }
};

/**
 * Switch camera during video call
 */
export const switchCamera = async (currentStream, newDeviceId, quality = '720p') => {
    try {
        // Stop current video track
        currentStream.getVideoTracks().forEach(track => track.stop());

        // Get new stream with different camera
        const constraints = getVideoConstraints(quality);
        constraints.video.deviceId = { exact: newDeviceId };

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);

        // Replace video track
        const newVideoTrack = newStream.getVideoTracks()[0];
        currentStream.removeTrack(currentStream.getVideoTracks()[0]);
        currentStream.addTrack(newVideoTrack);

        return currentStream;
    } catch (error) {
        console.error('Failed to switch camera:', error);
        throw error;
    }
};

/**
 * Apply filter presets
 */
export const filterPresets = {
    none: { brightness: 1.0, contrast: 1.0, saturation: 1.0 },
    vivid: { brightness: 1.1, contrast: 1.2, saturation: 1.3 },
    warm: { brightness: 1.05, contrast: 1.0, saturation: 1.1 },
    cool: { brightness: 0.95, contrast: 1.0, saturation: 1.1 },
    grayscale: { brightness: 1.0, contrast: 1.0, saturation: 0.0 }
};

/**
 * React Hook - Video Effects
 */
export const useVideoEffects = () => {
    const [activeEffect, setActiveEffect] = React.useState('none');
    const [blurAmount, setBlurAmount] = React.useState(10);

    const applyEffect = React.useCallback(async (videoTrack, effect) => {
        switch (effect) {
            case 'blur':
                return await applyBackgroundBlur(videoTrack, blurAmount);
            case 'brightness':
                return await applyBrightnessContrast(videoTrack, 1.2, 1.1);
            default:
                return videoTrack;
        }
    }, [blurAmount]);

    return {
        activeEffect,
        setActiveEffect,
        blurAmount,
        setBlurAmount,
        applyEffect
    };
};

export default {
    applyBackgroundBlur,
    applyVirtualBackground,
    applyBrightnessContrast,
    getVideoConstraints,
    getScreenShareConstraints,
    startScreenShare,
    startVideoCall,
    switchCamera,
    filterPresets,
    useVideoEffects
};


