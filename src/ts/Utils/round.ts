/** Rounds number
 * @param value Number to round
 * @param precision Number of decimals
 * @returns Rounded number
 */
export function round(value: number, precision: number = 2): number {
  const multiplier = 10 ** precision
  return Math.round(value * multiplier) / multiplier
}

/**
 * Rounds number up
 * @param value Number to round
 * @returns Rounded number
 */
export function roundUp(value: number): number {
  return Math.ceil(value)
}

/**
 * Rounds number off
 * @param value Number to round
 * @returns Rounded number
 */
export function roundOff(value: number): number {
  return Math.floor(value)
}
