/**
 * Accessibility (a11y) Tests — axe-core integration
 *
 * Uses axe-core to automatically detect WCAG 2.1 violations
 * in rendered React components. Runs as part of vitest suite.
 *
 * @see https://github.com/dequelabs/axe-core
 */
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React, { Suspense } from 'react';
import axe from 'axe-core';

// ── Helper: run axe on a rendered container ─────────────────────
async function checkA11y(container, options = {}) {
    const results = await axe.run(container, {
        rules: {
            // Disable rules that don't apply in jsdom or are noise:
            'color-contrast': { enabled: false }, // jsdom can't compute colors
            'region': { enabled: false }, // components aren't full pages
            ...options.rules,
        },
        ...options,
    });
    return results.violations;
}

function formatViolations(violations) {
    return violations
        .map(
            (v) =>
                `[${v.impact}] ${v.id}: ${v.description}\n` +
                v.nodes.map((n) => `  → ${n.html}`).join('\n')
        )
        .join('\n\n');
}

// ── Mock providers for components that need store/context ───────
vi.mock('../../stores/useChatStore', () => ({
    useChatStore: vi.fn(() => ({})),
}));
vi.mock('../../stores/useUserStore', () => ({
    useUserStore: vi.fn(() => ({
        username: 'testuser',
        isAdmin: false,
    })),
}));
vi.mock('../../stores/useUIStore', () => ({
    useUIStore: vi.fn(() => ({
        isMobile: false,
        theme: 'dark',
    })),
}));
vi.mock('../../stores/useServerStore', () => ({
    useServerStore: vi.fn(() => ({
        servers: [],
        activeServer: null,
    })),
}));

// ── Tests ───────────────────────────────────────────────────────

describe('Accessibility: Core Components', () => {
    it('ScrollToBottomButton has no critical a11y violations', async () => {
        const { default: ScrollToBottomButton } = await import(
            '../../components/ScrollToBottomButton'
        );
        const { container } = render(
            <ScrollToBottomButton onClick={() => { }} unreadCount={0} />
        );
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });

    it('LoadingSkeleton has no critical a11y violations', async () => {
        const { default: LoadingSkeleton } = await import(
            '../../components/LoadingSkeleton'
        );
        const { container } = render(<LoadingSkeleton />);
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });

    it('MessageSkeleton has no critical a11y violations', async () => {
        const { default: MessageSkeleton } = await import(
            '../../components/MessageSkeleton'
        );
        const { container } = render(<MessageSkeleton count={3} />);
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });

    it('TypingIndicatorEnhanced has no critical a11y violations', async () => {
        const { default: TypingIndicatorEnhanced } = await import(
            '../../components/TypingIndicatorEnhanced'
        );
        const { container } = render(
            <TypingIndicatorEnhanced users={['alice', 'bob']} />
        );
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });

    it('RouteErrorBoundary has no critical a11y violations', async () => {
        const { default: RouteErrorBoundary } = await import(
            '../../components/RouteErrorBoundary'
        );
        const { container } = render(
            <RouteErrorBoundary>
                <div>Child content</div>
            </RouteErrorBoundary>
        );
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });
});

describe('Accessibility: Interactive Components', () => {
    it('buttons are keyboard accessible', async () => {
        const { container } = render(
            <div>
                <button aria-label="Send message">Send</button>
                <button aria-label="Upload file">Upload</button>
                <a href="#channel" aria-label="Go to channel">
                    Channel
                </a>
            </div>
        );
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });

    it('form elements have labels', async () => {
        const { container } = render(
            <form role="form" aria-label="Test form">
                <label htmlFor="test-input">Username</label>
                <input id="test-input" type="text" />
                <button type="submit">Submit</button>
            </form>
        );
        const violations = await checkA11y(container);
        expect(violations).toEqual([]);
    });

    it('dialog pattern is accessible', async () => {
        const { container } = render(
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
            >
                <h2 id="dialog-title">Confirm Action</h2>
                <p>Are you sure?</p>
                <button>Cancel</button>
                <button>Confirm</button>
            </div>
        );
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });

    it('navigation landmark is accessible', async () => {
        const { container } = render(
            <nav aria-label="Server list">
                <ul role="list">
                    <li role="listitem">
                        <button aria-label="Home" aria-selected="true">
                            Home
                        </button>
                    </li>
                    <li role="listitem">
                        <button aria-label="Server A" aria-selected="false">
                            A
                        </button>
                    </li>
                </ul>
            </nav>
        );
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });

    it('menu pattern is accessible', async () => {
        const { container } = render(
            <div role="menu" aria-label="Chat tools">
                <button role="menuitem">Pin message</button>
                <button role="menuitem">Delete message</button>
                <button role="menuitem">Report</button>
            </div>
        );
        const violations = await checkA11y(container);
        const critical = violations.filter(
            (v) => v.impact === 'critical' || v.impact === 'serious'
        );
        expect(critical).toEqual([]);
    });
});

describe('Accessibility: WCAG 2.1 Pattern Compliance', () => {
    it('images have alt text', async () => {
        const { container } = render(
            <div>
                <img src="avatar.png" alt="User avatar" />
                <img src="icon.svg" alt="" role="presentation" />
            </div>
        );
        const violations = await checkA11y(container);
        expect(violations).toEqual([]);
    });

    it('live regions announce changes', async () => {
        const { container } = render(
            <div>
                <div role="status" aria-live="polite">
                    3 new messages
                </div>
                <div role="log" aria-live="polite" aria-relevant="additions">
                    <div>Message 1</div>
                    <div>Message 2</div>
                </div>
            </div>
        );
        const violations = await checkA11y(container);
        expect(violations).toEqual([]);
    });

    it('heading hierarchy is correct', async () => {
        const { container } = render(
            <div>
                <h1>Pawscord</h1>
                <h2>General Channel</h2>
                <h3>Pinned Messages</h3>
            </div>
        );
        const violations = await checkA11y(container);
        expect(violations).toEqual([]);
    });
});
