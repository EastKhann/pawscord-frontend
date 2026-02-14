const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["static/js/index-Cjcd9LYI.js","static/js/index-DGqPEDt8.js","static/js/media-vendor-BRMiuG2Y.js","static/js/react-core-BiY6fgAJ.js","static/js/router-vendor-DrLUSS4j.js","static/js/state-vendor-BeEHnF_A.js","static/js/crypto-vendor-NANfm9jb.js","static/js/icons-vendor-2VDeY8fW.js","static/js/ui-vendor-iPoN0WGz.js","static/css/index-ClUgEqAE.css"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { _ as __vitePreload } from "./media-vendor-BRMiuG2Y.js";
import "./react-core-BiY6fgAJ.js";
const _PushNotificationManager = class _PushNotificationManager {
  constructor() {
    this.isSupported = "PushManager" in window;
    this.permission = "default";
    this.deviceToken = null;
    this.listeners = /* @__PURE__ */ new Map();
  }
  /**
   * Initialize push notifications
   */
  async init(apiBaseUrl, fetchWithAuth) {
    this.apiBaseUrl = apiBaseUrl;
    this.fetchWithAuth = fetchWithAuth;
    const isCapacitor = window.Capacitor?.isNativePlatform();
    if (isCapacitor) {
      await this.initCapacitor();
    } else {
      await this.initWeb();
    }
  }
  /**
   * Capacitor (APK) initialization
   */
  async initCapacitor() {
    try {
      const { PushNotifications } = await __vitePreload(async () => {
        const { PushNotifications: PushNotifications2 } = await import("./index-Cjcd9LYI.js");
        return { PushNotifications: PushNotifications2 };
      }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9]) : void 0);
      const permResult = await PushNotifications.requestPermissions();
      if (permResult.receive === "granted") {
        this.permission = "granted";
        await PushNotifications.register();
        await PushNotifications.addListener("registration", async (token) => {
          this.deviceToken = token.value;
          await this.registerDevice(token.value);
        });
        await PushNotifications.addListener("registrationError", (error) => {
          console.error("🔔 [Push] Registration error:", error);
        });
        await PushNotifications.addListener("pushNotificationReceived", (notification) => {
          this.handleNotification(notification);
        });
        await PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
          this.handleNotificationAction(action);
        });
      }
    } catch (error) {
      console.error("❌ [Push] Capacitor init failed:", error);
    }
  }
  /**
   * Web push notifications initialization
   */
  async initWeb() {
    if (!this.isSupported) {
      console.warn("⚠️ [Push] Web push not supported");
      return;
    }
    const permission = await Notification.requestPermission();
    this.permission = permission;
  }
  /**
   * Register device token with backend
   */
  async registerDevice(token) {
    try {
      const response = await this.fetchWithAuth(`${this.apiBaseUrl}/devices/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registration_id: token,
          type: "android",
          // or 'ios', 'web'
          active: true
        })
      });
      if (response.ok) {
      }
    } catch (error) {
      console.error("❌ [Push] Device registration failed:", error);
    }
  }
  /**
   * Handle incoming notification
   */
  handleNotification(notification) {
    const { title, body, data } = notification;
    this.listeners.forEach((callback) => {
      callback({ type: "notification", title, body, data });
    });
    if (document.hidden && this.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/logo192.png",
        badge: "/badge.png",
        tag: data?.messageId || "default",
        data
      });
    }
  }
  /**
   * Handle notification action (user clicked)
   */
  handleNotificationAction(action) {
    const { notification, actionId } = action;
    this.listeners.forEach((callback) => {
      callback({
        type: "action",
        actionId,
        notification
      });
    });
    if (notification.data?.roomId) {
      window.location.href = `/#/room/${notification.data.roomId}`;
    } else if (notification.data?.conversationId) {
      window.location.href = `/#/dm/${notification.data.conversationId}`;
    }
  }
  /**
   * Subscribe to notification events
   */
  on(eventType, callback) {
    const id = Math.random().toString(36).substr(2, 9);
    this.listeners.set(id, callback);
    return () => this.listeners.delete(id);
  }
  /**
   * Send notification (for testing)
   */
  async sendTestNotification() {
    try {
      await this.fetchWithAuth(`${this.apiBaseUrl}/push/test/`, {
        method: "POST"
      });
    } catch (error) {
      console.error("❌ [Push] Test failed:", error);
    }
  }
  /**
   * Unregister device
   */
  async unregister() {
    if (this.deviceToken) {
      try {
        await this.fetchWithAuth(`${this.apiBaseUrl}/devices/${this.deviceToken}/`, {
          method: "DELETE"
        });
      } catch (error) {
        console.error("❌ [Push] Unregister failed:", error);
      }
    }
  }
};
__name(_PushNotificationManager, "PushNotificationManager");
let PushNotificationManager = _PushNotificationManager;
const pushNotificationManager = new PushNotificationManager();
export {
  pushNotificationManager
};
