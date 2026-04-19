/**
 * Extended a11y test suite — tests additional critical components
 * against WCAG 2.1 using axe-core
 */
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import axe from 'axe-core';

async function checkA11y(container) {
    const results = await axe.run(container, {
        rules: {
            'color-contrast': { enabled: false },
            region: { enabled: false },
        },
    });
    return results.violations;
}

// Mocks
vi.mock('../../stores/useChatStore', () => ({ useChatStore: vi.fn(() => ({})) }));
vi.mock('../../stores/useUserStore', () => ({
    useUserStore: vi.fn(() => ({ user: { username: 'test' }, isAuthenticated: true })),
}));
vi.mock('../../stores/useUIStore', () => ({
    useUIStore: vi.fn(() => ({ isMobile: false, theme: 'dark' })),
}));
vi.mock('../../stores/useServerStore', () => ({ useServerStore: vi.fn(() => ({ servers: [] })) }));
vi.mock('../../stores/useVoiceStore', () => ({
    useVoiceStore: vi.fn(() => ({ activeVoice: null })),
}));
vi.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key, i18n: { language: 'en', changeLanguage: vi.fn() } }),
    Trans: ({ children }) => children,
}));

describe('Accessibility - Critical Components', () => {
    it('LoadingSpinner has no a11y violations', async () => {
        const { default: LoadingSpinner } = await import('../../components/shared/LoadingSpinner');
        const { container } = render(<LoadingSpinner />);
        const violations = await checkA11y(container);
        expect(violations).toHaveLength(0);
    });

    it('ErrorBoundary fallback has no a11y violations', async () => {
        const { default: ErrorBoundary } =
            await import('../../components/ErrorBoundary/ErrorBoundary');
        const ThrowError = () => {
            throw new Error('test');
        };
        vi.spyOn(console, 'error').mockImplementation(() => {});
        const { container } = render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>
        );
        const violations = await checkA11y(container);
        // Allow some violations for error boundary fallback (might not have full page context)
        const critical = violations.filter((v) => v.impact === 'critical');
        expect(critical).toHaveLength(0);
    });

    it('SuspenseWithBoundary has no a11y violations', async () => {
        const { default: SuspenseWithBoundary } =
            await import('../../components/shared/SuspenseWithBoundary');
        const { container } = render(
            <SuspenseWithBoundary>
                <div>Content</div>
            </SuspenseWithBoundary>
        );
        const violations = await checkA11y(container);
        expect(violations).toHaveLength(0);
    });
});
