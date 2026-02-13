/**
 * Creates a voice effect by connecting audio nodes in a chain.
 * @param {string} effectType - The effect type: 'robot', 'echo', 'deep', 'high', 'radio', 'reverb'
 * @param {number} intensity - Effect intensity (0-100)
 * @param {AudioContext} audioContext - The AudioContext to create nodes with
 * @param {MediaStream} sourceStream - The source media stream to process
 * @returns {{ nodes: AudioNode[], outputStream: MediaStream }}
 */
export function createVoiceEffect(effectType, intensity, audioContext, sourceStream) {
    const source = audioContext.createMediaStreamSource(sourceStream);
    const destination = audioContext.createMediaStreamDestination();
    const nodes = [];

    // Normalize intensity to 0-1 range
    const normalizedIntensity = intensity / 100;

    switch (effectType) {
        case 'robot': {
            // Robot voice: Ring modulator + waveshaper
            const oscillator = audioContext.createOscillator();
            const gainOsc = audioContext.createGain();
            const waveshaper = audioContext.createWaveShaper();

            oscillator.type = 'sawtooth';
            oscillator.frequency.value = 50 + (normalizedIntensity * 100); // 50-150 Hz
            gainOsc.gain.value = 0.3 + (normalizedIntensity * 0.4);

            // Waveshaper curve for distortion
            const curve = new Float32Array(256);
            for (let i = 0; i < 256; i++) {
                const x = (i / 128) - 1;
                curve[i] = Math.tanh(x * (1 + normalizedIntensity * 3));
            }
            waveshaper.curve = curve;

            oscillator.connect(gainOsc);
            source.connect(waveshaper);
            waveshaper.connect(destination);
            oscillator.start();

            nodes.push(oscillator, gainOsc, waveshaper);
            break;
        }

        case 'echo': {
            // Echo/Delay effect
            const delay = audioContext.createDelay(1.0);
            const feedback = audioContext.createGain();
            const wetGain = audioContext.createGain();
            const dryGain = audioContext.createGain();

            delay.delayTime.value = 0.1 + (normalizedIntensity * 0.4); // 100-500ms
            feedback.gain.value = 0.2 + (normalizedIntensity * 0.5); // 20-70% feedback
            wetGain.gain.value = 0.3 + (normalizedIntensity * 0.4);
            dryGain.gain.value = 1 - (normalizedIntensity * 0.3);

            source.connect(dryGain);
            source.connect(delay);
            delay.connect(feedback);
            feedback.connect(delay);
            delay.connect(wetGain);
            dryGain.connect(destination);
            wetGain.connect(destination);

            nodes.push(delay, feedback, wetGain, dryGain);
            break;
        }

        case 'deep': {
            // Deep voice: Pitch shift down (using playbackRate trick)
            const biquadFilter = audioContext.createBiquadFilter();
            const gainNode = audioContext.createGain();

            biquadFilter.type = 'lowshelf';
            biquadFilter.frequency.value = 500;
            biquadFilter.gain.value = 10 + (normalizedIntensity * 15); // Boost low frequencies

            gainNode.gain.value = 1.2;

            source.connect(biquadFilter);
            biquadFilter.connect(gainNode);
            gainNode.connect(destination);

            nodes.push(biquadFilter, gainNode);
            break;
        }

        case 'high': {
            // High/Chipmunk voice: Pitch shift up
            const highFilter = audioContext.createBiquadFilter();
            const gainNode = audioContext.createGain();

            highFilter.type = 'highshelf';
            highFilter.frequency.value = 1000;
            highFilter.gain.value = 8 + (normalizedIntensity * 12);

            gainNode.gain.value = 0.9;

            source.connect(highFilter);
            highFilter.connect(gainNode);
            gainNode.connect(destination);

            nodes.push(highFilter, gainNode);
            break;
        }

        case 'radio': {
            // Radio/Telephone effect: Bandpass filter
            const lowpass = audioContext.createBiquadFilter();
            const highpass = audioContext.createBiquadFilter();
            const distortion = audioContext.createWaveShaper();

            lowpass.type = 'lowpass';
            lowpass.frequency.value = 3000 - (normalizedIntensity * 1000);

            highpass.type = 'highpass';
            highpass.frequency.value = 300 + (normalizedIntensity * 200);

            // Slight distortion for radio crackle
            const curve = new Float32Array(256);
            for (let i = 0; i < 256; i++) {
                const x = (i / 128) - 1;
                curve[i] = Math.sign(x) * Math.pow(Math.abs(x), 0.8);
            }
            distortion.curve = curve;

            source.connect(highpass);
            highpass.connect(lowpass);
            lowpass.connect(distortion);
            distortion.connect(destination);

            nodes.push(lowpass, highpass, distortion);
            break;
        }

        case 'reverb': {
            // Reverb/Hall effect
            const convolver = audioContext.createConvolver();
            const wetGain = audioContext.createGain();
            const dryGain = audioContext.createGain();

            // Create impulse response for reverb
            const sampleRate = audioContext.sampleRate;
            const length = sampleRate * (0.5 + normalizedIntensity * 2); // 0.5-2.5 seconds
            const impulse = audioContext.createBuffer(2, length, sampleRate);

            for (let channel = 0; channel < 2; channel++) {
                const channelData = impulse.getChannelData(channel);
                for (let i = 0; i < length; i++) {
                    channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2);
                }
            }
            convolver.buffer = impulse;

            wetGain.gain.value = 0.3 + (normalizedIntensity * 0.5);
            dryGain.gain.value = 1 - (normalizedIntensity * 0.2);

            source.connect(dryGain);
            source.connect(convolver);
            convolver.connect(wetGain);
            dryGain.connect(destination);
            wetGain.connect(destination);

            nodes.push(convolver, wetGain, dryGain);
            break;
        }

        default:
            source.connect(destination);
    }

    return { nodes, outputStream: destination.stream };
}
