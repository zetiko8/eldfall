import { expect } from 'chai';
import Round from '../../src/game-sequence/round/round';
import Player from '../../src/entitites/player';
import { PHASE } from '../../src/game-sequence/round/phases';
import { nextTick } from '../../src/utils';

describe.only('Round', () => {
  describe('Creation', () => {
    it('should be created', () => {
      const activePlayer = new Player('id1', 'anze', 'red');
      const reactivePlayer = new Player('id2', 'domen', 'green');
      const round = new Round(activePlayer, [ activePlayer ], [ reactivePlayer ], 0);

      expect(round).to.haveOwnProperty('roundNumber');
    });
  });

  describe('Flow', () => {
    describe('When starting', () => {
      it('should start with an unkeepPhase', () => {
        const activePlayer = new Player('id1', 'anze', 'red');
        const reactivePlayer = new Player('id2', 'domen', 'green');
        const round = new Round(activePlayer, [ activePlayer ], [ reactivePlayer ], 0);

        round.start();
        expect(round.curentPhase.phaseEnum).to.equal(PHASE.unkeep);
      });
    });

    describe('When the unkeep phase ends', () => {
      it('should countinue with a tacticalPhase', async () => {
        const activePlayer = new Player('id1', 'anze', 'red');
        const reactivePlayer = new Player('id2', 'domen', 'green');
        const round = new Round(activePlayer, [ activePlayer ], [ reactivePlayer ], 0);

        round.start();
        round.curentPhase.end();

        await nextTick();
        expect(round.curentPhase.phaseEnum).to.equal(PHASE.tactical);
      });
    });

    describe('When the tactical phase ends', () => {
      it('should countinue with a endPhase', async () => {
        const activePlayer = new Player('id1', 'anze', 'red');
        const reactivePlayer = new Player('id2', 'domen', 'green');
        const round = new Round(activePlayer, [ activePlayer ], [ reactivePlayer ], 0);

        round.start();
        round.curentPhase.end();
        await nextTick();
        round.curentPhase.end();
        await nextTick();
        expect(round.curentPhase.phaseEnum).to.equal(PHASE.endPhase);
      });
    });
  });
});
