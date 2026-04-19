/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import { FaLock, FaEye, FaEyeSlash, FaSpinner, FaCheckCircle, FaGoogle } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';
import toast from '../../utils/toast';
import './PasswordSetupModal.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const PasswordSetupModal = ({ onClose, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: true,
        label: 'Password Setup',
    });

    const validatePassword = () => {
        if (password.length < 8) {
            toast.error(t('ui.password_en_az_8_karakter_olmalidir'));
            return false;
        }
        if (password !== confirmPassword) {
            toast.error(t('ui.encryptr_eslesmiyor'));
            return false;
        }
        // En az bir büyük harf, bir kk harf ve bir rakam
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (!hasUpperCase || !hasLowerCase || !hasNumber) {
            toast.error(t('ui.password_en_az_bir_buyuk_harf_bir_kucuk'));
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword()) return;

        setLoading(true);
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/users/change_password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    new_password: password,
                }),
            });

            if (response.ok) {
                setSuccess(true);
                toast.success(t('password.setSuccess'));
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                const data = await response.json();
                toast.error(data.error || t('password.setFailed'));
            }
        } catch (error) {
            logger.error('Password setup error:', error);
            toast.error(t('errors.generic_retry'));
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        toast.info(t('ui.passwordyi_daha_sonra_profile_ayarların'));
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

    const strengthColors = ['#f23f42', '#f0b232', '#f0b232', '#23a559', '#23a559', '#23a559'];
    const strengthLabels = [
        t('password.veryWeak'),
        t('password.weak'),
        t('password.medium'),
        t('password.good'),
        t('password.strong'),
        t('password.veryStrong'),
    ];
    const strength = getPasswordStrength();

    if (success) {
        return (
            <div className="password-setup-overlay" {...overlayProps}>
                <div className="password-setup-modal success" {...dialogProps}>
                    <div className="success-icon">
                        <FaCheckCircle />
                    </div>
                    <h2>{t('password.created')}</h2>
                    <p>{t('password.canLoginBoth')}</p>
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
                    <h2>{t('password.setup')}</h2>
                    <p>{t('password.googleLoginHint')}</p>
                </div>

                <form onSubmit={handleSubmit} className="password-setup-form">
                    <div className="input-group">
                        <label>{t('password.newPassword')}</label>
                        <div className="password-input-wrapper">
                            <FaLock className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('password.minChars')}
                                required
                                minLength={8}
                            />
                            <button
                                aria-label="Action button"
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
                                            key={`item-${i}`}
                                            className={`strength-bar ${i < strength ? 'active' : ''}`}
                                            style={{
                                                backgroundColor:
                                                    i < strength
                                                        ? strengthColors[strength - 1]
                                                        : undefined,
                                            }}
                                        />
                                    ))}
                                </div>
                                <span style={{ color: strengthColors[strength - 1] || '#949ba4' }}>
                                    {strengthLabels[strength - 1] || t('password.enterPassword')}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="input-group">
                        <label>{t('password.confirmPassword')}</label>
                        <div className="password-input-wrapper">
                            <FaLock className="input-icon" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={t('password.reenterPassword')}
                                required
                            />
                            <button
                                aria-label="Action button"
                                type="button"
                                className="toggle-visibility"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                            <span className="error-text">{t('password.mismatch')}</span>
                        )}
                        {confirmPassword && password === confirmPassword && (
                            <span className="success-text">✓ {t('password.match')}</span>
                        )}
                    </div>

                    <div className="password-requirements">
                        <p>{t('password.requirements')}:</p>
                        <ul>
                            <li className={password.length >= 8 ? 'met' : ''}>
                                {t('password.req8chars')}
                            </li>
                            <li className={/[A-Z]/.test(password) ? 'met' : ''}>
                                {t('password.reqUppercase')}
                            </li>
                            <li className={/[a-z]/.test(password) ? 'met' : ''}>
                                {t('password.reqLowercase')}
                            </li>
                            <li className={/[0-9]/.test(password) ? 'met' : ''}>
                                {t('password.reqNumber')}
                            </li>
                        </ul>
                    </div>

                    <div className="button-group">
                        <button
                            aria-label="Submit"
                            type="submit"
                            className="submit-btn"
                            disabled={
                                loading || password.length < 8 || password !== confirmPassword
                            }
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="spin" />
                                    {t('common.saving')}
                                </>
                            ) : (
                                <>
                                    <FaLock />
                                    {t('password.setPassword')}
                                </>
                            )}
                        </button>
                        <button
                            aria-label="handle Skip"
                            type="button"
                            className="skip-btn"
                            onClick={handleSkip}
                            disabled={loading}
                        >
                            {t('password.later')}
                        </button>
                    </div>
                </form>

                <div className="password-setup-footer">
                    <p>💡 {t('password.footerHint')}</p>
                </div>
            </div>
        </div>
    );
};

PasswordSetupModal.propTypes = {
    onClose: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default PasswordSetupModal;
