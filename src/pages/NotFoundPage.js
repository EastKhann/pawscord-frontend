import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Inject 404 page animation styles once
if (typeof document !== 'undefined') {
    const _id = 'notfound-page-css';
    if (!document.getElementById(_id)) {
        const _s = document.createElement('style');
        _s.id = _id;
        _s.textContent = `
@keyframes nf404Float {
    0%, 100% { transform: translateY(0px) rotate(-3deg); }
    50% { transform: translateY(-14px) rotate(3deg); }
}
@keyframes nf404FadeIn {
    from { opacity: 0; transform: translateY(24px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes nf404PawBounce {
    0%, 100% { opacity: 0.15; transform: translateY(0) scale(1); }
    50% { opacity: 0.3; transform: translateY(-8px) scale(1.1); }
}
.nf404-container {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    height: 100vh; width: 100vw;
    background: radial-gradient(ellipse at 50% 50%, #13132a 0%, #0e0f14 70%);
    color: #e0e0e0; text-align: center; overflow: hidden; position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.nf404-content {
    animation: nf404FadeIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    position: relative; z-index: 2;
    display: flex; flex-direction: column; align-items: center;
}
.nf404-paw { font-size: 80px; animation: nf404Float 3.5s ease-in-out infinite; margin-bottom: 12px; }
.nf404-code {
    font-size: 96px; font-weight: 900; color: transparent;
    background: linear-gradient(135deg, #7c6ef0 0%, #a78bfa 50%, #818cf8 100%);
    -webkit-background-clip: text; background-clip: text;
    line-height: 1; margin: 0 0 8px; letter-spacing: -4px;
    text-shadow: none; filter: drop-shadow(0 4px 24px rgba(124,110,240,0.35));
}
.nf404-msg {
    font-size: 17px; color: #8b8fa8; margin: 0 0 32px; max-width: 320px;
    line-height: 1.6;
}
.nf404-btn {
    background: linear-gradient(135deg, #7c6ef0, #5865f2);
    color: #fff; border: none; padding: 13px 34px;
    border-radius: 12px; font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all 0.2s ease;
    box-shadow: 0 4px 20px rgba(88, 101, 242, 0.4);
}
.nf404-btn:hover {
    transform: translateY(-2px); box-shadow: 0 8px 28px rgba(88, 101, 242, 0.55);
}
.nf404-bg-paw {
    position: absolute; font-size: 120px; opacity: 0.06; pointer-events: none;
    animation: nf404PawBounce 4s ease-in-out infinite;
}`;
        document.head.appendChild(_s);
    }
}

export default function NotFoundPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="nf404-container" role="main">
            {/* Background decorative pawprints */}
            <span className="nf404-bg-paw" style={{ top: '10%', left: '8%', animationDelay: '0s' }}>🐾</span>
            <span className="nf404-bg-paw" style={{ top: '20%', right: '12%', animationDelay: '1.2s' }}>🐾</span>
            <span className="nf404-bg-paw" style={{ bottom: '15%', left: '15%', animationDelay: '0.6s' }}>🐾</span>
            <span className="nf404-bg-paw" style={{ bottom: '10%', right: '8%', animationDelay: '1.8s' }}>🐾</span>

            <div className="nf404-content">
                <div className="nf404-paw" role="img" aria-label={t('aria.pawIcon', 'Paw')}>🐾</div>
                <h1 className="nf404-code">404</h1>
                <p className="nf404-msg">
                    {t('errors.pageNotFound', 'This page could not be found.')}
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="nf404-btn"
                    aria-label={t('errors.goHome', 'Go Home')}
                >
                    {t('errors.goHome', 'Go Home')}
                </button>
            </div>
        </div>
    );
}
