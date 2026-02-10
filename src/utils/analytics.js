// utils/analytics.js
// 📈 Analytics & Event Tracking

class Analytics {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = null;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  /**
   * Track an event
   */
  trackEvent(eventName, properties = {}) {
    const event = {
      name: eventName,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.pathname,
      userAgent: navigator.userAgent
    };

    this.events.push(event);

    // Console log in development
    if (import.meta.env.MODE === 'development') {
    }

    // Send to backend
    this.sendToBackend(event);

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    return event;
  }

  /**
   * Track page view
   */
  trackPageView(pageName, properties = {}) {
    return this.trackEvent('page_view', {
      page: pageName,
      ...properties
    });
  }

  /**
   * Track user action
   */
  trackAction(action, category, label, value) {
    return this.trackEvent('user_action', {
      action,
      category,
      label,
      value
    });
  }

  /**
   * Track message sent
   */
  trackMessageSent(data = {}) {
    return this.trackEvent('message_sent', {
      roomType: data.roomType,
      hasImage: !!data.hasImage,
      hasFile: !!data.hasFile,
      messageLength: data.messageLength,
      isVoice: !!data.isVoice
    });
  }

  /**
   * Track voice chat
   */
  trackVoiceJoin(roomName, duration = 0) {
    return this.trackEvent('voice_join', {
      room: roomName,
      duration
    });
  }

  trackVoiceLeave(roomName, duration) {
    return this.trackEvent('voice_leave', {
      room: roomName,
      duration
    });
  }

  /**
   * Track errors
   */
  trackError(error, context = {}) {
    return this.trackEvent('error', {
      message: error.message,
      stack: error.stack,
      context
    });
  }

  /**
   * Track performance
   */
  trackPerformance(metric, value) {
    return this.trackEvent('performance', {
      metric,
      value,
      unit: 'ms'
    });
  }

  /**
   * Track feature usage
   */
  trackFeatureUse(featureName, data = {}) {
    return this.trackEvent('feature_used', {
      feature: featureName,
      ...data
    });
  }

  /**
   * Send to backend
   */
  async sendToBackend(event) {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        console.warn('Failed to send analytics event');
      }
    } catch (error) {
      // Silently fail - analytics shouldn't break the app
      if (import.meta.env.MODE === 'development') {
        console.warn('Analytics error:', error);
      }
    }
  }

  /**
   * Get session statistics
   */
  getSessionStats() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      eventCount: this.events.length,
      events: this.events
    };
  }

  /**
   * Clear session data
   */
  clearSession() {
    this.events = [];
    this.sessionId = this.generateSessionId();
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Convenience functions
export const trackEvent = (name, props) => analytics.trackEvent(name, props);
export const trackPageView = (page, props) => analytics.trackPageView(page, props);
export const trackAction = (action, category, label, value) =>
  analytics.trackAction(action, category, label, value);
export const trackMessageSent = (data) => analytics.trackMessageSent(data);
export const trackVoiceJoin = (room, duration) => analytics.trackVoiceJoin(room, duration);
export const trackVoiceLeave = (room, duration) => analytics.trackVoiceLeave(room, duration);
export const trackError = (error, context) => analytics.trackError(error, context);
export const trackPerformance = (metric, value) => analytics.trackPerformance(metric, value);
export const trackFeatureUse = (feature, data) => analytics.trackFeatureUse(feature, data);

export default analytics;



