import Command from '../../commands/command';
import Path from '../movement/path';

const incorrectPositionOfInterupptionError = 'Ivalid interuppt: Position not on the movement path';

export default class MovementCommand extends Command {
  /**
   *
   * @param {import('../../entities/actor').default} actor
   * @param {import('../movement/movement').default} movement
   */
  constructor (actor, movement) {
    super();
    this.actor = actor;
    this.movement = movement;

    /** @private */
    this._nextPathIndex = 0;
  }

  /**
   * @private
   * @method
   * @returns {Boolean}
   */
  _execute () {
    return this._executeNextPath();
  }

  /**
   * @private
   * @method
   * @returns {Boolean}
   */
  _executeNextPath () {
    this.actor.setPosition(this.movement.paths[this._nextPathIndex].end);
    this._nextPathIndex++;

    if (this._nextPathIndex === this.movement.paths.length) return true;
    else return false;
  }

  /**
   * @param {Position} positionOfInteruption
   */
  interuptLastPath (positionOfInteruption) {
    const lastPath = this.movement.paths[this._nextPathIndex - 1];
    if (!positionOfInteruption) {
      this.actor.setPosition(lastPath.start);
    } else {
      if (!Path.isPositionOnPath(positionOfInteruption, lastPath)) throw Error(incorrectPositionOfInterupptionError);
      this.actor.setPosition(positionOfInteruption);
    }
  }
}
