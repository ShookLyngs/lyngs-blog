import Color from 'color';

/**
 * Convert color with alpha, return hex
 * @param value
 * @param alpha
 * @returns {Color|*}
 */
export function alpha(value, alpha) {
  if (alpha === 1) return value;
  return Color(value).alpha(alpha).string();
}

const swatchKeys = [ 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 ];

/**
 * Generate color swatch, from alpha 0.1 to alpha 1.0
 * @param value
 * @returns {{}}
 */
export function alphaSwatch(value) {
  return swatchKeys.reduce((collection, number, index) => {
    collection[number] = alpha(value, 0.1 * (index + 1));
    return collection;
  }, {})
}