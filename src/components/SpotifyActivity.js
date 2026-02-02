// frontend/src/components/SpotifyActivity.js
/**
 * 🎵 SPOTIFY ACTIVITY COMPONENT
 * Kullanıcının dinlediği şarkıyı gösterir
 */

import React, { useState, useEffect, useCallback } from 'react';
import { FaSpotify, FaPlay, FaPause, FaExternalLinkAlt } from 'react-icons/fa';
import { getApiBase } from '../utils/apiClient';
import './SpotifyActivity.css';

const SpotifyActivity = ({ username, showAlbumArt = true, compact = false }) => {
    const [track, setTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSpotifyActivity = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = username
                ? `${getApiBase()}/presence/${username}/`
                : `${getApiBase()}/spotify/playing/`;

            const response = await fetch(endpoint, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                // Handle both endpoints
                if (data.track) {
                    setTrack(data.track);
                } else if (data.activities) {
                    const spotifyActivity = data.activities.find(a => a.type === 'spotify');
                    if (spotifyActivity) {
                        setTrack({
                            track_name: spotifyActivity.details,
                            artist_name: spotifyActivity.state?.replace('by ', ''),
                            album_image: spotifyActivity.image_large,
                            track_url: spotifyActivity.url,
                            is_playing: spotifyActivity.extra?.is_playing,
                            progress_ms: spotifyActivity.extra?.progress_ms,
                            duration_ms: spotifyActivity.extra?.duration_ms,
                        });
                    } else {
                        setTrack(null);
                    }
                } else {
                    setTrack(null);
                }
                setError(null);
            }
        } catch (err) {
            console.error('Spotify activity error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchSpotifyActivity();
        // Refresh every 10 seconds for real-time feel
        const interval = setInterval(fetchSpotifyActivity, 10000);
        return () => clearInterval(interval);
    }, [fetchSpotifyActivity]);

    if (loading) return null;
    if (!track) return null;

    const progress = track.duration_ms
        ? Math.round((track.progress_ms / track.duration_ms) * 100)
        : 0;

    if (compact) {
        return (
            <div className="spotify-activity-compact">
                <FaSpotify className="spotify-icon" />
                <span className="track-info">
                    {track.track_name} - {track.artist_name}
                </span>
            </div>
        );
    }

    return (
        <div className="spotify-activity">
            <div className="spotify-header">
                <FaSpotify className="spotify-logo" />
                <span>Listening to Spotify</span>
            </div>

            <div className="spotify-content">
                {showAlbumArt && track.album_image && (
                    <img
                        src={track.album_image}
                        alt={track.album_name || 'Album'}
                        className="album-art"
                    />
                )}

                <div className="track-details">
                    <div className="track-name">{track.track_name}</div>
                    <div className="artist-name">{track.artist_name}</div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="playback-status">
                        {track.is_playing ? (
                            <FaPlay className="status-icon playing" />
                        ) : (
                            <FaPause className="status-icon paused" />
                        )}
                        {track.track_url && (
                            <a
                                href={track.track_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="spotify-link"
                            >
                                <FaExternalLinkAlt />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotifyActivity;
