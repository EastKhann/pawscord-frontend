import logger from '../utils/logger';

// 🎙️ NOISE SUPPRESSION - Gürültü Engelleme (ADVANCED)
export async function applyNoiseSuppression(stream) {
    try {
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) return stream;

        const audioTrack = audioTracks[0];

        // 🔥 AGRESIF Noise Suppression Ayarları
        const advancedConstraints = {
            // Standard WebRTC
            echoCancellation: { exact: true },
            noiseSuppression: { exact: true },
            autoGainControl: { exact: true },

            // Google Chrome Advanced
            googEchoCancellation: { exact: true },
            googAutoGainControl: { exact: true },
            googNoiseSuppression: { exact: true },
            googHighpassFilter: { exact: true },  // 🔥 Düşük frekans filtresi
            googTypingNoiseDetection: { exact: true },  // 🔥 Klavye sesi
            googAudioMirroring: false,

            // Gain Control (Ses seviyesi dengesi)
            googAutoGainControl2: { exact: true },

            // Echo Cancellation Level
            echoCancellationType: 'system'  // System-level echo cancellation
        };

        // Mevcut constraints'i güncelle
        if (audioTrack.applyConstraints) {
            try {
                await audioTrack.applyConstraints(advancedConstraints);
                logger.audio('🎯 ADVANCED noise suppression enabled');
            } catch (err) {
                // Bazı tarayıcılar advanced constraints'i desteklemeyebilir
                // Fallback to basic
                await audioTrack.applyConstraints({
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
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

// 🎚️ PROFESYONEL SES FİLTRELEME - Noise Gate + Compressor + Adaptive Filter
export function applyProfessionalAudioFilters(stream, globalAudioContextRef) {
    try {
        // 🔥 GÜRÜLTÜ ENGELLEMİE SEVİYESİNE GÖRE AYARLAR
        const voiceSettings = JSON.parse(localStorage.getItem('voice_settings') || '{}');
        const level = voiceSettings.audio?.noiseSuppressionLevel || 'medium';

        // Seviyeye göre parametreler - � DENGELİ GÜRÜLTÜ ENGELLEMİE (ses seviyesi korunur)
        const levelSettings = {
            low: {
                gateThreshold: -70,      // dB eşiği
                compressorThreshold: -15, // 🔥 -18 → -15dB: daha az sinyal sıkıştırılır
                compressorRatio: 1.8,    // 🔥 2 → 1.8: daha yumuşak sıkıştırma
                highPassFreq: 50,        // 50Hz altı kes (fan, AC sesi)
                lowPassFreq: 14000,      // 14kHz üstü kes
                gateRelease: 0.3,
                speechThreshold: 18,     // Konuşma algılama eşiği
                makeupGain: 2.5          // 🔥 1.8 → 2.5: compressor kaybını tam telafi
            },
            medium: {
                gateThreshold: -60,
                compressorThreshold: -16, // 🔥 -20 → -16dB: daha az sinyal yakalanır
                compressorRatio: 2,      // 🔥 2.5 → 2: daha az sıkıştırma = daha yüksek ses
                highPassFreq: 70,        // 🔧 80'den 70'e - daha fazla bas koruma
                lowPassFreq: 13000,      // 🔧 12k'dan 13k'ya - daha fazla tiz koruma
                gateRelease: 0.25,
                speechThreshold: 22,     // 🔧 25'ten 22'ye - daha hassas algılama
                makeupGain: 3.0          // 🔥 2.2 → 3.0: ses seviyesi korunsun
            },
            high: {
                gateThreshold: -50,
                compressorThreshold: -20, // 🔥 -24 → -20dB: çok fazla sıkıştırma önlendi
                compressorRatio: 2.5,    // 🔥 3 → 2.5: ses ezilmesin
                highPassFreq: 85,        // 🔧 100'den 85'e - erkek ses fundamentalleri korunsun
                lowPassFreq: 11000,      // 🔧 10k'dan 11k'ya - daha doğal ses
                gateRelease: 0.2,
                speechThreshold: 28,     // 🔧 30'dan 28'e
                makeupGain: 3.5          // 🔥 2.8 → 3.5: compressor kaybını tam telafi
            },
            aggressive: {
                gateThreshold: -45,
                compressorThreshold: -24, // 🔥 -28 → -24dB: aşırı sıkıştırma önlendi
                compressorRatio: 3,      // 🔥 4 → 3: daha az sıkıştırma
                highPassFreq: 110,       // 🔧 120'den 110'a
                lowPassFreq: 9000,       // 🔧 8k'dan 9k'ya
                gateRelease: 0.15,
                speechThreshold: 33,     // 🔧 35'ten 33'e
                makeupGain: 4.0          // 🔥 3.2 → 4.0: agresif sıkıştırma telafisi
            }
        };

        const settings = levelSettings[level] || levelSettings.high;

        // 🔥 PERFORMANS: Global AudioContext kullan (10 kullanıcı = 10 context yerine 1 context!)
        if (!globalAudioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            // 🔥 CIZIRTIYI ÖNLE: Sample rate eşleştir + latency hint
            globalAudioContextRef.current = new AudioContext({
                sampleRate: 48000,  // WebRTC standart sample rate
                latencyHint: 'interactive'  // Düşük gecikme modu
            });
        }

        const audioContext = globalAudioContextRef.current;

        // 🔥 CIZIRTIYI ÖNLE: Suspended context'i resume et
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
            });
        }

        // Source stream
        const source = audioContext.createMediaStreamSource(stream);

        // 1️⃣ NOISE GATE (Gürültü Kapısı) - SEVİYEYE GÖRE
        // Belli desibelin altındaki sesleri tamamen kes
        const noiseGateNode = audioContext.createGain();
        noiseGateNode.gain.value = 1.0; // 🔥 FIX: Başlangıçta AÇIK — ses kesilmesin!
        let isGateOpen = true; // 🔥 Başlangıçta açık
        const GATE_THRESHOLD = settings.gateThreshold; // dB (seviyeye göre)
        const GATE_ATTACK = 0.005;  // Daha hızlı açılma
        const GATE_RELEASE = settings.gateRelease;  // Seviyeye göre
        // 🔥 FIX: Near-zero floor — old 0.12 value let residual signal retrigger the
        // gate on the very next frame, causing rapid open/close chatter ("giggling").
        const GATE_FLOOR = 0.001;

        // 2️⃣ COMPRESSOR (Dinamik Sıkıştırma) - SEVİYEYE GÖRE
        // 🔥 CIZIRTIYI ÖNLE: Daha yumuşak sıkıştırma
        const compressor = audioContext.createDynamicsCompressor();
        compressor.threshold.value = settings.compressorThreshold;      // dB threshold (seviyeye göre)
        compressor.knee.value = 30;            // 🔥 40'tan 30'a - daha yumuşak geçiş
        compressor.ratio.value = Math.min(settings.compressorRatio, 4);  // 🔥 Max 4:1 ratio (cızırtı önler)
        compressor.attack.value = 0.003;       // 🔥 3ms - daha hızlı (click önler)
        compressor.release.value = 0.15;       // 🔥 150ms - daha kısa (pumping önler)

        // 🔥 MAKEUP GAIN: Compressor kaybını telafi et — SES SEVİYESİ KORUNSUN!
        // Profesyonel ses zincirinde compressor'dan sonra makeup gain ZORUNLUDUR.
        // Bu olmadan giden ses çok düşük kalıyordu.
        const makeupGainNode = audioContext.createGain();
        makeupGainNode.gain.value = settings.makeupGain || 1.5;

        // 3️⃣ HIGH-PASS FILTER (Düşük Frekans Kesici) - SEVİYEYE GÖRE
        // Fan, AC, trafik seslerini filtrele
        const highPassFilter = audioContext.createBiquadFilter();
        highPassFilter.type = 'highpass';
        highPassFilter.frequency.value = settings.highPassFreq;   // Seviyeye göre frekans
        highPassFilter.Q.value = 0.707;        // 🔥 Butterworth Q değeri (düz frekans yanıtı - cızırtı önler)

        // 4️⃣ LOW-PASS FILTER (Yüksek Frekans Kesici) - SEVİYEYE GÖRE
        // Elektronik gürültü, hiss seslerini filtrele
        const lowPassFilter = audioContext.createBiquadFilter();
        lowPassFilter.type = 'lowpass';
        lowPassFilter.frequency.value = settings.lowPassFreq;  // Seviyeye göre frekans
        lowPassFilter.Q.value = 0.707;         // 🔥 Butterworth Q değeri (düz frekans yanıtı)

        // 🔥 5️⃣ NOTCH FILTER - 50Hz/60Hz hum (elektrik gürültüsü) engelleme
        const notchFilter = audioContext.createBiquadFilter();
        notchFilter.type = 'notch';
        notchFilter.frequency.value = 50;      // 50Hz (TR elektrik şebekesi)
        notchFilter.Q.value = 10;              // Dar bant (sadece 50Hz civarı)

        // 6️⃣ DE-ESSER (Tıslama/Cızırtı azaltıcı) - 4-8kHz bandını yumuşat
        const deEsser = audioContext.createBiquadFilter();
        deEsser.type = 'peaking';
        deEsser.frequency.value = 6000;        // 6kHz (sibilant bölgesi)
        deEsser.Q.value = 1;                   // Geniş bant
        deEsser.gain.value = -1;               // 🔥 -2 → -1dB: daha az sinyal kaybı, konuşma netliği korunsun

        // 🔥 7️⃣ PRESENCE BOOST — Ses netliği ve anlaşılırlığı artır
        // 2-5kHz bölgesi insan sesinin en anlaşılır kısmıdır (konsonantlar)
        const presenceBoost = audioContext.createBiquadFilter();
        presenceBoost.type = 'peaking';
        presenceBoost.frequency.value = 3000;   // 3kHz (konsonant enerji merkezi)
        presenceBoost.Q.value = 0.8;            // Geniş bant (doğal ses)
        presenceBoost.gain.value = 3;           // 🔥 +2 → +3dB: konuşma netliği ve ses seviyesi artışı

        // 7️⃣ ADAPTIVE NOISE REDUCTION (Dinamik Gürültü Azaltma)
        // Sessiz anlarda gürültü profilini öğren ve çıkar
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.85; // 🔥 Daha yumuşak geçiş

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        let noiseProfile = new Float32Array(analyser.frequencyBinCount);
        let learningPhase = true;
        let silentFrames = 0;

        // Gürültü profili öğrenme
        const learnNoiseProfile = () => {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

            if (average < 20) { // Sessiz an
                silentFrames++;
                if (silentFrames > 10) { // 10 frame sessizlik
                    // Gürültü profilini güncelle
                    for (let i = 0; i < dataArray.length; i++) {
                        noiseProfile[i] = Math.max(noiseProfile[i], dataArray[i]);
                    }
                }
            } else {
                silentFrames = 0;
            }

            if (learningPhase && silentFrames > 50) {
                learningPhase = false;
            }
        };

        // Noise Gate kontrolü (VAD tabanlı)
        const speechThreshold = settings.speechThreshold || 25; // 🔥 Seviyeye göre eşik        // 🔥 FIX: Hysteresis — separate open/close thresholds to prevent chatter.
        // Without hysteresis, speech hovering near the threshold causes the gate to
        // fire open/shut every 30ms (~33Hz), producing a "giggling" artifact.
        // Close threshold is 55% of open threshold so the gate requires a clear drop
        // before it shuts, and a clear rise before it opens again.
        const GATE_OPEN_THRESHOLD = speechThreshold;
        const GATE_CLOSE_THRESHOLD = speechThreshold * 0.55;
        // 🔥 FIX: Hangover counter — keep gate open for at least N frames after
        // speech drops. Prevents clipping short words / consonants at end of phrases.
        let hangoverFrames = 0;
        const GATE_HANGOVER = 10; // 10 × 30ms = 300ms minimum open after speech
        let gateGracePeriod = 100; // 🔥 FIX: İlk 100 frame (~3s) gate her zaman açık — öğrenme süresi
        const updateNoiseGate = () => {
            analyser.getByteFrequencyData(dataArray);

            // 🔥 FIX: Grace period boyunca gate her zaman açık bırak (ses kesilmesin)
            if (gateGracePeriod > 0) {
                gateGracePeriod--;
                if (!isGateOpen) {
                    noiseGateNode.gain.setTargetAtTime(1.0, audioContext.currentTime, GATE_ATTACK);
                    isGateOpen = true;
                }
                if (learningPhase || Math.random() < 0.01) learnNoiseProfile();
                return;
            }

            // Konuşma frekansları (300Hz - 3kHz) - daha geniş aralık
            const speechRange = dataArray.slice(8, 120);  // 🔥 Daha geniş frekans aralığı
            const speechLevel = speechRange.reduce((a, b) => a + b) / speechRange.length;

            // Gürültü profili çıkarılmış sinyal
            const cleanSignal = speechLevel - (noiseProfile[50] || 0);

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

            // Gürültü profili öğrenmeye devam et
            if (learningPhase || Math.random() < 0.01) {
                learnNoiseProfile();
            }

            // 🔥 FIX: requestAnimationFrame yerine setInterval kullan (daha stabil)
            // requestAnimationFrame(updateNoiseGate); // ESKİ - CPU yoğun
        };

        // 🔥 FIX: Noise gate güncelleme interval'ı (30ms = ~33Hz - daha hızlı tepki)
        const noiseGateInterval = setInterval(updateNoiseGate, 30);

        // 8️⃣ SİNYAL ZİNCİRİ (Signal Chain) - GÜNCELLENDİ
        // source → highpass → notch(50Hz) → lowpass → deEsser → presenceBoost → compressor → makeupGain → noise gate → destination
        source.connect(highPassFilter);
        highPassFilter.connect(notchFilter);
        notchFilter.connect(lowPassFilter);
        lowPassFilter.connect(deEsser);
        deEsser.connect(presenceBoost);         // 🔥 De-esser → Presence Boost
        presenceBoost.connect(compressor);      // 🔥 Presence Boost → Compressor
        compressor.connect(makeupGainNode);     // 🔥 Compressor → Makeup Gain
        makeupGainNode.connect(noiseGateNode);  // 🔥 Makeup Gain → Noise Gate
        noiseGateNode.connect(analyser);

        // Yeni stream oluştur
        const destination = audioContext.createMediaStreamDestination();
        noiseGateNode.connect(destination);

        // 🔥 CLEANUP: Stream temizlendiğinde interval'ı durdur
        destination.stream.addEventListener('inactive', () => {
            clearInterval(noiseGateInterval);
        });


        return destination.stream;
    } catch (error) {
        console.error('❌ [Audio] Could not apply professional filters:', error);
        return stream; // Fallback to original
    }
}
