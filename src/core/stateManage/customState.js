import { create } from 'zustand'
import {
  addValueToObject,
  addMultipleValues,
  addValuesByPaths,
  addValueWithUpdater,
  addConditionalValues,
  safeAddValue,
  addValueWithType,
  deepMergeValues,
  addValueToArray
} from './objectUtils.js'
import { get } from 'lodash';

/**
 * Zustand store for object manipulation using immer-based utilities
 * Initial state is an empty object, actions are grouped in actions object
 */
export const useCustomReportState = create((set, get) => ({
  customData: {},
  actions: {
    /**
     * Add a single value to the store at the specified path
     * @param {string|Array} path - Path to set (dot notation string or array)
     * @param {any} value - Value to set
     */
    addValue: (path, value) => {
      set(state => ({
        customData: addValueToObject(state.customData, path, value)
      }))
    },

    /**
     * Add multiple values to the store
     * @param {Object} values - Object with values to merge
     */
    addMultiple: (values) => {
      set(state => ({
        customData: addMultipleValues(state.customData, values)
      }))
    },

    /**
     * Add values using path-value pairs
     * @param {Array} pathValuePairs - Array of {path, value} objects
     */
    addByPaths: (pathValuePairs) => {
      set(state => ({
        customData: addValuesByPaths(state.customData, pathValuePairs)
      }))
    },

    /**
     * Add values using a functional updater pattern
     * @param {Function} updater - Function that receives draft and modifies it
     */
    addWithUpdater: (updater) => {
      set(state => ({
        customData: addValueWithUpdater(state.customData, updater)
      }))
    },

    /**
     * Conditionally add values to the store
     * @param {Object} conditionalValues - Object with conditional values
     */
    addConditional: (conditionalValues) => {
      set(state => ({
        customData: addConditionalValues(state.customData, conditionalValues)
      }))
    },

    /**
     * Safe add with validation
     * @param {string|Array} path - Path to update
     * @param {any} value - New value
     * @param {Function} validator - Optional validator function
     */
    safeAdd: (path, value, validator) => {
      set(state => ({
        customData: safeAddValue(state.customData, path, value, validator)
      }))
    },

    /**
     * Add value with type coercion
     * @param {string|Array} path - Path to set
     * @param {any} value - Value to set
     * @param {string} type - Target type ('string', 'number', 'boolean', 'array', 'object')
     */
    addWithType: (path, value, type) => {
      set(state => ({
        customData: addValueWithType(state.customData, path, value, type)
      }))
    },

    /**
     * Deep merge objects into the store
     * @param {Object} updates - Object to merge deeply
     */
    deepMerge: (updates) => {
      set(state => ({
        customData: deepMergeValues(state.customData, updates)
      }))
    },

    /**
     * Add value to array property (creates array if doesn't exist)
     * @param {string|Array} path - Path to array property
     * @param {any} value - Value to add to array
     * @param {boolean} unique - Whether to avoid duplicates
     */
    addToArray: (path, value, unique = false) => {
      set(state => ({
        customData: addValueToArray(state.customData, path, value, unique)
      }))
    },

    // ===== UTILITY ACTIONS =====

    /**
     * Reset the store to empty object
     */
    reset: () => {
      set({ customData: {} })
    },

    /**
     * Set the entire customData object (replaces current state)
     * @param {Object} newData - New customData object
     */
    setData: (newData) => {
      set({ customData: newData })
    },

    /**
     * Get the current customData (for convenience)
     * @returns {Object} Current customData object
     */
    getData: () => {
      return get().customData
    },

    /**
     * Check if a path exists in the customData
     * @param {string|Array} path - Path to check
     * @returns {boolean} Whether the path exists
     */
    hasPath: (path) => {
      const pathArray = Array.isArray(path) ? path : path.split('.')
      let current = get().customData

      for (const key of pathArray) {
        if (current === null || current === undefined || !(key in current)) {
          return false
        }
        current = current[key]
      }

      return true
    },

    /**
     * Get value at a specific path
     * @param {string|Array} path - Path to get value from
     * @returns {any} Value at path or undefined
     */
    getValueAtPath: (path) => {
      const pathArray = Array.isArray(path) ? path : path.split('.')
      let current = get().customData

      for (const key of pathArray) {
        if (current === null || current === undefined || !(key in current)) {
          return undefined
        }
        current = current[key]
      }

      return current
    }
  }
}))

export const getCustomReportStateByPath = (path) => {
  let customStage = useCustomReportState.getState();
  return get(
    customStage
    , path
  )
}

// ===== USAGE EXAMPLES =====
/*
  // Basic value setting
  actions.addValue('user.name', 'John');
  actions.addValue(['user', 'profile', 'age'], 25);

  // Adding multiple values at once
  actions.addMultiple({
      settings: { theme: 'dark' },
      isActive: true
  });

  // Adding values using path-value pairs
  actions.addByPaths([
    { path: 'user.email', value: 'john@example.com' },
    { path: 'user.role', value: 'admin' },
    { path: 'app.version', value: '1.0.0' }
  ]);

  // Using functional updater for complex logic
  actions.addWithUpdater(draft => {
    draft.user.email = 'john@example.com'
    draft.user.preferences = { notifications: true }
    if (draft.user.role === 'admin') {
      draft.permissions = ['read', 'write', 'delete']
    }
  });

  // Conditional value addition
  actions.addConditional({
    'user.premium': { condition: () => customData.user.subscriptionType === 'pro', value: true },
    'ui.showAdvanced': { condition: () => customData.user.role === 'admin', value: true },
    'cache.enabled': { condition: () => customData.app.environment === 'production', value: true }
  });

  // Safe addition with validation
  actions.safeAdd('user.age', 25, (value) => typeof value === 'number' && value > 0);
  actions.safeAdd('user.email', 'invalid-email', (value) => /\S+@\S+\.\S+/.test(value));

  // Type coercion examples
  actions.addWithType('user.age', '25', 'number'); // Converts string to number
  actions.addWithType('user.isActive', 'true', 'boolean'); // Converts string to boolean
  actions.addWithType('user.tags', 'tag1,tag2', 'array'); // Converts string to array
  actions.addWithType('user.metadata', 'key:value', 'object'); // Attempts object conversion

  // Deep merging objects
  actions.deepMerge({
    user: {
      profile: { bio: 'Software developer' },
      settings: { theme: 'light' }
    },
    app: { initialized: true }
  });

  // Array operations
  actions.addToArray('user.hobbies', 'reading'); // Adds to array
  actions.addToArray('user.skills', 'JavaScript', true); // Adds only if unique
  actions.addToArray('notifications', { id: 1, message: 'Welcome!' });

  // Utility operations
  actions.reset(); // Clears all customData
  
  actions.setData({ 
    user: { name: 'Jane', age: 30 },
    settings: { theme: 'dark' }
  }); // Replaces entire state

  const currentData = actions.getData(); // Gets current state
  
  const hasUserName = actions.hasPath('user.name'); // Checks path existence  
  const userName = actions.getValueAtPath('user.name'); // Gets value at path
  const userProfile = actions.getValueAtPath(['user', 'profile']); // Using array path
*/ 