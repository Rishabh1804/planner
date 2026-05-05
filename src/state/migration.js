// Holiday Planner storage migration helpers.
//
// Not wired into the live app yet. The live baseline preserves
// augustFamilyHoneymoon.*.v431 keys until a dedicated migration release.

import {
  PLANNER_STORAGE,
  readFirstAvailableJson,
  readJson,
  writeJson
} from './storage.js';

export const FUTURE_STORAGE = Object.freeze({
  namespace: 'holidayPlanner',
  schemaVersion: 1,
  keys: Object.freeze({
    notes: 'holidayPlanner.discussionNotes.v1',
    choices: 'holidayPlanner.choiceState.v1',
    variables: 'holidayPlanner.tripVariables.v1',
    budgetCap: 'holidayPlanner.budgetCap.v1',
    shortlist: 'holidayPlanner.shortlist.v1'
  })
});

export function hasFutureState(storage, futureStorage = FUTURE_STORAGE) {
  return Object.values(futureStorage.keys).some((key) => storage.getItem(key) !== null);
}

export function readCurrentStateBundle(storage, storageConfig = PLANNER_STORAGE) {
  return {
    notes: readFirstAvailableJson(storage, [storageConfig.keys.notes, ...storageConfig.legacyKeys.notes], {}),
    choices: readFirstAvailableJson(storage, [storageConfig.keys.choices, ...storageConfig.legacyKeys.choices], {}),
    variables: readFirstAvailableJson(storage, [storageConfig.keys.variables, ...storageConfig.legacyKeys.variables], {}),
    budgetCap: readFirstAvailableJson(storage, [storageConfig.keys.budgetCap, ...storageConfig.legacyKeys.budgetCap], null),
    shortlist: readFirstAvailableJson(storage, [storageConfig.keys.shortlist, ...storageConfig.legacyKeys.shortlist], [])
  };
}

export function readFutureStateBundle(storage, futureStorage = FUTURE_STORAGE) {
  return {
    notes: readJson(storage, futureStorage.keys.notes, {}),
    choices: readJson(storage, futureStorage.keys.choices, {}),
    variables: readJson(storage, futureStorage.keys.variables, {}),
    budgetCap: readJson(storage, futureStorage.keys.budgetCap, null),
    shortlist: readJson(storage, futureStorage.keys.shortlist, [])
  };
}

export function writeFutureStateBundle(storage, bundle, futureStorage = FUTURE_STORAGE) {
  writeJson(storage, futureStorage.keys.notes, bundle.notes ?? {});
  writeJson(storage, futureStorage.keys.choices, bundle.choices ?? {});
  writeJson(storage, futureStorage.keys.variables, bundle.variables ?? {});
  writeJson(storage, futureStorage.keys.budgetCap, bundle.budgetCap ?? null);
  writeJson(storage, futureStorage.keys.shortlist, bundle.shortlist ?? []);
}

export function previewMigration(storage) {
  return {
    source: PLANNER_STORAGE.namespace,
    target: FUTURE_STORAGE.namespace,
    futureStateExists: hasFutureState(storage),
    bundle: readCurrentStateBundle(storage)
  };
}

export function migrateToFutureStorage(storage, options = {}) {
  const { overwrite = false } = options;

  if (hasFutureState(storage) && !overwrite) {
    return {
      migrated: false,
      reason: 'future-state-exists',
      bundle: readFutureStateBundle(storage)
    };
  }

  const bundle = readCurrentStateBundle(storage);
  writeFutureStateBundle(storage, bundle);

  return {
    migrated: true,
    reason: 'copied-current-state',
    bundle
  };
}
