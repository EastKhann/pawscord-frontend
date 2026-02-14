import toast from '../../utils/toast';

const BoostTab = ({ styles, loading, setLoading, token, API_BASE_URL }) => {
    const handleBoost = async () => {
        const serverId = prompt('Boost yapmak istediğin sunucu ID\'sini gir:');
        if (!serverId) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/servers/boost/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: serverId, level: 1 })
            });
            const data = await res.json();
            if (data.status === 'boosted') {
                toast.success('🚀 Sunucu başarıyla boost edildi!');
            } else {
                toast.error(`❌ ${data.error || 'Boost yapılamadı'}`);
            }
        } catch (err) {
            toast.error('❌ Bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.boostTab}>
            <div style={styles.boostHeader}>
                <h3 style={styles.boostTitle}>
                    <span style={styles.boostIcon}>🚀</span>
                    Server Boosting
                </h3>
                <p style={styles.boostSubtitle}>
                    Sevdiğin sunucuları güçlendir ve özel özellikler kazan!
                </p>
            </div>

            <div style={styles.boostTiersContainer}>
                {/* Seviye 1 */}
                <div style={{ ...styles.boostTierCard, borderColor: '#cd7f32' }}>
                    <div style={{ ...styles.tierBadge, background: 'linear-gradient(135deg, #cd7f32, #a0522d)' }}>
                        <span style={styles.tierNumber}>1</span>
                    </div>
                    <h4 style={styles.tierTitle}>Seviye 1</h4>
                    <p style={styles.tierRequirement}>2 Boost gerekli</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🎨</span> 100 emoji slot</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🎵</span> 256 kbps ses kalitesi</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>📁</span> 50 MB dosya yükleme</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>✨</span> Animated sunucu ikonu</li>
                    </ul>
                </div>

                {/* Seviye 2 */}
                <div style={{ ...styles.boostTierCard, borderColor: '#c0c0c0', transform: 'scale(1.02)' }}>
                    <div style={{ ...styles.tierBadge, background: 'linear-gradient(135deg, #c0c0c0, #808080)' }}>
                        <span style={styles.tierNumber}>2</span>
                    </div>
                    <div style={styles.popularBadge}>⭐ Popüler</div>
                    <h4 style={styles.tierTitle}>Seviye 2</h4>
                    <p style={styles.tierRequirement}>7 Boost gerekli</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🎨</span> 150 emoji slot</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🎵</span> 384 kbps ses kalitesi</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>📁</span> 100 MB dosya yükleme</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>📺</span> 1080p Go Live stream</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🔗</span> Özel davet linki</li>
                    </ul>
                </div>

                {/* Seviye 3 */}
                <div style={{ ...styles.boostTierCard, borderColor: '#ffd700', boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
                    <div style={{ ...styles.tierBadge, background: 'linear-gradient(135deg, #ffd700, #ff8c00)' }}>
                        <span style={styles.tierNumber}>3</span>
                    </div>
                    <div style={{ ...styles.premiumBadge }}>👑 Premium</div>
                    <h4 style={styles.tierTitle}>Seviye 3</h4>
                    <p style={styles.tierRequirement}>14 Boost gerekli</p>
                    <ul style={styles.tierFeatureList}>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🎨</span> 250 emoji slot</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🎵</span> 384 kbps ses kalitesi</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>📁</span> 500 MB dosya yükleme</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>📺</span> 4K Go Live 60FPS</li>
                        <li style={styles.tierFeature}><span style={styles.featureIcon}>🔊</span> Özel ses efektleri</li>
                    </ul>
                </div>
            </div>

            <button
                onClick={handleBoost}
                style={styles.boostPurchaseButton}
                disabled={loading}
            >
                <span style={styles.boostButtonIcon}>🚀</span>
                Boost Satın Al (19.99 TL/ay)
            </button>
        </div>
    );
};

export default BoostTab;
