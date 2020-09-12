export default class Command {
  constructor () {
    /** @type {Boolean} */
    this.isExecuted = false;
  }

  execute () {
    this.isExecuted = this._execute();
  }

  /**
   * @private
   * @method
   */
  _execute () {}
}
