// frontend/src/__tests__/stores/authStore.test.js
// 🧪 Auth Store Unit Tests

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

// Mock zustand store
const mockAuthStore = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    updateProfile: vi.fn(),
    setUser: vi.fn(),
    setToken: vi.fn(),
    clearError: vi.fn()
};

// Mock the actual store
vi.mock('../../stores/authStore', () => ({
    default: () => mockAuthStore,
    useAuthStore: () => mockAuthStore
}));

describe('Auth Store', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAuthStore.user = null;
        mockAuthStore.token = null;
        mockAuthStore.isAuthenticated = false;
        mockAuthStore.error = null;
    });

    describe('Initial State', () => {
        it('should have null user initially', () => {
            expect(mockAuthStore.user).toBeNull();
        });

        it('should have null token initially', () => {
            expect(mockAuthStore.token).toBeNull();
        });

        it('should not be authenticated initially', () => {
            expect(mockAuthStore.isAuthenticated).toBe(false);
        });
    });

    describe('Login', () => {
        it('should call login with credentials', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123'
            };

            await mockAuthStore.login(credentials);

            expect(mockAuthStore.login).toHaveBeenCalledWith(credentials);
        });

        it('should handle login success', async () => {
            const mockUser = {
                id: 1,
                username: 'testuser',
                email: 'test@example.com',
                avatar: 'avatar.png'
            };

            mockAuthStore.login.mockImplementationOnce(() => {
                mockAuthStore.user = mockUser;
                mockAuthStore.isAuthenticated = true;
                mockAuthStore.token = 'mock-jwt-token';
            });

            await mockAuthStore.login({
                email: 'test@example.com',
                password: 'password123'
            });

            expect(mockAuthStore.user).toEqual(mockUser);
            expect(mockAuthStore.isAuthenticated).toBe(true);
            expect(mockAuthStore.token).toBe('mock-jwt-token');
        });

        it('should handle login failure', async () => {
            mockAuthStore.login.mockImplementationOnce(() => {
                mockAuthStore.error = 'Invalid credentials';
                mockAuthStore.isAuthenticated = false;
            });

            await mockAuthStore.login({
                email: 'wrong@example.com',
                password: 'wrongpass'
            });

            expect(mockAuthStore.error).toBe('Invalid credentials');
            expect(mockAuthStore.isAuthenticated).toBe(false);
        });
    });

    describe('Logout', () => {
        it('should clear user data on logout', () => {
            mockAuthStore.user = { id: 1, username: 'test' };
            mockAuthStore.token = 'token';
            mockAuthStore.isAuthenticated = true;

            mockAuthStore.logout.mockImplementationOnce(() => {
                mockAuthStore.user = null;
                mockAuthStore.token = null;
                mockAuthStore.isAuthenticated = false;
            });

            mockAuthStore.logout();

            expect(mockAuthStore.logout).toHaveBeenCalled();
            expect(mockAuthStore.user).toBeNull();
            expect(mockAuthStore.token).toBeNull();
            expect(mockAuthStore.isAuthenticated).toBe(false);
        });
    });

    describe('Register', () => {
        it('should call register with user data', async () => {
            const userData = {
                username: 'newuser',
                email: 'new@example.com',
                password: 'password123',
                password2: 'password123'
            };

            await mockAuthStore.register(userData);

            expect(mockAuthStore.register).toHaveBeenCalledWith(userData);
        });
    });

    describe('Profile Update', () => {
        it('should update user profile', async () => {
            const profileData = {
                username: 'updateduser',
                bio: 'New bio',
                avatar: 'new-avatar.png'
            };

            mockAuthStore.updateProfile.mockImplementationOnce(() => {
                mockAuthStore.user = {
                    ...mockAuthStore.user,
                    ...profileData
                };
            });

            await mockAuthStore.updateProfile(profileData);

            expect(mockAuthStore.updateProfile).toHaveBeenCalledWith(profileData);
        });
    });

    describe('Error Handling', () => {
        it('should clear errors', () => {
            mockAuthStore.error = 'Some error';

            mockAuthStore.clearError.mockImplementationOnce(() => {
                mockAuthStore.error = null;
            });

            mockAuthStore.clearError();

            expect(mockAuthStore.clearError).toHaveBeenCalled();
            expect(mockAuthStore.error).toBeNull();
        });
    });
});
