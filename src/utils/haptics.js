// frontend/src/utils/haptics.js
// Capacitor Haptics wrapper — silently no-ops on web/Electron
// Usage: import { hapticLight, hapticMedium, hapticSuccess } from "./haptics";

let _haptics = null;
let _ImpactStyle = null;

async function _load() {
    if (_haptics) return;
    try {
        const mod = await import("@capacitor/haptics");
        _haptics = mod.Haptics;
        _ImpactStyle = mod.ImpactStyle;
    } catch (_) {
        _haptics = null;
    }
}

function isNative() {
    try {
        return typeof window !== "undefined" && window.Capacitor?.isNativePlatform?.();
    } catch (_) {
        return false;
    }
}

export async function hapticLight() {
    if (!isNative()) return;
    await _load();
    try {
        await _haptics?.impact({ style: _ImpactStyle?.Light ?? "LIGHT" });
    } catch (_) {}
}

export async function hapticMedium() {
    if (!isNative()) return;
    await _load();
    try {
        await _haptics?.impact({ style: _ImpactStyle?.Medium ?? "MEDIUM" });
    } catch (_) {}
}

export async function hapticHeavy() {
    if (!isNative()) return;
    await _load();
    try {
        await _haptics?.impact({ style: _ImpactStyle?.Heavy ?? "HEAVY" });
    } catch (_) {}
}

export async function hapticSuccess() {
    if (!isNative()) return;
    await _load();
    try {
        await _haptics?.notification({ type: "SUCCESS" });
    } catch (_) {}
}

export async function hapticError() {
    if (!isNative()) return;
    await _load();
    try {
        await _haptics?.notification({ type: "ERROR" });
    } catch (_) {}
}

export async function hapticWarning() {
    if (!isNative()) return;
    await _load();
    try {
        await _haptics?.notification({ type: "WARNING" });
    } catch (_) {}
}

