// VoiceContext Constants Tests
import { describe, it, expect } from 'vitest';
import { DEFAULT_ICE_SERVERS, RTC_CONFIGURATION, setRtcIceServers } from '../../VoiceContext/constants';

describe('VoiceContext Constants', () => {
    describe('DEFAULT_ICE_SERVERS', () => {
        it('should have STUN servers', () => {
            const stunServers = DEFAULT_ICE_SERVERS.filter(s =>
                typeof s.urls === 'string' && s.urls.startsWith('stun:')
            );
            expect(stunServers.length).toBeGreaterThanOrEqual(5);
        });

        it('should have fallback TURN servers', () => {
            const turnServers = DEFAULT_ICE_SERVERS.filter(s =>
                typeof s.urls === 'string' && s.urls.startsWith('turn:')
            );
            expect(turnServers.length).toBeGreaterThanOrEqual(1);
        });

        it('TURN servers should have credentials', () => {
            const turnServers = DEFAULT_ICE_SERVERS.filter(s =>
                typeof s.urls === 'string' && s.urls.startsWith('turn:')
            );
            turnServers.forEach(server => {
                expect(server.username).toBeDefined();
                expect(server.credential).toBeDefined();
            });
        });

        it('should include Google STUN servers', () => {
            const googleStun = DEFAULT_ICE_SERVERS.filter(s =>
                typeof s.urls === 'string' && s.urls.includes('google.com')
            );
            expect(googleStun.length).toBeGreaterThanOrEqual(4);
        });

        it('should include Cloudflare STUN', () => {
            const cfStun = DEFAULT_ICE_SERVERS.find(s =>
                typeof s.urls === 'string' && s.urls.includes('cloudflare')
            );
            expect(cfStun).toBeDefined();
        });
    });

    describe('RTC_CONFIGURATION', () => {
        it('should have correct bundle policy', () => {
            expect(RTC_CONFIGURATION.bundlePolicy).toBe('max-bundle');
        });

        it('should have correct rtcp mux policy', () => {
            expect(RTC_CONFIGURATION.rtcpMuxPolicy).toBe('require');
        });

        it('should have ice candidate pool size of 10', () => {
            expect(RTC_CONFIGURATION.iceCandidatePoolSize).toBe(10);
        });

        it('should have transport policy set to all', () => {
            expect(RTC_CONFIGURATION.iceTransportPolicy).toBe('all');
        });

        it('should use DEFAULT_ICE_SERVERS', () => {
            expect(RTC_CONFIGURATION.iceServers).toBe(DEFAULT_ICE_SERVERS);
        });
    });

    describe('setRtcIceServers', () => {
        it('should update RTC_CONFIGURATION iceServers', () => {
            const newServers = [{ urls: 'stun:test.example.com:3478' }];
            setRtcIceServers(newServers);
            // After setting, RTC_CONFIGURATION should be updated
            expect(RTC_CONFIGURATION.iceServers).toEqual(newServers);
            // Restore
            setRtcIceServers(DEFAULT_ICE_SERVERS);
        });

        it('should preserve other config properties', () => {
            const newServers = [{ urls: 'stun:test.example.com:3478' }];
            setRtcIceServers(newServers);
            expect(RTC_CONFIGURATION.bundlePolicy).toBe('max-bundle');
            expect(RTC_CONFIGURATION.iceCandidatePoolSize).toBe(10);
            // Restore
            setRtcIceServers(DEFAULT_ICE_SERVERS);
        });
    });
});
