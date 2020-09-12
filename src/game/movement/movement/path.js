import Position from '../../entities/position';

const errMessage = 'Can not construct a path: incorrect arguments';

export default class Path {
  /**
   *
   * @param {import('../../entities/position').default} start
   * @param {import('../../entities/position').default} end
   */
  constructor (start, end) {
    if (!start || !end ||
      !(start instanceof Position) || !(end instanceof Position) ||
      Position.areSame(start, end)) throw Error(errMessage);
    this.start = start;
    this.end = end;
  }

  /**
   *
   * @param {Position} position
   * @param {Path} path
   * @returns {Boolean}
   */
  static isPositionOnPath (position, path) {
    const dxc = position.x - path.start.x;
    const dyc = position.y - path.start.y;

    const dxl = path.end.x - path.start.x;
    const dyl = path.end.y - path.start.y;

    const cross = dxc * dyl - dyc * dxl;

    if (cross !== 0) return false;

    if (Math.abs(dxl) >= Math.abs(dyl)) {
      return dxl > 0
        ? path.start.x <= position.x && position.x <= path.end.x
        : path.end.x <= position.x && position.x <= path.start.x;
    } else {
      return dyl > 0
        ? path.start.y <= position.y && position.y <= path.end.y
        : path.end.y <= position.y && position.y <= path.start.y;
    }
  }
}
