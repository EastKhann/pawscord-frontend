import { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash, FaSpinner, FaCheckCircle, FaGoogle } from 'react-icons/fa';
import useModalA11y from '../hooks/useModalA11y';
import toast from '../utils/toast';
import './PasswordSetupModal.css';

const PasswordSetupModal = ({ onClose, apiBaseUrl }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: true, label: 'Password Setup' });

    const validatePassword = () => {
        if (password.length < 8) {
            toast.error('Şifre en az 8 karakter olmalıdır');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Şifreler eşleşmiyor');
            return false;
        }
        // En az bir büyük harf, bir küçük harf ve bir rakam
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            toast.error('Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/users/change_password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    new_password: password
                })
            });

            if (response.ok) {
                setSuccess(true);
                toast.success('✅ Şifre başarıyla belirlendi!');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                const data = await response.json();
                toast.error(data.error || 'Şifre belirlenemedi');
            }
        } catch (error) {
            console.error('Password setup error:', error);
            toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        toast.info('Şifreyi daha sonra profil ayarlarından belirleyebilirsin');
        onClose();
    };

    const getPasswordStrength = () => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strengthColors = ['#f04747', '#faa61a', '#faa61a', '#43b581', '#43b581', '#43b581'];
    const strengthLabels = ['Çok Zayıf', 'Zayıf', 'Orta', 'İyi', 'Güçlü', 'Çok Güçlü'];
    const strength = getPasswordStrength();

    if (success) {
        return (
            <div className="password-setup-overlay" {...overlayProps}>
                <div className="password-setup-modal success" {...dialogProps}>
                    <div className="success-icon">
                        <FaCheckCircle />
                    </div>
                    <h2>Şifre Belirlendi!</h2>
                    <p>Artık e-posta ve şifrenle de giriş yapabilirsin.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="password-setup-overlay" {...overlayProps}>
            <div className="password-setup-modal" {...dialogProps}>
                <div className="password-setup-header">
                    <div className="header-icon">
                        <FaGoogle className="google-icon" />
                        <FaLock className="lock-icon" />
                    </div>
                    <h2>Şifre Belirle</h2>
                    <p>
                        Google ile giriş yaptın! Hesabını daha güvenli hale getirmek için
                        bir şifre belirleyebilirsin.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="password-setup-form">
                    <div className="input-group">
                        <label>Yeni Şifre</label>
                        <div className="password-input-wrapper">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="En az 8 karakter"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                className="toggle-visibility"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {password && (
                            <div className="password-strength">
                                <div className="strength-bars">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`strength-bar ${i < strength ? 'active' : ''}`}
                                            style={{ backgroundColor: i < strength ? strengthColors[strength - 1] : undefined }}
                                        />
                                    ))}
                                </div>
                                <span style={{ color: strengthColors[strength - 1] || '#72767d' }}>
                                    {strengthLabels[strength - 1] || 'Şifre girin'}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <label>Şifre Tekrar</label>
                        <div className="password-input-wrapper">
                            <FaLock className="input-icon" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Şifreyi tekrar girin"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-visibility"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                            <span className="error-text">Şifreler eşleşmiyor</span>
                        )}
                        {confirmPassword && password === confirmPassword && (
                            <span className="success-text">✓ Şifreler eşleşiyor</span>
                        )}
                    </div>

                    <div className="password-requirements">
                        <p>Şifre gereksinimleri:</p>
                        <ul>
                            <li className={password.length >= 8 ? 'met' : ''}>
                                En az 8 karakter
                            </li>
                            <li className={/[A-Z]/.test(password) ? 'met' : ''}>
                                En az bir büyük harf (A-Z)
                            </li>
                            <li className={/[a-z]/.test(password) ? 'met' : ''}>
                                En az bir küçük harf (a-z)
                            </li>
                            <li className={/[0-9]/.test(password) ? 'met' : ''}>
                                En az bir rakam (0-9)
                            </li>
                        </ul>
                    </div>

                    <div className="button-group">
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading || password.length < 8 || password !== confirmPassword}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="spin" />
                                    Kaydediliyor...
                                </>
                            ) : (
                                <>
                                    <FaLock />
                                    Şifreyi Belirle
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            className="skip-btn"
                            onClick={handleSkip}
                            disabled={loading}
                        >
                            Daha Sonra
                        </button>
                    </div>
                </form>

                <div className="password-setup-footer">
                    <p>
                        💡 Şifreyi belirlersen hem Google hem de e-posta/şifre ile giriş yapabilirsin.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordSetupModal;
