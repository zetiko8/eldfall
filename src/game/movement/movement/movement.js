import Position from '../../entities/position';

const incorrectPathErrorMessage = 'Can not construct a movement: incorrect path';

export default class Movement {
  constructor () {
    /** @type {import('./path').default[]} */
    this.paths = [];
  }

  /**
   *
   * @param {import('./path').default} path
   */
  addPath (path) {
    if (this.paths.length) {
      if (!Position.areSame(this.paths[this.paths.length - 1].end, path.start)) {
        throw Error(incorrectPathErrorMessage);
      }
    }
    this.paths.push(path);
  }
}
