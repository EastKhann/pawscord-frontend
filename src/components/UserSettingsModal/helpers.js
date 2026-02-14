// Shared helper for localStorage-backed toggles (used by ActivityTab, AdvancedTab)
export const createToggle = (key, setter) => (val) => {
    setter(val);
    localStorage.setItem(key, val.toString());
};
