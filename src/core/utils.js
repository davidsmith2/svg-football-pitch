/**
 * @private
 * @returns {number}
 */
export function convertLengthToPixels() {
  return this.settings.length * this.settings.scaleFactor;
}

/**
 * @private
 * @returns {number}
 */
export function convertWidthToPixels() {
  return this.settings.width * this.settings.scaleFactor;
}

/**
 * @private
 * @param value
 * @param unit
 * @returns {string}
 */
export function display (value, unit) {
  if (value !== 1) {
    unit += 's';
  }
  return `${value} ${unit}`;
}

/**
 * @private
 * @param value
 * @returns {number}
 */
export function getCoord(value) {
  return Math.round(value / this.settings.scaleFactor);
}

/**
 * @private
 * @param radians
 * @returns {number}
 */
export function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

/**
 * @private
 * @param degrees
 * @returns {number}
 */
export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * @private
 * @param value
 * @returns {number}
 */
export function toSquare(value) {
  return value * value;
}

/**
 * @private
 * @param tx
 * @param ty
 * @returns {string}
 */
export function translate(tx, ty) {
  return `translate(${tx}, ${ty})`;
}