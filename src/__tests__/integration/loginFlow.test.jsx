import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../utils/logger', () => ({
    default: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('../../utils/recaptcha', () => ({
    useRecaptcha: () => ({ getToken: vi.fn().mockResolvedValue('mock-token') }),
}));

import LoginPage from '../../LoginPage';

describe('LoginPage integration', () => {
    const defaultProps = {
        onLogin: vi.fn().mockResolvedValue(true),
        onRegister: vi.fn().mockResolvedValue(true),
        error: '',
        setAuthError: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login form by default', () => {
        render(<LoginPage {...defaultProps} />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('submits login with credentials', async () => {
        render(<LoginPage {...defaultProps} />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass123' } });

        const form = screen.getByLabelText(/username/i).closest('form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(defaultProps.onLogin).toHaveBeenCalledWith('testuser', 'pass123', 'mock-token');
        });
    });

    it('switches to register mode', () => {
        render(<LoginPage {...defaultProps} />);
        const switchBtn = screen.getByText(/register|sign up|create/i);
        fireEvent.click(switchBtn);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('submits registration with credentials', async () => {
        render(<LoginPage {...defaultProps} />);
        // Switch to register mode
        const switchBtn = screen.getByText(/register|sign up|create/i);
        fireEvent.click(switchBtn);

        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@test.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass456' } });

        const form = screen.getByLabelText(/username/i).closest('form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(defaultProps.onRegister).toHaveBeenCalledWith(
                'newuser',
                'new@test.com',
                'pass456',
                'mock-token'
            );
        });
    });

    it('displays error message', () => {
        render(<LoginPage {...defaultProps} error="Invalid credentials" />);
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('error message has role="alert"', () => {
        render(<LoginPage {...defaultProps} error="Bad request" />);
        const alert = screen.getByRole('alert');
        expect(alert).toHaveTextContent('Bad request');
    });

    it('has aria-labels on all inputs', () => {
        render(<LoginPage {...defaultProps} />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });
});
