/**
 * The LAB color configuration object.
 */
export interface Lab {
  /** The lightness value, on scale of 0 to 100. */
  L: number;
  /** The chroma value, on scale of -128 to 128 */
  A: number;
  /** The hue value, on scale of -128 to 128 */
  B: number;
}

declare class DeltaE {
  /**
   * The CIE76 color difference algorithm: a simple euclidean distance calculation.
   * http://en.wikipedia.org/wiki/Color_difference#CIE76
   */
  getDeltaE76(x1: Lab, x2: Lab): number;

  /**
   * The CIE94 algorithm: an iteration of the CIE76 algorithm.
   * http://en.wikipedia.org/wiki/Color_difference#CIE94
   */
  getDeltaE94(x1: Lab, x2: Lab): number;

  /**
   * The CIE2000 color difference algorithm.
   * http://en.wikipedia.org/wiki/Color_difference#CIEDE2000
   */

  getDeltaE00(x1: Lab, x2: Lab): number;
}

declare const deltaE: DeltaE;

export default deltaE;
