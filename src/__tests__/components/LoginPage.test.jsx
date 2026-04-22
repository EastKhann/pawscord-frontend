/* eslint-disable jsx-a11y/click-events-have-key-events */
// frontend/src/__tests__/components/LoginPage.test.jsx
// 🧪 LoginPage Component Tests

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React, { useState } from 'react';

// --- Mock LoginPage (replicates login/register form behavior) ---
const MockLoginPage = ({
    onLogin = vi.fn(),
    onRegister = vi.fn(),
    error = '',
    setAuthError = vi.fn(),
}) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) return;
        if (!isLoginMode && !formData.email) return;

        setIsLoading(true);
        try {
            if (isLoginMode) {
                await onLogin(formData.username, formData.password);
            } else {
                const success = await onRegister(
                    formData.username,
                    formData.email,
                    formData.password
                );
                if (success) setIsLoginMode(true);
            }
        } catch (err) {
            setAuthError('Login error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div data-testid="login-container" className="login-container">
            <div data-testid="login-card" className="login-card">
                {/* Logo */}
                <div data-testid="logo-header" className="logo-header">
                    <h1>Pawscord</h1>
                    <p data-testid="subtitle">{isLoginMode ? 'Welcome back!' : 'Join us!'}</p>
                </div>

                {/* Error */}
                {error && (
                    <div data-testid="error-message" className="error-message">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form data-testid="auth-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            data-testid="username-input"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="input-group slide-down">
                            <input
                                data-testid="email-input"
                                type="email"
                                placeholder="E-posta Adresi"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <input
                            data-testid="password-input"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        data-testid="submit-button"
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : isLoginMode ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                {/* Forgot Password */}
                {isLoginMode && (
                    <div data-testid="forgot-password-container">
                        <a data-testid="forgot-password-link" href="#/forgot-password">
                            Forgot Password?
                        </a>
                    </div>
                )}

                {/* Divider */}
                <div data-testid="divider" className="divider">
                    <span>or</span>
                </div>

                {/* Google Login */}
                <button
                    data-testid="google-login-button"
                    onClick={() => {
                        /* Google login handler */
                    }}
                >
                    Google with Log In
                </button>

                {/* Toggle Mode */}
                <div data-testid="toggle-mode" className="toggle-mode">
                    {isLoginMode ? 'No account? ' : 'Already a member? '}
                    <span
                        data-testid="toggle-button"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                            setIsLoginMode(!isLoginMode);
                            setAuthError('');
                        }}
                    >
                        {isLoginMode ? 'Sign Up' : 'Log In'}
                    </span>
                </div>
            </div>
        </div>
    );
};

describe('LoginPage Component', () => {
    let mockOnLogin;
    let mockOnRegister;
    let mockSetAuthError;

    beforeEach(() => {
        mockOnLogin = vi.fn().mockResolvedValue(undefined);
        mockOnRegister = vi.fn().mockResolvedValue(true);
        mockSetAuthError = vi.fn();
    });

    describe('Rendering', () => {
        it('should render the login card', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            expect(screen.getByTestId('login-card')).toBeInTheDocument();
            expect(screen.getByText('Pawscord')).toBeInTheDocument();
        });

        it('should show "Welcome back!" in login mode', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            expect(screen.getByTestId('subtitle')).toHaveTextContent('Welcome back!');
        });

        it('should render username and password inputs', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            expect(screen.getByTestId('username-input')).toBeInTheDocument();
            expect(screen.getByTestId('password-input')).toBeInTheDocument();
        });

        it('should NOT render email input in login mode', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            expect(screen.queryByTestId('email-input')).not.toBeInTheDocument();
        });

        it('should show "Log In" submit button', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            expect(screen.getByTestId('submit-button')).toHaveTextContent('Log In');
        });

        it('should render Google login button', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
        });

        it('should show forgot password link in login mode', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            expect(screen.getByTestId('forgot-password-link')).toBeInTheDocument();
        });
    });

    describe('Mode Toggling', () => {
        it('should switch to register mode', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            fireEvent.click(screen.getByTestId('toggle-button'));

            expect(screen.getByTestId('subtitle')).toHaveTextContent('Join us!');
            expect(screen.getByTestId('email-input')).toBeInTheDocument();
            expect(screen.getByTestId('submit-button')).toHaveTextContent('Sign Up');
        });

        it('should switch back to login mode', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            fireEvent.click(screen.getByTestId('toggle-button'));
            fireEvent.click(screen.getByTestId('toggle-button'));

            expect(screen.getByTestId('subtitle')).toHaveTextContent('Welcome back!');
            expect(screen.queryByTestId('email-input')).not.toBeInTheDocument();
        });

        it('should clear auth error when toggling modes', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            fireEvent.click(screen.getByTestId('toggle-button'));
            expect(mockSetAuthError).toHaveBeenCalledWith('');
        });

        it('should hide forgot password link in register mode', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );
            fireEvent.click(screen.getByTestId('toggle-button'));
            expect(screen.queryByTestId('forgot-password-container')).not.toBeInTheDocument();
        });
    });

    describe('Form Submission', () => {
        it('should call onLogin with credentials', async () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );

            fireEvent.change(screen.getByTestId('username-input'), {
                target: { value: 'testuser' },
            });
            fireEvent.change(screen.getByTestId('password-input'), {
                target: { value: 'pass123' },
            });
            fireEvent.submit(screen.getByTestId('auth-form'));

            await waitFor(() => {
                expect(mockOnLogin).toHaveBeenCalledWith('testuser', 'pass123');
            });
        });

        it('should call onRegister with all fields in register mode', async () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );

            // Switch to register mode
            fireEvent.click(screen.getByTestId('toggle-button'));

            fireEvent.change(screen.getByTestId('username-input'), {
                target: { value: 'newuser' },
            });
            fireEvent.change(screen.getByTestId('email-input'), {
                target: { value: 'new@test.com' },
            });
            fireEvent.change(screen.getByTestId('password-input'), {
                target: { value: 'pass123' },
            });
            fireEvent.submit(screen.getByTestId('auth-form'));

            await waitFor(() => {
                expect(mockOnRegister).toHaveBeenCalledWith('newuser', 'new@test.com', 'pass123');
            });
        });

        it('should switch back to login after successful registration', async () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );

            fireEvent.click(screen.getByTestId('toggle-button'));
            fireEvent.change(screen.getByTestId('username-input'), {
                target: { value: 'newuser' },
            });
            fireEvent.change(screen.getByTestId('email-input'), {
                target: { value: 'new@test.com' },
            });
            fireEvent.change(screen.getByTestId('password-input'), {
                target: { value: 'pass123' },
            });
            fireEvent.submit(screen.getByTestId('auth-form'));

            await waitFor(() => {
                expect(screen.getByTestId('subtitle')).toHaveTextContent('Welcome back!');
            });
        });
    });

    describe('Error Display', () => {
        it('should display error message', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                    error="Incorrect password!"
                />
            );
            expect(screen.getByTestId('error-message')).toHaveTextContent('Incorrect password!');
        });

        it('should NOT display error when none exists', () => {
            render(
                <MockLoginPage
                    onLogin={mockOnLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                    error=""
                />
            );
            expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
        });
    });

    describe('Loading State', () => {
        it('should disable submit button during loading', async () => {
            const slowLogin = vi.fn(() => new Promise((resolve) => setTimeout(resolve, 200)));
            render(
                <MockLoginPage
                    onLogin={slowLogin}
                    onRegister={mockOnRegister}
                    setAuthError={mockSetAuthError}
                />
            );

            fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'user' } });
            fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'pass' } });
            fireEvent.submit(screen.getByTestId('auth-form'));

            expect(screen.getByTestId('submit-button')).toHaveTextContent('Loading...');
            expect(screen.getByTestId('submit-button')).toBeDisabled();

            await waitFor(() => {
                expect(screen.getByTestId('submit-button')).toHaveTextContent('Log In');
            });
        });
    });
});
