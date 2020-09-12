export default class Entity {
  constructor () {
    /** @type {import('./position').default} */
    this.position = null;
  }

  /**
   *
   * @param {import('./position').default} position
   */
  setPosition (position) {
    this.position = position;
  }
}
