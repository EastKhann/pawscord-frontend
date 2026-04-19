// frontend/src/__tests__/architecture/featureDirectories.test.js
/**
 * Architecture tests to ensure component organization is maintained.
 * These tests enforce the feature directory structure.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const COMPONENTS_DIR = path.resolve(__dirname, '../../components');

const FEATURE_DIRS = [
    'admin',
    'analytics',
    'bot',
    'chat',
    'education',
    'games',
    'media',
    'moderation',
    'notifications',
    'premium',
    'profile',
    'security',
    'server',
    'settings',
    'shared',
    'social',
];

describe('Component Feature Directory Structure', () => {
    it('should have all expected feature directories', () => {
        for (const dir of FEATURE_DIRS) {
            const dirPath = path.join(COMPONENTS_DIR, dir);
            expect(fs.existsSync(dirPath), `Missing feature directory: ${dir}`).toBe(true);
        }
    });

    it('should have barrel index.js in each feature directory', () => {
        for (const dir of FEATURE_DIRS) {
            const indexPath = path.join(COMPONENTS_DIR, dir, 'index.js');
            expect(fs.existsSync(indexPath), `Missing barrel index.js in ${dir}/`).toBe(true);
        }
    });

    it('should have minimal flat files in components root', () => {
        const flatFiles = fs.readdirSync(COMPONENTS_DIR).filter((f) => {
            const fullPath = path.join(COMPONENTS_DIR, f);
            return fs.statSync(fullPath).isFile() && (f.endsWith('.js') || f.endsWith('.jsx'));
        });
        // Only index.js should be flat
        expect(flatFiles.length).toBeLessThanOrEqual(2);
    });

    it('should have main barrel index.js with shared component exports', () => {
        const indexPath = path.join(COMPONENTS_DIR, 'index.js');
        const content = fs.readFileSync(indexPath, 'utf-8');
        // Key shared components should be re-exported
        expect(content).toContain('ErrorBoundary');
        expect(content).toContain('LoadingSpinner');
        expect(content).toContain('ConfirmModal');
    });

    it('each feature directory should contain at least 2 component files', () => {
        for (const dir of FEATURE_DIRS) {
            const dirPath = path.join(COMPONENTS_DIR, dir);
            const files = fs
                .readdirSync(dirPath)
                .filter((f) => (f.endsWith('.js') || f.endsWith('.jsx')) && f !== 'index.js');
            expect(
                files.length,
                `${dir}/ should have at least 2 components`
            ).toBeGreaterThanOrEqual(2);
        }
    });
});

describe('Import Pattern Validation', () => {
    it('components/index.js should use feature directory paths', () => {
        const indexPath = path.join(COMPONENTS_DIR, 'index.js');
        const content = fs.readFileSync(indexPath, 'utf-8');
        const lines = content.split('\n').filter((l) => l.includes('from'));

        for (const line of lines) {
            // Each import should reference a feature dir (./shared/X, ./chat/X, etc.)
            const match = line.match(/from\s+['"]\.\/([\w-]+)/);
            if (match) {
                const dir = match[1];
                // Should be a feature directory, not a flat component
                const dirPath = path.join(COMPONENTS_DIR, dir);
                expect(
                    fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory(),
                    `Import "${dir}" in index.js should be a feature directory`
                ).toBe(true);
            }
        }
    });
});
