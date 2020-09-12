import Entity from './entity';

export default class Actor extends Entity {
  /**
   *
   * @param {String} [id]
   */
  constructor (id) {
    super();

    /** @type {String} */
    this.id = id;
  }
}
