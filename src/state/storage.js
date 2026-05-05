// Holiday Planner state storage module.
//
// This file is intentionally not wired into index.html yet.
// It mirrors the current live storage contract so the inline runtime can be
// migrated in small, reversible steps after parity checks.

export const PLANNER_STORAGE = Object.freeze({
  namespace: 'augustFamilyHoneymoon',
  schemaVersion: 431,
  keys: Object.freeze({
    notes: 'augustFamilyHoneymoon.discussionNotes.v431',
    choices: 'augustFamilyHoneymoon.choiceState.v431',
    variables: 'augustFamilyHoneymoon.tripVariables.v431',
    budgetCap: 'augustFamilyHoneymoon.budgetCap.v431',
    shortlist: 'augustFamilyHoneymoon.shortlist.v431'
  }),
  legacyKeys: Object.freeze({
    notes: Object.freeze(['augustFamilyHoneymoon.discussionNotes.v4']),
    choices: Object.freeze(['augustFamilyHoneymoon.choiceState.v2']),
    variables: Object.freeze(['augustFamilyHoneymoon.tripVariables.v2']),
    budgetCap: Object.freeze(['augustFamilyHoneymoon.budgetCap.v1']),
    shortlist: Object.freeze(['augustFamilyHoneymoon.shortlist.v1'])
  })
});

export function createSafeStorage(storageTarget = globalThis?.localStorage) {
  const memoryStorage = Object.create(null);

  return {
    getItem(key) {
      try {
        return storageTarget.getItem(key);
      } catch (error) {
        return Object.prototype.hasOwnProperty.call(memoryStorage, key)
          ? memoryStorage[key]
          : null;
      }
    },

    setItem(key, value) {
      try {
        storageTarget.setItem(key, value);
      } catch (error) {
        memoryStorage[key] = String(value);
      }
    },

    removeItem(key) {
      try {
        storageTarget.removeItem(key);
      } catch (error) {
        delete memoryStorage[key];
      }
    }
  };
}

export function readJson(storage, key, fallback = null) {
  const raw = storage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

export function writeJson(storage, key, value) {
  storage.setItem(key, JSON.stringify(value));
}

export function removeStoredValue(storage, key) {
  storage.removeItem(key);
}

export function readFirstAvailableJson(storage, keys, fallback = null) {
  for (const key of keys) {
    const value = readJson(storage, key, null);
    if (value !== null) return value;
  }

  return fallback;
}
