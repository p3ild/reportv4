import { produce } from 'immer'

/**
 * Object manipulation utilities using immer
 * Provides immutable updates with intuitive mutable-style syntax
 */

// ===== IMMER-BASED OBJECT UTILITIES =====

/**
 * Add a single value to an object at the specified path using immer
 * @param {Object} obj - Source object
 * @param {string|Array} path - Path to set (dot notation string or array)
 * @param {any} value - Value to set
 * @returns {Object} New object with the value added
 */
export function addValueToObject(obj, path, value) {
  return produce(obj, draft => {
    const pathArray = Array.isArray(path) ? path : path.split('.')
    let current = draft
    
    // Navigate to the parent of the target property
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!(pathArray[i] in current) || typeof current[pathArray[i]] !== 'object') {
        current[pathArray[i]] = {}
      }
      current = current[pathArray[i]]
    }
    
    // Set the final property
    current[pathArray[pathArray.length - 1]] = value
  })
}

/**
 * Add multiple values to an object using immer
 * @param {Object} obj - Source object
 * @param {Object} values - Object with values to merge
 * @returns {Object} New object with values added
 */
export function addMultipleValues(obj, values) {
  return produce(obj, draft => {
    Object.assign(draft, values)
  })
}

/**
 * Add values using path-value pairs with immer
 * @param {Object} obj - Source object
 * @param {Array} pathValuePairs - Array of {path, value} objects
 * @returns {Object} New object with values added
 */
export function addValuesByPaths(obj, pathValuePairs) {
  return produce(obj, draft => {
    pathValuePairs.forEach(({ path, value }) => {
      const pathArray = Array.isArray(path) ? path : path.split('.')
      let current = draft
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!(pathArray[i] in current) || typeof current[pathArray[i]] !== 'object') {
          current[pathArray[i]] = {}
        }
        current = current[pathArray[i]]
      }
      
      current[pathArray[pathArray.length - 1]] = value
    })
  })
}

/**
 * Add values using a functional updater pattern with immer
 * @param {Object} obj - Source object
 * @param {Function} updater - Function that receives draft and modifies it
 * @returns {Object} New object with updates applied
 */
export function addValueWithUpdater(obj, updater) {
  return produce(obj, draft => {
    updater(draft)
  })
}

/**
 * Conditionally add values to an object with immer
 * @param {Object} obj - Source object
 * @param {Object} conditionalValues - Object with conditional values
 * @returns {Object} New object with conditional values added
 */
export function addConditionalValues(obj, conditionalValues) {
  return produce(obj, draft => {
    Object.entries(conditionalValues).forEach(([path, config]) => {
      const { condition, value, defaultValue } = config
      
      let shouldAdd = false
      if (typeof condition === 'function') {
        shouldAdd = condition(draft)
      } else {
        shouldAdd = Boolean(condition)
      }
      
      if (shouldAdd && value !== undefined) {
        const pathArray = path.split('.')
        let current = draft
        
        for (let i = 0; i < pathArray.length - 1; i++) {
          if (!(pathArray[i] in current)) {
            current[pathArray[i]] = {}
          }
          current = current[pathArray[i]]
        }
        
        current[pathArray[pathArray.length - 1]] = value
      } else if (!shouldAdd && defaultValue !== undefined) {
        const pathArray = path.split('.')
        let current = draft
        
        for (let i = 0; i < pathArray.length - 1; i++) {
          if (!(pathArray[i] in current)) {
            current[pathArray[i]] = {}
          }
          current = current[pathArray[i]]
        }
        
        current[pathArray[pathArray.length - 1]] = defaultValue
      }
    })
  })
}

// ===== UTILITY FUNCTIONS =====

/**
 * Safe object update with validation using immer
 * @param {Object} obj - Source object
 * @param {string|Array} path - Path to update
 * @param {any} value - New value
 * @param {Function} validator - Optional validator function
 * @returns {Object} Updated object or original if validation fails
 */
export function safeAddValue(obj, path, value, validator) {
  if (validator && !validator(value)) {
    console.warn(`Validation failed for path: ${path}`, { path, value })
    return obj // Return original object unchanged
  }
  
  return addValueToObject(obj, path, value)
}

/**
 * Add value with type coercion using immer
 * @param {Object} obj - Source object  
 * @param {string|Array} path - Path to set
 * @param {any} value - Value to set
 * @param {string} type - Target type ('string', 'number', 'boolean', 'array', 'object')
 * @returns {Object} New object with coerced value
 */
export function addValueWithType(obj, path, value, type) {
  let coercedValue = value
  
  switch (type) {
    case 'string':
      coercedValue = String(value)
      break
    case 'number':
      coercedValue = Number(value)
      break
    case 'boolean':
      coercedValue = Boolean(value)
      break
    case 'array':
      coercedValue = Array.isArray(value) ? value : [value]
      break
    case 'object':
      coercedValue = typeof value === 'object' && value !== null ? value : { value }
      break
    default:
      coercedValue = value
  }
  
  return addValueToObject(obj, path, coercedValue)
}

/**
 * Deep merge objects using immer
 * @param {Object} obj - Source object
 * @param {Object} updates - Object to merge deeply
 * @returns {Object} New deeply merged object
 */
export function deepMergeValues(obj, updates) {
  return produce(obj, draft => {
    function deepAssign(target, source) {
      Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key] || typeof target[key] !== 'object') {
            target[key] = {}
          }
          deepAssign(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      })
    }
    
    deepAssign(draft, updates)
  })
}

/**
 * Add value to array property (creates array if doesn't exist)
 * @param {Object} obj - Source object
 * @param {string|Array} path - Path to array property
 * @param {any} value - Value to add to array
 * @param {boolean} unique - Whether to avoid duplicates
 * @returns {Object} New object with value added to array
 */
export function addValueToArray(obj, path, value, unique = false) {
  return produce(obj, draft => {
    const pathArray = Array.isArray(path) ? path : path.split('.')
    let current = draft
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!(pathArray[i] in current)) {
        current[pathArray[i]] = {}
      }
      current = current[pathArray[i]]
    }
    
    const finalKey = pathArray[pathArray.length - 1]
    
    if (!Array.isArray(current[finalKey])) {
      current[finalKey] = []
    }
    
    if (unique && current[finalKey].includes(value)) {
      return // Don't add duplicate
    }
    
    current[finalKey].push(value)
  })
}

// ===== EXAMPLES AND USAGE =====

/*
// Usage Examples with Immer:

const emptyObj = {}

// Add single value
const obj1 = addValueToObject(emptyObj, 'user.name', 'John')
// Result: { user: { name: 'John' } }

// Add multiple values at once
const obj2 = addMultipleValues(emptyObj, {
  user: { name: 'John', age: 30 },
  settings: { theme: 'dark' }
})
// Result: { user: { name: 'John', age: 30 }, settings: { theme: 'dark' } }

// Add by paths
const obj3 = addValuesByPaths(emptyObj, [
  { path: 'user.name', value: 'John' },
  { path: 'user.age', value: 30 },
  { path: 'settings.theme', value: 'dark' }
])

// Add with functional updater
const obj4 = addValueWithUpdater(emptyObj, draft => {
  draft.user = { name: 'John', age: 30 }
  draft.settings = { theme: 'dark' }
  draft.features = ['auth', 'notifications']
})

// Add conditional values
const obj5 = addConditionalValues(emptyObj, {
  'user.isAdmin': {
    condition: (draft) => draft.user?.role === 'admin',
    value: true,
    defaultValue: false
  },
  'features.darkMode': {
    condition: true,
    value: 'enabled'
  }
})

// Safe add with validation
const obj6 = safeAddValue(emptyObj, 'user.email', 'john@example.com', 
  (email) => email.includes('@'))

// Add with type coercion
const obj7 = addValueWithType(emptyObj, 'user.age', '30', 'number')
// Result: { user: { age: 30 } } (converted string to number)

// Deep merge
const obj8 = deepMergeValues(
  { user: { name: 'John', settings: { theme: 'light' } } },
  { user: { age: 30, settings: { notifications: true } } }
)
// Result: { user: { name: 'John', age: 30, settings: { theme: 'light', notifications: true } } }

// Add to array
const obj9 = addValueToArray(emptyObj, 'user.roles', 'admin')
const obj10 = addValueToArray(obj9, 'user.roles', 'editor', true) // unique: true
// Result: { user: { roles: ['admin', 'editor'] } }
*/ 

