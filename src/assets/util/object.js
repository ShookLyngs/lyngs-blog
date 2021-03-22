
/**
 * Check whether if target is an Object.
 * @param target
 * @returns {boolean}
 */
export const isObject = target => Object.prototype.toString.call(target) === '[object Object]';