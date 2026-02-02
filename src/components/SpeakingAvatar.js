// components/SpeakingAvatar.js
// 🎤 Speaking Avatar Component - Discord-style voice activity ring

import React from 'react';
import './SpeakingAvatar.css';

const SpeakingAvatar = ({
  src,
  alt = 'Avatar',
  isSpeaking = false,
  size = 40,
  showRing = true,
  ringColor = '#43b581', // Discord green
  className = '',
  onClick,
  style = {}
}) => {
  return (
    <div
      className={`speaking-avatar ${isSpeaking ? 'speaking' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        ...style
      }}
      onClick={onClick}
    >
      {/* Speaking ring */}
      {showRing && isSpeaking && (
        <>
          <div
            className="speaking-ring speaking-ring-1"
            style={{ borderColor: ringColor }}
          />
          <div
            className="speaking-ring speaking-ring-2"
            style={{ borderColor: ringColor }}
          />
        </>
      )}

      {/* Avatar image */}
      <img
        src={src}
        alt={alt}
        className="speaking-avatar-image"
        loading="lazy"
      />

      {/* Speaking indicator dot */}
      {isSpeaking && (
        <div
          className="speaking-indicator"
          style={{ backgroundColor: ringColor }}
        />
      )}
    </div>
  );
};

export default SpeakingAvatar;



