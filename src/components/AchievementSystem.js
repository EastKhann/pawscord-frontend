// components/AchievementSystem.js
// 🏆 Achievement & Level System

import React, { useState, useEffect } from 'react';
import './AchievementSystem.css';

// Achievement definitions
export const ACHIEVEMENTS = {
  first_message: {
    id: 'first_message',
    name: 'İlk Adım',
    description: 'İlk mesajını gönder',
    icon: '✉️',
    xp: 10,
    unlockCondition: (stats) => stats.messageCount >= 1
  },
  hundred_messages: {
    id: 'hundred_messages',
    name: 'Konuşkan',
    description: '100 mesaj gönder',
    icon: '💬',
    xp: 100,
    unlockCondition: (stats) => stats.messageCount >= 100
  },
  voice_master: {
    id: 'voice_master',
    name: 'Ses Ustası',
    description: '50 saat sesli sohbet yap',
    icon: '🎤',
    xp: 200,
    unlockCondition: (stats) => stats.voiceMinutes >= 3000
  },
  friend_maker: {
    id: 'friend_maker',
    name: 'Sosyal Kelebek',
    description: '10 arkadaş edin',
    icon: '👥',
    xp: 150,
    unlockCondition: (stats) => stats.friendCount >= 10
  },
  early_bird: {
    id: 'early_bird',
    name: 'Sabahçı Kuş',
    description: 'Sabah 6\'da mesaj gönder',
    icon: '🌅',
    xp: 50,
    unlockCondition: (stats) => stats.hasEarlyMessage
  },
  night_owl: {
    id: 'night_owl',
    name: 'Gece Kuşu',
    description: 'Gece 3\'te mesaj gönder',
    icon: '🦉',
    xp: 50,
    unlockCondition: (stats) => stats.hasLateMessage
  },
  streak_7: {
    id: 'streak_7',
    name: '7 Gün Streak',
    description: '7 gün üst üste giriş yap',
    icon: '🔥',
    xp: 100,
    unlockCondition: (stats) => stats.loginStreak >= 7
  },
  server_creator: {
    id: 'server_creator',
    name: 'Topluluk Kurucusu',
    description: 'İlk sunucunu oluştur',
    icon: '🏛️',
    xp: 75,
    unlockCondition: (stats) => stats.serversCreated >= 1
  }
};

// XP to level conversion
export const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100));
};

export const getXPForNextLevel = (currentLevel) => {
  return (currentLevel + 1) ** 2 * 100;
};

export const AchievementToast = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="achievement-toast">
      <div className="achievement-toast-icon">{achievement.icon}</div>
      <div className="achievement-toast-content">
        <div className="achievement-toast-title">🎉 Başarım Açıldı!</div>
        <div className="achievement-toast-name">{achievement.name}</div>
        <div className="achievement-toast-xp">+{achievement.xp} XP</div>
      </div>
      <button onClick={onClose} className="achievement-toast-close">×</button>
    </div>
  );
};

export const LevelBadge = ({ level, xp }) => {
  const currentLevelXP = level ** 2 * 100;
  const nextLevelXP = (level + 1) ** 2 * 100;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="level-badge">
      <div className="level-number">Lv. {level}</div>
      <div className="xp-bar-container">
        <div className="xp-bar-fill" style={{ width: `${Math.min(100, progress)}%` }} />
      </div>
      <div className="xp-text">
        {xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
      </div>
    </div>
  );
};

export const AchievementList = ({ userStats, unlockedAchievements = [] }) => {
  return (
    <div className="achievement-list">
      <h3>🏆 Başarımlar</h3>
      <div className="achievement-grid">
        {Object.values(ACHIEVEMENTS).map(achievement => {
          const isUnlocked = unlockedAchievements.includes(achievement.id);
          const canUnlock = achievement.unlockCondition(userStats);

          return (
            <div
              key={achievement.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : ''} ${canUnlock && !isUnlocked ? 'available' : ''}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-name">{achievement.name}</div>
              <div className="achievement-description">{achievement.description}</div>
              <div className="achievement-xp">+{achievement.xp} XP</div>
              {isUnlocked && <div className="achievement-badge">✓</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default {
  ACHIEVEMENTS,
  calculateLevel,
  getXPForNextLevel,
  AchievementToast,
  LevelBadge,
  AchievementList
};



