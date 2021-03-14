import Color from 'color';

/**
 * Convert color with alpha, return hex
 * @param value
 * @param alpha
 * @returns {Color|*}
 */
export function alpha(value, alpha) {
  return Color(value).alpha(alpha).string();
}