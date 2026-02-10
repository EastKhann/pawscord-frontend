// frontend/src/SpatialAudioEngine.js
/**
 * 🎧 SPATIAL AUDIO ENGINE FOR PAWSCORD
 * 
 * Features:
 * - 3D Positional Audio using Web Audio API
 * - HRTF (Head-Related Transfer Function) simulation
 * - Distance-based volume falloff
 * - Reverb and environmental effects
 * - Voice activity detection
 */

class SpatialAudioEngine {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.spatialNodes = {}; // { username: { panner, gain, analyser, source } }
        this.listenerPosition = { x: 0, y: 0, z: 0 };
        this.initialized = false;
    }

    /**
     * Initialize the audio engine
     */
    async initialize() {
        if (this.initialized) return;

        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();

            // Master gain node
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = 1.0;
            this.masterGain.connect(this.audioContext.destination);

            // Resume if suspended
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            // Set up listener (user's position)
            this.setupListener();

            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize spatial audio:', error);
            throw error;
        }
    }

    /**
     * Set up the audio listener (user's ears)
     */
    setupListener() {
        const listener = this.audioContext.listener;

        // Set listener position
        if (listener.positionX) {
            // Modern browsers
            listener.positionX.value = this.listenerPosition.x;
            listener.positionY.value = this.listenerPosition.y;
            listener.positionZ.value = this.listenerPosition.z;
        } else {
            // Safari fallback
            listener.setPosition(
                this.listenerPosition.x,
                this.listenerPosition.y,
                this.listenerPosition.z
            );
        }

        // Set listener orientation (forward and up vectors)
        if (listener.forwardX) {
            listener.forwardX.value = 0;
            listener.forwardY.value = 0;
            listener.forwardZ.value = -1;
            listener.upX.value = 0;
            listener.upY.value = 1;
            listener.upZ.value = 0;
        } else {
            listener.setOrientation(0, 0, -1, 0, 1, 0);
        }
    }

    /**
     * Add a user's audio stream to spatial audio processing
     * @param {string} username - User identifier
     * @param {MediaStream} stream - User's audio stream
     * @param {Object} position - 3D position {x, y, z}
     */
    addUser(username, stream, position = { x: 0, y: 0, z: -1 }) {
        if (!this.initialized) {
            console.warn('Spatial audio not initialized');
            return null;
        }

        // Remove existing node if present
        if (this.spatialNodes[username]) {
            this.removeUser(username);
        }

        try {
            // Create source from stream
            const source = this.audioContext.createMediaStreamSource(stream);

            // Create panner node for 3D positioning
            const panner = this.audioContext.createPanner();
            panner.panningModel = 'HRTF'; // Head-Related Transfer Function
            panner.distanceModel = 'inverse'; // Realistic distance falloff
            panner.refDistance = 1; // Reference distance
            panner.maxDistance = 10000; // Maximum distance
            panner.rolloffFactor = 1.5; // How quickly sound drops off
            panner.coneInnerAngle = 360; // Omnidirectional
            panner.coneOuterAngle = 360;
            panner.coneOuterGain = 0;

            // Set initial position
            this.setUserPosition(username, position, panner);

            // Create gain node for volume control
            const gain = this.audioContext.createGain();
            gain.gain.value = 1.0;

            // Create analyser for voice activity detection
            const analyser = this.audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;

            // Connect the audio graph
            source.connect(analyser);
            analyser.connect(panner);
            panner.connect(gain);
            gain.connect(this.masterGain);

            // Store nodes
            this.spatialNodes[username] = {
                source,
                panner,
                gain,
                analyser,
                position,
                audioElement: null
            };

            return this.spatialNodes[username];
        } catch (error) {
            console.error(`Failed to add spatial audio for ${username}:`, error);
            return null;
        }
    }

    /**
     * Update user's 3D position
     * @param {string} username - User identifier
     * @param {Object} position - New position {x, y, z}
     */
    setUserPosition(username, position, pannerNode = null) {
        const panner = pannerNode || this.spatialNodes[username]?.panner;
        if (!panner) return;

        if (panner.positionX) {
            // Modern browsers
            panner.positionX.setValueAtTime(position.x, this.audioContext.currentTime);
            panner.positionY.setValueAtTime(position.y, this.audioContext.currentTime);
            panner.positionZ.setValueAtTime(position.z, this.audioContext.currentTime);
        } else {
            // Safari fallback
            panner.setPosition(position.x, position.y, position.z);
        }

        if (this.spatialNodes[username]) {
            this.spatialNodes[username].position = position;
        }
    }

    /**
     * Set user's volume
     * @param {string} username - User identifier
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    setUserVolume(username, volume) {
        const node = this.spatialNodes[username];
        if (!node) return;

        const clampedVolume = Math.max(0, Math.min(1, volume));
        node.gain.gain.setValueAtTime(clampedVolume, this.audioContext.currentTime);
    }

    /**
     * Get voice activity level
     * @param {string} username - User identifier
     * @returns {number} - Activity level (0-100)
     */
    getVoiceActivity(username) {
        const node = this.spatialNodes[username];
        if (!node) return 0;

        const analyser = node.analyser;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        // Calculate average volume
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const average = sum / dataArray.length;

        return Math.round((average / 255) * 100);
    }

    /**
     * Remove user from spatial audio
     * @param {string} username - User identifier
     */
    removeUser(username) {
        const node = this.spatialNodes[username];
        if (!node) return;

        try {
            // Disconnect all nodes
            node.source.disconnect();
            node.analyser.disconnect();
            node.panner.disconnect();
            node.gain.disconnect();

            delete this.spatialNodes[username];
        } catch (error) {
            console.error(`Error removing spatial audio for ${username}:`, error);
        }
    }

    /**
     * Update listener position (camera/user position)
     * @param {Object} position - New position {x, y, z}
     */
    updateListenerPosition(position) {
        this.listenerPosition = position;
        this.setupListener();
    }

    /**
     * Set master volume
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    setMasterVolume(volume) {
        if (!this.masterGain) return;
        const clampedVolume = Math.max(0, Math.min(1, volume));
        this.masterGain.gain.setValueAtTime(clampedVolume, this.audioContext.currentTime);
    }

    /**
     * Mute/unmute user
     * @param {string} username - User identifier
     * @param {boolean} muted - Mute state
     */
    setUserMuted(username, muted) {
        this.setUserVolume(username, muted ? 0 : 1);
    }

    /**
     * Clean up and destroy engine
     */
    destroy() {
        // Remove all users
        Object.keys(this.spatialNodes).forEach(username => {
            this.removeUser(username);
        });

        // Close audio context
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }

        this.initialized = false;
    }

    /**
     * Get distance between listener and user
     * @param {string} username - User identifier
     * @returns {number} - Distance
     */
    getUserDistance(username) {
        const node = this.spatialNodes[username];
        if (!node) return Infinity;

        const pos = node.position;
        const listener = this.listenerPosition;

        return Math.sqrt(
            Math.pow(pos.x - listener.x, 2) +
            Math.pow(pos.y - listener.y, 2) +
            Math.pow(pos.z - listener.z, 2)
        );
    }

    /**
     * Create a circular arrangement of users
     * Useful for voice channels with multiple users
     * @param {Array<string>} usernames - Array of usernames
     * @param {number} radius - Circle radius
     * @returns {Object} - Positions map { username: {x, y, z} }
     */
    arrangeUsersInCircle(usernames, radius = 3) {
        const positions = {};
        const angleStep = (2 * Math.PI) / usernames.length;

        usernames.forEach((username, index) => {
            const angle = angleStep * index;
            const position = {
                x: Math.cos(angle) * radius,
                y: 0,
                z: Math.sin(angle) * radius
            };
            
            positions[username] = position;
            this.setUserPosition(username, position);
        });

        return positions;
    }
}

// Export singleton instance
export const spatialAudio = new SpatialAudioEngine();
export default SpatialAudioEngine;


