export default class Position {
  /**
   *
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   */
  constructor (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Compares two positions
   * @param {Position} pos1
   * @param {Position} pos2
   * @returns {Boolean}
   */
  static areSame (pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y && pos1.z === pos2.z;
  }
}
