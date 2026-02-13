// 🔥 YENİ: ICE servers backend'den alınacak (TURN credentials güvenliği için)
// Sadece STUN servers burada tanımlı (public ve güvenli)
export const DEFAULT_ICE_SERVERS = [
    // Google STUN (Reliable, public, free)
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
    // 🔥 YENİ: Ek STUN sunucuları (redundancy)
    { urls: "stun:stun.cloudflare.com:3478" },
    { urls: "stun:stun.services.mozilla.com:3478" },
    { urls: "stun:stun.stunprotocol.org:3478" },
    // 🔥 FALLBACK TURN: Sunucu TURN'a erişilemezse kullanılacak (OpenRelay - ücretsiz)
    {
        urls: "turn:openrelay.metered.ca:80",
        username: "openrelayproject",
        credential: "openrelayproject"
    },
    {
        urls: "turn:openrelay.metered.ca:443",
        username: "openrelayproject",
        credential: "openrelayproject"
    },
    {
        urls: "turn:openrelay.metered.ca:443?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject"
    }
];
// ⚠️ TURN servers Backend'den alınacak (güvenlik) - Fallback olarak yukarıdakiler kullanılır
// 🔥 REDUNDANT TURN: Birden fazla TURN server destegi icin backend API'den liste geliyor

// WebRTC Configuration (başlangıçta sadece STUN ile)
export let RTC_CONFIGURATION = {
    iceServers: DEFAULT_ICE_SERVERS,
    iceCandidatePoolSize: 10,
    iceTransportPolicy: 'all',
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require'
};

// Tek kaynaklı TURN yönetimi: join sırasında tekrar fetch etme, state'ten kullan
export const setRtcIceServers = (servers) => {
    RTC_CONFIGURATION = { ...RTC_CONFIGURATION, iceServers: servers };
};
