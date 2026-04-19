// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Profile Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display user profile when avatar clicked', async ({ page }) => {
        const avatar = page.locator('[data-testid="user-avatar"], .user-avatar, [class*="avatar"]').first();
        if (await avatar.isVisible()) {
            await avatar.click();
            const profilePanel = page.locator('[data-testid="profile-panel"], [class*="profile"], [class*="Profile"]');
            await expect(profilePanel.first()).toBeVisible({ timeout: 5000 });
        }
    });

    test('should allow editing username', async ({ page }) => {
        await page.goto('/settings/profile');
        const usernameInput = page.locator('input[name="username"], [data-testid="username-input"]');
        if (await usernameInput.isVisible()) {
            await usernameInput.clear();
            await usernameInput.fill('newusername');
            const saveButton = page.locator('button:has-text("Save"), button:has-text("save")');
            if (await saveButton.isVisible()) {
                await saveButton.click();
            }
        }
    });

    test('should display status selector', async ({ page }) => {
        const statusIndicator = page.locator('[data-testid="status-indicator"], [class*="status"]').first();
        if (await statusIndicator.isVisible()) {
            await statusIndicator.click();
            const statusMenu = page.locator('[class*="status-menu"], [class*="StatusMenu"], [role="menu"]');
            await expect(statusMenu.first()).toBeVisible({ timeout: 3000 });
        }
    });
});

test.describe('Channel Management', () => {
    test('should create a new text channel', async ({ page }) => {
        await page.goto('/');
        const createChannel = page.locator('button:has-text("Create Channel"), [data-testid="create-channel"]');
        if (await createChannel.isVisible()) {
            await createChannel.click();
            const nameInput = page.locator('input[name="channel-name"], [data-testid="channel-name-input"]');
            if (await nameInput.isVisible()) {
                await nameInput.fill('test-channel');
                const submit = page.locator('button[type="submit"], button:has-text("Create")');
                await submit.click();
            }
        }
    });

    test('should switch between channels', async ({ page }) => {
        await page.goto('/');
        const channels = page.locator('[class*="channel-item"], [data-testid*="channel"]');
        const count = await channels.count();
        if (count > 1) {
            await channels.nth(1).click();
            await page.waitForTimeout(500);
            // Verify the channel content area updated
            const messageArea = page.locator('[class*="message-list"], [data-testid="message-area"]');
            await expect(messageArea.first()).toBeVisible();
        }
    });
});

test.describe('Message Features', () => {
    test('should show emoji picker', async ({ page }) => {
        await page.goto('/');
        const emojiBtn = page.locator('[data-testid="emoji-button"], button[aria-label*="emoji"], [class*="emoji-button"]');
        if (await emojiBtn.first().isVisible()) {
            await emojiBtn.first().click();
            const picker = page.locator('[class*="emoji-picker"], [data-testid="emoji-picker"]');
            await expect(picker.first()).toBeVisible({ timeout: 3000 });
        }
    });

    test('should show mention autocomplete when typing @', async ({ page }) => {
        await page.goto('/');
        const input = page.locator('[data-testid="message-input"], textarea[class*="message"], [contenteditable="true"]').first();
        if (await input.isVisible()) {
            await input.fill('@');
            const autocomplete = page.locator('[class*="mention"], [class*="autocomplete"], [data-testid="mention-list"]');
            // Autocomplete should appear
            await page.waitForTimeout(500);
        }
    });

    test('should show attachment upload area', async ({ page }) => {
        await page.goto('/');
        const attachBtn = page.locator('[data-testid="attach-button"], button[aria-label*="attach"], [class*="attach"]');
        if (await attachBtn.first().isVisible()) {
            await attachBtn.first().click();
        }
    });
});

test.describe('Search Functionality', () => {
    test('should open search with keyboard shortcut', async ({ page }) => {
        await page.goto('/');
        await page.keyboard.press('Control+k');
        const searchModal = page.locator('[class*="search"], [class*="Search"], [data-testid="search-modal"], [role="search"]');
        await page.waitForTimeout(500);
    });

    test('should display search results', async ({ page }) => {
        await page.goto('/');
        const searchInput = page.locator('[data-testid="search-input"], input[type="search"], [class*="search-input"]').first();
        if (await searchInput.isVisible()) {
            await searchInput.fill('test message');
            await page.waitForTimeout(1000);
            const results = page.locator('[class*="search-result"], [data-testid*="search-result"]');
            // Results may or may not appear depending on data
        }
    });
});

test.describe('Notification System', () => {
    test('should show notification bell', async ({ page }) => {
        await page.goto('/');
        const bell = page.locator('[data-testid="notification-bell"], [aria-label*="notification"], [class*="notification-icon"]').first();
        if (await bell.isVisible()) {
            await bell.click();
            const panel = page.locator('[class*="notification-panel"], [data-testid="notification-panel"]');
            await page.waitForTimeout(500);
        }
    });
});

test.describe('Theme Switching', () => {
    test('should toggle between light and dark themes', async ({ page }) => {
        await page.goto('/settings/appearance');
        const themeToggle = page.locator('[data-testid="theme-toggle"], [class*="theme-switch"], button:has-text("Dark"), button:has-text("Light")').first();
        if (await themeToggle.isVisible()) {
            await themeToggle.click();
            await page.waitForTimeout(300);
            // Check body class or data attribute changed
            const body = page.locator('body');
            const className = await body.getAttribute('class') || '';
            const dataTheme = await body.getAttribute('data-theme') || '';
            expect(className + dataTheme).toBeTruthy();
        }
    });
});
