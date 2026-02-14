import { FaStar, FaCheck } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import { getPackageIcon } from './useCoinStore';

const card = (isPopular) => ({
    position: 'relative',
    background: isPopular
        ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(88, 101, 242, 0.05) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    borderRadius: '20px',
    padding: '28px',
    border: isPopular ? '2px solid rgba(88, 101, 242, 0.5)' : '2px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    boxShadow: isPopular
        ? '0 8px 32px rgba(88, 101, 242, 0.3), inset 0 0 60px rgba(88, 101, 242, 0.1)'
        : '0 4px 20px rgba(0, 0, 0, 0.3)',
    transform: 'translateY(0)',
    overflow: 'hidden'
});

const hoverShadow = (isPopular, enter) => isPopular
    ? enter ? '0 12px 48px rgba(88, 101, 242, 0.4), inset 0 0 80px rgba(88, 101, 242, 0.15)' : '0 8px 32px rgba(88, 101, 242, 0.3), inset 0 0 60px rgba(88, 101, 242, 0.1)'
    : enter ? '0 8px 32px rgba(255, 215, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.3)';

const hoverBorder = (isPopular, enter) => isPopular
    ? `2px solid rgba(88, 101, 242, ${enter ? 0.8 : 0.5})`
    : `2px solid ${enter ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`;

const buyBtn = (isPopular, loading) => ({
    width: '100%', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', color: 'white',
    background: isPopular ? 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)' : 'linear-gradient(135deg, #57f287 0%, #3ba55d 100%)',
    border: 'none', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    boxShadow: isPopular ? '0 6px 20px rgba(88, 101, 242, 0.4)' : '0 6px 20px rgba(87, 242, 135, 0.3)',
    opacity: loading ? 0.6 : 1, position: 'relative', zIndex: 1, overflow: 'hidden'
});

const btnShadow = (isPopular, enter) => isPopular
    ? `0 ${enter ? 8 : 6}px ${enter ? 28 : 20}px rgba(88, 101, 242, ${enter ? 0.6 : 0.4})`
    : `0 ${enter ? 8 : 6}px ${enter ? 28 : 20}px rgba(87, 242, 135, ${enter ? 0.5 : 0.3})`;

const PackageCard = ({ pkg, loading, selectedPackage, onPurchase }) => {
    const Icon = getPackageIcon(pkg.icon);
    const totalCoins = pkg.coins + (pkg.bonus || 0);
    const isPopular = pkg.popular;
    const isLoading = loading && selectedPackage === pkg.id;

    return (
        <div
            style={card(isPopular)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = hoverShadow(isPopular, true); e.currentTarget.style.border = hoverBorder(isPopular, true); }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = hoverShadow(isPopular, false); e.currentTarget.style.border = hoverBorder(isPopular, false); }}
        >
            {isPopular && <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(88, 101, 242, 0.1) 0%, transparent 70%)', animation: 'rotate 8s linear infinite', pointerEvents: 'none' }} />}

            {isPopular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '6px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(88, 101, 242, 0.4)', border: '1px solid rgba(255, 255, 255, 0.2)', animation: 'pulse 2s ease-in-out infinite' }}>
                    <FaStar style={{ fontSize: '12px' }} /> EN POPÜLER
                </div>
            )}

            {/* Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: isPopular ? '12px' : '0', position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isPopular ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.3) 0%, rgba(88, 101, 242, 0.1) 100%)' : 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)',
                    boxShadow: isPopular ? '0 0 40px rgba(88, 101, 242, 0.3), inset 0 0 20px rgba(88, 101, 242, 0.2)' : '0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
                    border: `2px solid ${isPopular ? 'rgba(88, 101, 242, 0.3)' : 'rgba(255, 215, 0, 0.2)'}`
                }}>
                    <Icon style={{ fontSize: '48px', color: isPopular ? '#5865f2' : '#ffd700', filter: `drop-shadow(0 0 15px ${isPopular ? 'rgba(88, 101, 242, 0.5)' : 'rgba(255, 215, 0, 0.5)'})` }} />
                </div>
            </div>

            {/* Name */}
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: '16px', textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', position: 'relative', zIndex: 1 }}>{pkg.name}</h3>

            {/* Coins */}
            <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '42px', fontWeight: 'bold', background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)', marginBottom: '8px' }}>
                    {pkg.coins.toLocaleString()}
                </div>
                {pkg.bonus && (
                    <>
                        <div style={{ fontSize: '16px', color: '#57f287', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px', textShadow: '0 0 10px rgba(87, 242, 135, 0.3)' }}>
                            <GiSparkles style={{ fontSize: '18px' }} /> +{pkg.bonus.toLocaleString()} Bonus!
                        </div>
                        <div style={{ fontSize: '13px', color: '#b9bbbe', marginTop: '6px' }}>Toplam: {totalCoins.toLocaleString()} coin</div>
                    </>
                )}
            </div>

            {/* Price */}
            <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white', textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)' }}>
                    {pkg.price.toFixed(2)} {pkg.currency}
                </div>
            </div>

            {/* Buy */}
            <button
                onClick={() => onPurchase(pkg)}
                disabled={loading}
                style={buyBtn(isPopular, loading)}
                onMouseEnter={(e) => { if (!loading) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = btnShadow(isPopular, true); } }}
                onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = btnShadow(isPopular, false); }}
            >
                {isLoading ? (
                    <><div style={{ width: '20px', height: '20px', border: '3px solid rgba(255, 255, 255, 0.3)', borderTop: '3px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> İşleniyor...</>
                ) : (
                    <><FaCheck style={{ fontSize: '18px' }} /> Satın Al</>
                )}
            </button>
        </div>
    );
};

export default PackageCard;
