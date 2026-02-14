var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React } from "./react-core-BiY6fgAJ.js";
const createStoreImpl = /* @__PURE__ */ __name((createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = /* @__PURE__ */ __name((partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  }, "setState");
  const getState = /* @__PURE__ */ __name(() => state, "getState");
  const getInitialState = /* @__PURE__ */ __name(() => initialState, "getInitialState");
  const subscribe = /* @__PURE__ */ __name((listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, "subscribe");
  const api = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api);
  return api;
}, "createStoreImpl");
const createStore = /* @__PURE__ */ __name(((createState) => createState ? createStoreImpl(createState) : createStoreImpl), "createStore");
const identity = /* @__PURE__ */ __name((arg) => arg, "identity");
function useStore(api, selector = identity) {
  const slice = React.useSyncExternalStore(
    api.subscribe,
    React.useCallback(() => selector(api.getState()), [api, selector]),
    React.useCallback(() => selector(api.getInitialState()), [api, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
__name(useStore, "useStore");
const createImpl = /* @__PURE__ */ __name((createState) => {
  const api = createStore(createState);
  const useBoundStore = /* @__PURE__ */ __name((selector) => useStore(api, selector), "useBoundStore");
  Object.assign(useBoundStore, api);
  return useBoundStore;
}, "createImpl");
const create = /* @__PURE__ */ __name(((createState) => createState ? createImpl(createState) : createImpl), "create");
function createJSONStorage(getStorage, options) {
  let storage;
  try {
    storage = getStorage();
  } catch (e) {
    return;
  }
  const persistStorage = {
    getItem: /* @__PURE__ */ __name((name) => {
      var _a;
      const parse = /* @__PURE__ */ __name((str2) => {
        if (str2 === null) {
          return null;
        }
        return JSON.parse(str2, void 0);
      }, "parse");
      const str = (_a = storage.getItem(name)) != null ? _a : null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    }, "getItem"),
    setItem: /* @__PURE__ */ __name((name, newValue) => storage.setItem(name, JSON.stringify(newValue, void 0)), "setItem"),
    removeItem: /* @__PURE__ */ __name((name) => storage.removeItem(name), "removeItem")
  };
  return persistStorage;
}
__name(createJSONStorage, "createJSONStorage");
const toThenable = /* @__PURE__ */ __name((fn) => (input) => {
  try {
    const result = fn(input);
    if (result instanceof Promise) {
      return result;
    }
    return {
      then(onFulfilled) {
        return toThenable(onFulfilled)(result);
      },
      catch(_onRejected) {
        return this;
      }
    };
  } catch (e) {
    return {
      then(_onFulfilled) {
        return this;
      },
      catch(onRejected) {
        return toThenable(onRejected)(e);
      }
    };
  }
}, "toThenable");
const persistImpl = /* @__PURE__ */ __name((config, baseOptions) => (set, get, api) => {
  let options = {
    storage: createJSONStorage(() => localStorage),
    partialize: /* @__PURE__ */ __name((state) => state, "partialize"),
    version: 0,
    merge: /* @__PURE__ */ __name((persistedState, currentState) => ({
      ...currentState,
      ...persistedState
    }), "merge"),
    ...baseOptions
  };
  let hasHydrated = false;
  const hydrationListeners = /* @__PURE__ */ new Set();
  const finishHydrationListeners = /* @__PURE__ */ new Set();
  let storage = options.storage;
  if (!storage) {
    return config(
      (...args) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
        );
        set(...args);
      },
      get,
      api
    );
  }
  const setItem = /* @__PURE__ */ __name(() => {
    const state = options.partialize({ ...get() });
    return storage.setItem(options.name, {
      state,
      version: options.version
    });
  }, "setItem");
  const savedSetState = api.setState;
  api.setState = (state, replace) => {
    savedSetState(state, replace);
    return setItem();
  };
  const configResult = config(
    (...args) => {
      set(...args);
      return setItem();
    },
    get,
    api
  );
  api.getInitialState = () => configResult;
  let stateFromStorage;
  const hydrate = /* @__PURE__ */ __name(() => {
    var _a, _b;
    if (!storage) return;
    hasHydrated = false;
    hydrationListeners.forEach((cb) => {
      var _a2;
      return cb((_a2 = get()) != null ? _a2 : configResult);
    });
    const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
    return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
      if (deserializedStorageValue) {
        if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
          if (options.migrate) {
            const migration = options.migrate(
              deserializedStorageValue.state,
              deserializedStorageValue.version
            );
            if (migration instanceof Promise) {
              return migration.then((result) => [true, result]);
            }
            return [true, migration];
          }
          console.error(
            `State loaded from storage couldn't be migrated since no migrate function was provided`
          );
        } else {
          return [false, deserializedStorageValue.state];
        }
      }
      return [false, void 0];
    }).then((migrationResult) => {
      var _a2;
      const [migrated, migratedState] = migrationResult;
      stateFromStorage = options.merge(
        migratedState,
        (_a2 = get()) != null ? _a2 : configResult
      );
      set(stateFromStorage, true);
      if (migrated) {
        return setItem();
      }
    }).then(() => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
      stateFromStorage = get();
      hasHydrated = true;
      finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
    }).catch((e) => {
      postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
    });
  }, "hydrate");
  api.persist = {
    setOptions: /* @__PURE__ */ __name((newOptions) => {
      options = {
        ...options,
        ...newOptions
      };
      if (newOptions.storage) {
        storage = newOptions.storage;
      }
    }, "setOptions"),
    clearStorage: /* @__PURE__ */ __name(() => {
      storage == null ? void 0 : storage.removeItem(options.name);
    }, "clearStorage"),
    getOptions: /* @__PURE__ */ __name(() => options, "getOptions"),
    rehydrate: /* @__PURE__ */ __name(() => hydrate(), "rehydrate"),
    hasHydrated: /* @__PURE__ */ __name(() => hasHydrated, "hasHydrated"),
    onHydrate: /* @__PURE__ */ __name((cb) => {
      hydrationListeners.add(cb);
      return () => {
        hydrationListeners.delete(cb);
      };
    }, "onHydrate"),
    onFinishHydration: /* @__PURE__ */ __name((cb) => {
      finishHydrationListeners.add(cb);
      return () => {
        finishHydrationListeners.delete(cb);
      };
    }, "onFinishHydration")
  };
  if (!options.skipHydration) {
    hydrate();
  }
  return stateFromStorage || configResult;
}, "persistImpl");
const persist = persistImpl;
export {
  create as c,
  persist as p
};
