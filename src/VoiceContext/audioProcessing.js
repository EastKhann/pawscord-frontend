import logger from '../utils/logger';

// 🎙️ NOISE SUPPRESSION (ADVANCED)
export async function applyNoiseSuppression(stream) {
    try {
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) return stream;

        const audioTrack = audioTracks[0];

        // 🔥 AGGRESSIVE Noise Suppression Settings
        const advancedConstraints = {
            // Standard WebRTC
            echoCancellation: { exact: true },
            noiseSuppression: { exact: true },
            autoGainControl: { exact: true },

            // Google Chrome Advanced
            googEchoCancellation: { exact: true },
            googAutoGainControl: { exact: true },
            googNoiseSuppression: { exact: true },
            googHighpassFilter: { exact: true }, // 🔥 Low frequency filter
            googTypingNoiseDetection: { exact: true }, // 🔥 Keyboard noise detection
            googAudioMirroring: false,

            // Gain Control (audio level balance)
            googAutoGainControl2: { exact: true },

            // Echo Cancellation Level
            echoCancellationType: 'system', // System-level echo cancellation
        };

        // Update current constraints
        if (audioTrack.applyConstraints) {
            try {
                await audioTrack.applyConstraints(advancedConstraints);
                logger.audio('🎯 ADVANCED noise suppression enabled');
            } catch (err) {
                // Some browsers may not support advanced constraints
                // Fallback to basic
                await audioTrack.applyConstraints({
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                });
                logger.audio('✅ Basic noise suppression enabled (fallback)');
            }
        }

        return stream;
    } catch (error) {
        logger.warn('Could not apply noise suppression:', error);
        return stream;
    }
}

// 🎚️ PROFESSIONAL AUDIO FILTERING - Noise Gate + Compressor + Adaptive Filter
export function applyProfessionalAudioFilters(stream, globalAudioContextRef) {
    try {
        // 🔥 SETTINGS BASED ON NOISE SUPPRESSION LEVEL
        const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
        const level = voiceSettings.audio?.noiseSuppressionLevel || 'medium';

        // Levelye göre parametreler - � DENGELİ GÜRÜLTÜ ENGELLEMİE (audio seviyesi korunur)
        const levelSettings = {
            low: {
                gateThreshold: -70,
                compressorThreshold: -12,
                compressorRatio: 1.5,
                compressorKnee: 6,
                highPassFreq: 50,
                lowPassFreq: 14000,
                gateRelease: 0.3,
                speechThreshold: 15,
                makeupGain: 1.5, // compressor ~3dB kayıp → 1.5× telafi yeterli
            },
            medium: {
                gateThreshold: -60,
                compressorThreshold: -14,
                compressorRatio: 1.8,
                compressorKnee: 6,
                highPassFreq: 70,
                lowPassFreq: 13000,
                gateRelease: 0.25,
                speechThreshold: 18,
                makeupGain: 2.0, // compressor ~4dB kayıp → 2× telafi
            },
            high: {
                gateThreshold: -50,
                compressorThreshold: -18,
                compressorRatio: 2,
                compressorKnee: 8,
                highPassFreq: 85,
                lowPassFreq: 11000,
                gateRelease: 0.2,
                speechThreshold: 24,
                makeupGain: 2.5, // compressor ~5dB kayıp → 2.5× telafi
            },
            aggressive: {
                gateThreshold: -45,
                compressorThreshold: -22,
                compressorRatio: 2.5,
                compressorKnee: 10,
                highPassFreq: 110,
                lowPassFreq: 9000,
                gateRelease: 0.15,
                speechThreshold: 28,
                makeupGain: 3.0, // compressor ~6dB kayıp → 3× telafi
            },
        };

        const settings = levelSettings[level] || levelSettings.high;

        // 🔥 PERFORMANS: Global AudioContext kullan (10 kullanıcı = 10 context yerine 1 context!)
        if (!globalAudioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            // 🔥 CIZIRTIYI ÖNLE: Sample rate eşleştir + latency hint
            globalAudioContextRef.current = new AudioContext({
                sampleRate: 48000, // WebRTC standart sample rate
                latencyHint: 'interactive', // Low gecikme modu
            });
        }

        const audioContext = globalAudioContextRef.current;

        // 🔥 CIZIRTIYI ÖNLE: Suspended context'i resume et
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {});
        }

        // Source stream
        const source = audioContext.createMediaStreamSource(stream);

        // 1️⃣ NOISE GATE (Gürültü Kapısı) - SEVİYEYE GÖRE
        // Belli desibelin altındaki sesleri oken cut
        const noiseGateNode = audioContext.createGain();
        noiseGateNode.gain.value = 1.0; // 🔥 FIX: Başlangıçta AÇIK — audio kesilmesin!
        let isGateOpen = true; // 🔥 Başlangıçta açık
        const GATE_THRESHOLD = settings.gateThreshold; // dB (seviyeye göre)
        const GATE_ATTACK = 0.005; // Daha hızlı openılma
        const GATE_RELEASE = settings.gateRelease; // Levelye göre
        // Gate floor — when closed, let a small amount of signal through so the
        // analyser can still detect speech onset for gate re-open.
        // 0.05 (5%) × receiver BASE_GAIN 3.0 = ~15% perceived which is quiet
        // enough to suppress noise while avoiding the "dead silence" cut effect.
        const GATE_FLOOR = 0.05;

        // 2️⃣ COMPRESSOR (Dinamik Sıkıştırma) - SEVİYEYE GÖRE
        // 🔥 CIZIRTIYI ÖNLE: Daha yumuşak sıkıştırma
        const compressor = audioContext.createDynamicsCompressor();
        compressor.threshold.value = settings.compressorThreshold; // dB threshold (seviyeye göre)
        compressor.knee.value = settings.compressorKnee || 6; // 🔥 30→6: KRİTİK FIX — 30dB knee sıkıştırmayı -31dBFS'ten başlatıyordu = TÜM konuşma eziliyordu!
        compressor.ratio.value = Math.min(settings.compressorRatio, 4); // 🔥 Max 4:1 ratio (cızırtı önler)
        compressor.attack.value = 0.003; // 🔥 3ms - daha hızlı (click önler)
        compressor.release.value = 0.15; // 🔥 150ms - daha kısa (pumping önler)

        // 🔥 MAKEUP GAIN: Compressor kaybını telafi et — SES SEVİYESİ KORUNSUN!
        // Profesyonel audio zincirinde compressor'dan sonra makeup gain ZORUNLUDUR.
        // Bu olmadan giden audio çok düşük kalıyordu.
        const makeupGainNode = audioContext.createGain();
        makeupGainNode.gain.value = settings.makeupGain || 1.5;

        // 3️⃣ HIGH-PASS FILTER (Low Frekans Kesici) - SEVİYEYE GÖRE
        // Fan, AC, trafik seslerini filterle
        const highPassFilter = audioContext.createBiquadFilter();
        highPassFilter.type = 'highpass';
        highPassFilter.frequency.value = settings.highPassFreq; // Levelye göre frekans
        highPassFilter.Q.value = 0.707; // 🔥 Butterworth Q değeri (düz frekans yanıtı - cızırtı önler)

        // 4️⃣ LOW-PASS FILTER (High Frekans Kesici) - SEVİYEYE GÖRE
        // Elektronik gürültü, hiss seslerini filterle
        const lowPassFilter = audioContext.createBiquadFilter();
        lowPassFilter.type = 'lowpass';
        lowPassFilter.frequency.value = settings.lowPassFreq; // Levelye göre frekans
        lowPassFilter.Q.value = 0.707; // 🔥 Butterworth Q değeri (düz frekans yanıtı)

        // 🔥 5️⃣ NOTCH FILTER - 50Hz/60Hz hum (elektrik gürültüsü) engelleme
        const notchFilter = audioContext.createBiquadFilter();
        notchFilter.type = 'notch';
        notchFilter.frequency.value = 50; // 50Hz (TR elektrik şebecuti)
        notchFilter.Q.value = 10; // Dar bant (sadece 50Hz civarı)

        // 6️⃣ DE-ESSER (Tıslama/Cızırtı azaltıcı) - 4-8kHz bandını yumuşat
        const deEsser = audioContext.createBiquadFilter();
        deEsser.type = 'peaking';
        deEsser.frequency.value = 6000; // 6kHz (sibilant bölgesi)
        deEsser.Q.value = 1; // Geniş bant
        deEsser.gain.value = -1; // 🔥 -2 → -1dB: daha az sinyal kaybı, konuşma netliği korunsun

        // 🔥 7️⃣ PRESENCE BOOST — Ses netliği ve anlaşılırlığı artır
        // 2-5kHz bölgesi insan sesinin en anlaşılır kısmıdır (konsonantlar)
        const presenceBoost = audioContext.createBiquadFilter();
        presenceBoost.type = 'peaking';
        presenceBoost.frequency.value = 3000; // 3kHz (konsonant enerji merkezi)
        presenceBoost.Q.value = 0.8; // Geniş bant (doğal audio)
        presenceBoost.gain.value = 2; // +2dB: konuşma netliği (yüksek değerler diğer gain'lerle birlikte sertleşme yapar)

        // 7️⃣ ADAPTIVE NOISE REDUCTION (Dinamik Gürültü Azaltma)
        // Sessiz anlarda gürültü profileini öğren ve çıkar
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.85; // 🔥 Daha yumuşak geçiş

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let noiseProfile = new Float32Array(analyser.frequencyBinCount);
        let learningPhase = true;
        let silentFrames = 0;

        // Gürültü profilei öğrenme
        const learnNoiseProfile = () => {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

            if (average < 15) {
                // 🔥 20→15: Daha düşük eşik = gerçek sessizlik algılansın
                silentFrames++;
                if (silentFrames > 15) {
                    // 🔥 10→15: Daha uzun sessizlik gereksin = daha güvenilir profile
                    // Gürültü profileini daycelle — exponential moving average (ani spike'lar profileü bozmasın)
                    for (let i = 0; i < dataArray.length; i++) {
                        noiseProfile[i] = noiseProfile[i] * 0.9 + dataArray[i] * 0.1; // 🔥 EMA: yumuşak geçiş
                    }
                }
            } else {
                silentFrames = 0;
            }

            if (learningPhase && silentFrames > 80) {
                // 🔥 50→80: Daha uzun öğrenme = daha doğru profile
                learningPhase = false;
            }
        };

        // Noise Gate kontrolü (VAD tabanlı)
        const speechThreshold = settings.speechThreshold || 25; // 🔥 Levelye göre eşik        // 🔥 FIX: Hysteresis — separate open/close thresholds to prevent chatter.
        // Without hysteresis, speech hovering near the threshold causes the gate to
        // fire open/shut every 30ms (~33Hz), producing a "giggling" artifact.
        // Close threshold is 55% of open threshold so the gate requires a clear drop
        // before it shuts, and a clear rise before it opens again.
        const GATE_OPEN_THRESHOLD = speechThreshold * 0.8; // 🔥 FIX: Open more easily (old threshold was too high)
        const GATE_CLOSE_THRESHOLD = speechThreshold * 0.4; // 🔥 FIX: 0.55 → 0.4: daha geç kapansın
        // 🔥 FIX: Hangover counter — keep gate open for at least N frames after
        // speech drops. Prevents clipping short words / consonants at end of phrases.
        let hangoverFrames = 0;
        const GATE_HANGOVER = 15; // 🔥 10→15: 15 × 30ms = 450ms minimum open after speech (kelime sonları korunsun)
        let gategracePeriod = 166; // 🔥 FIX: 100→166 frame (~5s) gate her zaman açık — noise profile oklanana kadar
        const updateNoiseGate = () => {
            analyser.getByteFrequencyData(dataArray);

            // 🔥 FIX: Grace period boyunca gate her zaman açık bırak (audio kesilmesin)
            if (gategracePeriod > 0) {
                gategracePeriod--;
                if (!isGateOpen) {
                    noiseGateNode.gain.setTargetAtTime(1.0, audioContext.currentTime, GATE_ATTACK);
                    isGateOpen = true;
                }
                if (learningPhase || Math.random() < 0.01) learnNoiseProfile();
                return;
            }

            // Konuşma frekansları (300Hz - 3kHz) - daha geniş searchlık
            const speechRange = dataArray.slice(8, 120); // 🔥 Daha geniş frekans searchlığı
            const speechLevel = speechRange.reduce((a, b) => a + b) / speechRange.length;

            // Gürültü profilei çıkarılmış sinyal — konuşma bandının ortalamasını kullan (tek bin yerine)
            const noiseFloor = (noiseProfile[30] + noiseProfile[50] + noiseProfile[80]) / 3 || 0; // 🔥 FIX: 3 bin ortalaması = daha kararlı
            const cleanSignal = Math.max(0, speechLevel - noiseFloor * 0.7); // 🔥 FIX: noise floor'un %70'ini çıkar (agresif çıkarma konuşmayı da yiyordu)

            // 🔥 FIX: Hysteresis noise gate — use separate open/close thresholds
            // to prevent rapid chatter when signal hovers near a single threshold.
            // Hangover counter keeps the gate open briefly after speech ends so word
            // endings / consonants are not clipped.
            const currentTime = audioContext.currentTime;
            if (isGateOpen) {
                // Gate is open: only close when signal falls below CLOSE threshold
                // AND hangover has expired
                if (cleanSignal <= GATE_CLOSE_THRESHOLD) {
                    if (hangoverFrames > 0) {
                        hangoverFrames--;
                        // stay open during hangover
                    } else {
                        noiseGateNode.gain.setTargetAtTime(GATE_FLOOR, currentTime, GATE_RELEASE);
                        isGateOpen = false;
                    }
                } else {
                    // Signal still above close threshold — reset hangover
                    hangoverFrames = GATE_HANGOVER;
                }
            } else {
                // Gate is closed: only open when signal rises above OPEN threshold
                if (cleanSignal > GATE_OPEN_THRESHOLD) {
                    noiseGateNode.gain.setTargetAtTime(1.0, currentTime, GATE_ATTACK);
                    isGateOpen = true;
                    hangoverFrames = GATE_HANGOVER;
                }
            }

            // Gürültü profilei öğrenmeye devam et
            if (learningPhase || Math.random() < 0.01) {
                learnNoiseProfile();
            }

            // 🔥 FIX: requestAnimationFrame yerine setInterval kullan (daha stabil)
            // requestAnimationFrame(updateNoiseGate); // ESKİ - CPU yoğun
        };

        // 🔥 FIX: Noise gate güncelleme interval'ı (30ms = ~33Hz - daha hızlı tepki)
        const noiseGateInterval = setInterval(updateNoiseGate, 30);

        // 8️⃣ SİNYAL ZİNCİRİ (Signal Chain) - 🔥 DÜZELTILDI
        // ESKİ: ...compressor → makeupGain → noiseGate → dest (gate makeup'ı pe atıyordu!)
        // YENİ: ...compressor → noiseGate → makeupGain → dest (gate ÖNCE, gain SONRA)
        // Bu sayede gate kapansa bile makeupGain çıkışı yüksek tutar.
        source.connect(highPassFilter);
        highPassFilter.connect(notchFilter);
        notchFilter.connect(lowPassFilter);
        lowPassFilter.connect(deEsser);
        deEsser.connect(presenceBoost); // De-esser → Presence Boost
        presenceBoost.connect(compressor); // Presence Boost → Compressor
        compressor.connect(analyser); // 🔥 FIX: Compressor → Analyser (gate'den ÖNCE ölç!)
        // Analyser gate'den ÖNCE olmalı — yoksa gate closeınca analyser sinyal göremez
        // ve gate bir daha openılamaz (deadlock). Pre-gate analiz = konuşma doğru algılanır.
        compressor.connect(noiseGateNode); // 🔥 FIX: Compressor → Noise Gate (gate ÖNCE!)
        noiseGateNode.connect(makeupGainNode); // 🔥 FIX: Noise Gate → Makeup Gain (gain SONRA!)

        // Yeni stream oluştur
        const destination = audioContext.createMediaStreamDestination();
        makeupGainNode.connect(destination); // 🔥 FIX: Destination artık makeupGain'den besleniyor

        // Cleanup: stop interval when stream becomes inactive or is replaced
        destination.stream.addEventListener('inactive', () => {
            clearInterval(noiseGateInterval);
        });
        // Expose interval ID so callers can clean up when replacing the stream
        destination.stream._noiseGateInterval = noiseGateInterval;

        return destination.stream;
    } catch (error) {
        logger.error('❌ [Audio] Could not apply professional filters:', error);
        return stream; // Fallback to original
    }
}
