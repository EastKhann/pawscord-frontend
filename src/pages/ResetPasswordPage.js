// frontend/src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ResetPasswordPage = ({ apiBaseUrl }) => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [error, setError] = useState('');

    const getPasswordStrength = (pass) => {
        if (pass.length === 0) return { score: 0, text: '', color: '' };
        if (pass.length < 6) return { score: 1, text: 'Çok Zayıf', color: '#da373c' };
        if (pass.length < 8) return { score: 2, text: 'Zayıf', color: '#f0b132' };
        if (pass.length < 12) return { score: 3, text: 'Orta', color: '#5865f2' };
        if (pass.length < 16) return { score: 4, text: 'Güçlü', color: '#23a559' };
        return { score: 5, text: 'Çok Güçlü', color: '#23a559' };
    };

    const strength = getPasswordStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalı');
            return;
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch(`${apiBaseUrl}/auth/reset-password/${token}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(data.error || 'Şifre sıfırlama başarısız oldu');
                setStatus('error');
            }
        } catch (error) {
            setError('Bağlantı hatası oluştu');
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <FaCheckCircle style={{...styles.icon, color: '#23a559'}} />
                    <h2 style={styles.title}>✅ Şifre Değiştirildi!</h2>
                    <p style={styles.text}>
                        Şifreniz başarıyla değiştirildi.
                    </p>
                    <p style={styles.redirect}>
                        3 saniye içinde giriş sayfasına yönlendirileceksiniz...
                    </p>
                    <button onClick={() => navigate('/login')} style={styles.button}>
                        Hemen Giriş Yap
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <FaTimesCircle style={{...styles.icon, color: '#da373c'}} />
                    <h2 style={styles.title}>❌ Hata</h2>
                    <p style={styles.text}>{error}</p>
                    <div style={styles.errorReasons}>
                        <p style={styles.reasonTitle}>Olası sebepler:</p>
                        <ul style={styles.reasonList}>
                            <li>Link süresi dolmuş olabilir (1 saat)</li>
                            <li>Link daha önce kullanılmış olabilir</li>
                            <li>Geçersiz bir link olabilir</li>
                        </ul>
                    </div>
                    <button onClick={() => navigate('/forgot-password')} style={styles.button}>
                        Yeni Link İste
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <FaLock style={styles.icon} />
                <h2 style={styles.title}>Yeni Şifre Belirle</h2>
                <p style={styles.text}>
                    Hesabınız için yeni bir şifre oluşturun.
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Password Input */}
                    <div style={styles.inputContainer}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Yeni şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            disabled={status === 'loading'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={styles.eyeButton}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Password Strength */}
                    {password && (
                        <div style={styles.strengthContainer}>
                            <div style={styles.strengthBar}>
                                <div
                                    style={{
                                        ...styles.strengthFill,
                                        width: `${(strength.score / 5) * 100}%`,
                                        backgroundColor: strength.color
                                    }}
                                />
                            </div>
                            <span style={{...styles.strengthText, color: strength.color}}>
                                {strength.text}
                            </span>
                        </div>
                    )}

                    {/* Confirm Password Input */}
                    <div style={styles.inputContainer}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Şifre tekrar"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={styles.input}
                            disabled={status === 'loading'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeButton}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Match Indicator */}
                    {confirmPassword && (
                        <div style={password === confirmPassword ? styles.matchGood : styles.matchBad}>
                            {password === confirmPassword ? '✅ Şifreler eşleşiyor' : '❌ Şifreler eşleşmiyor'}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div style={styles.error}>
                            ❌ {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={styles.submitButton}
                        disabled={status === 'loading' || password !== confirmPassword}
                    >
                        {status === 'loading' ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
                    </button>
                </form>

                <div style={styles.info}>
                    <p style={styles.infoTitle}>💡 Güçlü Şifre İpuçları:</p>
                    <ul style={styles.infoList}>
                        <li>En az 8 karakter kullanın</li>
                        <li>Büyük ve küçük harf karışımı</li>
                        <li>Rakam ve özel karakter ekleyin</li>
                        <li>Kolay tahmin edilebilir şifrelerden kaçının</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1f22',
        padding: '20px'
    },
    card: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    },
    icon: {
        fontSize: '64px',
        color: '#5865f2',
        display: 'block',
        margin: '0 auto 20px'
    },
    title: {
        color: '#fff',
        fontSize: '28px',
        textAlign: 'center',
        margin: '0 0 10px 0'
    },
    text: {
        color: '#b9bbbe',
        fontSize: '16px',
        textAlign: 'center',
        marginBottom: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    inputContainer: {
        position: 'relative'
    },
    input: {
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '12px',
        paddingRight: '45px',
        color: '#fff',
        fontSize: '16px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box'
    },
    eyeButton: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '18px'
    },
    strengthContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    strengthBar: {
        flex: 1,
        height: '6px',
        backgroundColor: '#1e1f22',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    strengthFill: {
        height: '100%',
        transition: 'all 0.3s'
    },
    strengthText: {
        fontSize: '12px',
        fontWeight: 'bold',
        minWidth: '80px'
    },
    matchGood: {
        color: '#23a559',
        fontSize: '14px',
        textAlign: 'center'
    },
    matchBad: {
        color: '#da373c',
        fontSize: '14px',
        textAlign: 'center'
    },
    error: {
        backgroundColor: '#da373c',
        color: '#fff',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '14px',
        textAlign: 'center'
    },
    submitButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '12px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    button: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px',
        display: 'block',
        width: '100%'
    },
    redirect: {
        color: '#747f8d',
        fontSize: '14px',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: '10px'
    },
    info: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '20px'
    },
    infoTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0 0 10px 0'
    },
    infoList: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px'
    },
    errorReasons: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '10px',
        textAlign: 'left'
    },
    reasonTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    reasonList: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: 0,
        paddingLeft: '20px'
    }
};

export default ResetPasswordPage;



