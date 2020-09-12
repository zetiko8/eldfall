import { PHASE } from './phases';
import UnkeepPhase from './unkeep-phase/unkeepPhase';
import TacticalPhase from './tactical-phase/tacticalPhase';
import EndPhase from './end-phase/endPhase';

export default class Round {
  /**
   *
   * @param {import('../../entitites/player').default} activePlayer
   * @param {import('../../entitites/player').default[]} activePlayerTeam
   * @param {import('../../entitites/player').default[]} reactivePlayers
   * @param {Number} roundNumber
   */
  constructor (activePlayer, activePlayerTeam, reactivePlayers, roundNumber) {
    this.activePlayer = activePlayer;
    this.activePlayerTeam = activePlayerTeam;
    this.reactivePlayers = reactivePlayers;
    this.roundNumber = roundNumber;

    /** @type {import('./phases').Phase} */
    this.curentPhase = null;
  }

  async start () {
    await this._startUnkeepPhase();
    await this._startTacticalPhase();
    await this._startEndPhase();
  }

  async _startUnkeepPhase () {
    return new Promise((resolve, reject) => {
      this.curentPhase = new UnkeepPhase();
      this.curentPhase.onEnd(() => {
        resolve();
      });
    });
  }

  async _startTacticalPhase () {
    return new Promise((resolve, reject) => {
      this.curentPhase = new TacticalPhase();
      this.curentPhase.onEnd(() => {
        resolve();
      });
    });
  }

  async _startEndPhase () {
    return new Promise((resolve, reject) => {
      this.curentPhase = new EndPhase();
      this.curentPhase.onEnd(() => {
        resolve();
      });
    });
  }
}
