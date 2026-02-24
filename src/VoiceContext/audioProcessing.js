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
        const level = voiceSettings.audio?.noiseSuppressionLevel || 'high';

        // Seviyeye göre parametreler - � DENGELİ GÜRÜLTÜ ENGELLEMİE (ses seviyesi korunur)
        const levelSettings = {
            low: {
                gateThreshold: -70,      // dB eşiği
                compressorThreshold: -18,
                compressorRatio: 2,
                highPassFreq: 50,        // 50Hz altı kes (fan, AC sesi)
                lowPassFreq: 14000,      // 14kHz üstü kes
                gateRelease: 0.3,
                speechThreshold: 18,     // Konuşma algılama eşiği
                makeupGain: 1.3          // 🔥 Compressor sonrası telafi kazancı
            },
            medium: {
                gateThreshold: -60,
                compressorThreshold: -20,
                compressorRatio: 2.5,    // 🔧 3'ten 2.5'e - daha az sıkıştırma
                highPassFreq: 70,        // 🔧 80'den 70'e - daha fazla bas koruma
                lowPassFreq: 13000,      // 🔧 12k'dan 13k'ya - daha fazla tiz koruma
                gateRelease: 0.25,
                speechThreshold: 22,     // 🔧 25'ten 22'ye - daha hassas algılama
                makeupGain: 1.6          // 🔥 Compressor sonrası telafi kazancı
            },
            high: {
                gateThreshold: -50,
                compressorThreshold: -24,
                compressorRatio: 3,      // 🔧 4'ten 3'e - ses ezilmesin
                highPassFreq: 85,        // 🔧 100'den 85'e - erkek ses fundamentalleri korunsun
                lowPassFreq: 11000,      // 🔧 10k'dan 11k'ya - daha doğal ses
                gateRelease: 0.2,
                speechThreshold: 28,     // 🔧 30'dan 28'e
                makeupGain: 2.0          // 🔥 Compressor sonrası telafi kazancı
            },
            aggressive: {
                gateThreshold: -45,
                compressorThreshold: -28,
                compressorRatio: 4,      // 🔧 6'dan 4'e - aşırı sıkıştırma önlenir
                highPassFreq: 110,       // 🔧 120'den 110'a
                lowPassFreq: 9000,       // 🔧 8k'dan 9k'ya
                gateRelease: 0.15,
                speechThreshold: 33,     // 🔧 35'ten 33'e
                makeupGain: 2.5          // 🔥 Compressor sonrası telafi kazancı
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
        const GATE_FLOOR = 0.12; // 🔥 FIX: Minimum gain — 0.05'ten 0.12'ye, kısa sessizliklerde ses kaybolmasın

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
        deEsser.gain.value = -2;               // 🔧 -2dB azaltma (-3 çok agresifti, sesi kısıyordu)

        // 🔥 7️⃣ PRESENCE BOOST — Ses netliği ve anlaşılırlığı artır
        // 2-5kHz bölgesi insan sesinin en anlaşılır kısmıdır (konsonantlar)
        const presenceBoost = audioContext.createBiquadFilter();
        presenceBoost.type = 'peaking';
        presenceBoost.frequency.value = 3000;   // 3kHz (konsonant enerji merkezi)
        presenceBoost.Q.value = 0.8;            // Geniş bant (doğal ses)
        presenceBoost.gain.value = 2;           // +2dB netlik artışı

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
        const speechThreshold = settings.speechThreshold || 25; // 🔥 Seviyeye göre eşik
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

            // Noise Gate mantığı - SEVİYEYE GÖRE AGRESİF
            const currentTime = audioContext.currentTime;
            if (cleanSignal > speechThreshold) { // 🔥 Konuşma algılandı (seviyeye göre eşik)
                if (!isGateOpen) {
                    noiseGateNode.gain.setTargetAtTime(1.0, currentTime, GATE_ATTACK);
                    isGateOpen = true;
                }
            } else { // Sessizlik - 🔥 GATE_FLOOR'a düşür (tamamen kapama)
                if (isGateOpen) {
                    noiseGateNode.gain.setTargetAtTime(GATE_FLOOR, currentTime, GATE_RELEASE);
                    isGateOpen = false;
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
