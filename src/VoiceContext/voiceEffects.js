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
            // Robot voice: Ring modulator (AM synthesis) + waveshaper distortion
            // 🔥 FIX: Oscillator now actually modulates the voice signal via GainNode
            const modGain = audioContext.createGain();
            const oscillator = audioContext.createOscillator();
            const waveshaper = audioContext.createWaveShaper();

            oscillator.type = 'sawtooth';
            oscillator.frequency.value = 50 + (normalizedIntensity * 100); // 50-150 Hz

            // Ring modulation: oscillator controls the gain of the voice
            // This multiplies voice × oscillator = classic robot effect
            modGain.gain.value = 0; // Will be driven by oscillator

            // Waveshaper for metallic distortion
            const curve = new Float32Array(256);
            for (let i = 0; i < 256; i++) {
                const x = (i / 128) - 1;
                curve[i] = Math.tanh(x * (1 + normalizedIntensity * 3));
            }
            waveshaper.curve = curve;

            // Dry/wet mix
            const dryGain = audioContext.createGain();
            const wetGain = audioContext.createGain();
            dryGain.gain.value = 1 - (normalizedIntensity * 0.7);
            wetGain.gain.value = 0.3 + (normalizedIntensity * 0.7);

            // Voice → modGain (AM) → waveshaper → wet → destination
            source.connect(modGain);
            oscillator.connect(modGain.gain); // 🔥 Key: oscillator drives gain = ring modulation
            modGain.connect(waveshaper);
            waveshaper.connect(wetGain);
            wetGain.connect(destination);

            // Dry path for mixing
            source.connect(dryGain);
            dryGain.connect(destination);

            oscillator.start();

            nodes.push(oscillator, modGain, waveshaper, dryGain, wetGain);
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
            // Deep voice: Heavy bass boost + high-frequency cut + resonance
            // 🔥 FIX: Multi-stage filtering for a convincingly deeper voice
            const lowBoost = audioContext.createBiquadFilter();
            const lowBoost2 = audioContext.createBiquadFilter();
            const highCut = audioContext.createBiquadFilter();
            const gainNode = audioContext.createGain();

            // Stage 1: Strong low-shelf boost
            lowBoost.type = 'lowshelf';
            lowBoost.frequency.value = 300;
            lowBoost.gain.value = 12 + (normalizedIntensity * 18); // +12 to +30 dB

            // Stage 2: Peaking bass resonance for "chest voice" feel
            lowBoost2.type = 'peaking';
            lowBoost2.frequency.value = 150 - (normalizedIntensity * 50); // 100-150 Hz
            lowBoost2.Q.value = 1.5;
            lowBoost2.gain.value = 6 + (normalizedIntensity * 10);

            // Stage 3: Cut high frequencies to remove "bright" quality
            highCut.type = 'lowpass';
            highCut.frequency.value = 3500 - (normalizedIntensity * 1500); // 2000-3500 Hz

            // Slight volume boost to compensate
            gainNode.gain.value = 1.0 + (normalizedIntensity * 0.3);

            source.connect(lowBoost);
            lowBoost.connect(lowBoost2);
            lowBoost2.connect(highCut);
            highCut.connect(gainNode);
            gainNode.connect(destination);

            nodes.push(lowBoost, lowBoost2, highCut, gainNode);
            break;
        }

        case 'high': {
            // High/Chipmunk voice: Treble boost + bass cut + formant emphasis
            // 🔥 FIX: Multi-stage filtering for a convincingly higher voice
            const highBoost = audioContext.createBiquadFilter();
            const highBoost2 = audioContext.createBiquadFilter();
            const bassCut = audioContext.createBiquadFilter();
            const presenceBoost = audioContext.createBiquadFilter();
            const gainNode = audioContext.createGain();

            // Stage 1: High-shelf boost for brightness
            highBoost.type = 'highshelf';
            highBoost.frequency.value = 2000;
            highBoost.gain.value = 10 + (normalizedIntensity * 15); // +10 to +25 dB

            // Stage 2: Peaking at formant range to shift perceived pitch
            highBoost2.type = 'peaking';
            highBoost2.frequency.value = 3000 + (normalizedIntensity * 1000); // 3000-4000 Hz
            highBoost2.Q.value = 2.0;
            highBoost2.gain.value = 8 + (normalizedIntensity * 8);

            // Stage 3: Cut bass to remove "body" of voice
            bassCut.type = 'highpass';
            bassCut.frequency.value = 200 + (normalizedIntensity * 300); // 200-500 Hz

            // Stage 4: Presence boost for clarity
            presenceBoost.type = 'peaking';
            presenceBoost.frequency.value = 5000;
            presenceBoost.Q.value = 1.0;
            presenceBoost.gain.value = 4 + (normalizedIntensity * 6);

            gainNode.gain.value = 0.8; // Reduce slightly to avoid clipping

            source.connect(bassCut);
            bassCut.connect(highBoost);
            highBoost.connect(highBoost2);
            highBoost2.connect(presenceBoost);
            presenceBoost.connect(gainNode);
            gainNode.connect(destination);

            nodes.push(highBoost, highBoost2, bassCut, presenceBoost, gainNode);
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
