import { expect } from 'chai';
import MovementCommand from '../../src/game/movement/movement-command/movementCommand';
import Actor from '../../src/game/entities/actor';
import Movement from '../../src/game/movement/movement/movement';
import Position from '../../src/game/entities/position';
import Path from '../../src/game/movement/movement/path';

describe('Path', () => {
  describe('Creation', () => {
    const incorrectPathCreationErrorMessage = 'Can not construct a path: incorrect arguments';

    describe('When a path is correctly constructed', () => {
      it('should allow adding paths', () => {
        const path = new Path(new Position(1, 1, 0), new Position(2, 2, 0));
        expect(path).to.haveOwnProperty('start');
        expect(path).to.haveOwnProperty('end');
        expect(path.start instanceof Position);
        expect(path.end instanceof Position);
      });
    });

    describe('When the paths is constructed incorrectlly', () => {
      describe('When en path is no given as an argument', () => {
        it(`should throw an ${incorrectPathCreationErrorMessage} error`, () => {
          expect(() => new Path(new Position(1, 1, 0))).to.throw(incorrectPathCreationErrorMessage);
        });
      });
      describe('When arguments are not positions', () => {
        it(`should throw an ${incorrectPathCreationErrorMessage} error`, () => {
          expect(() => new Path(new Position(1, 1, 0), 3)).to.throw(incorrectPathCreationErrorMessage);
        });
      });
      describe('When start postion is the same as the end position', () => {
        it(`should throw an ${incorrectPathCreationErrorMessage} error`, () => {
          expect(() => new Path(new Position(1, 1, 0), new Position(1, 1, 0))).to.throw(incorrectPathCreationErrorMessage);
        });
      });
    });
  });
});

describe('Movement', () => {
  describe('Creation', () => {
    it('should be constructed', () => {
      const movement = new Movement();
      expect(movement instanceof Movement);
    });
  });

  describe('Creating paths', () => {
    const incorrectPathErrorMessage = 'Can not construct a movement: incorrect path';

    describe('When a path is correctly constructed', () => {
      it('should allow adding a path', () => {
        const movement = new Movement();
        movement.addPath(new Path(new Position(1, 1, 0), new Position(2, 2, 0)));
        expect(movement.paths.length).to.equal(1);
      });
      it('should allow adding more than 1 path', () => {
        const movement = new Movement();
        movement.addPath(new Path(new Position(1, 1, 0), new Position(2, 2, 0)));
        movement.addPath(new Path(new Position(2, 2, 0), new Position(3, 3, 0)));
        expect(movement.paths.length).to.equal(2);
      });
    });

    describe('When the paths is constructed incorrectlly', () => {
      describe('When the second path does not start where the first ends', () => {
        it(`should throw an ${incorrectPathErrorMessage} error`, () => {
          const movement = new Movement();
          movement.addPath(new Path(new Position(1, 1, 0), new Position(2, 2, 0)));
          expect(() => movement.addPath(
            new Path(new Position(1, 1, 0), new Position(3, 3, 0))))
            .to.throw(incorrectPathErrorMessage);
        });
      });
    });
  });
});

describe.only('MovementCommand', () => {
  describe('Creation', () => {
    it('should be constructed', () => {
      const movementCommand = new MovementCommand();
      expect(movementCommand instanceof MovementCommand);
    });

    it('should not be executed', () => {
      const movementCommand = new MovementCommand();
      expect(movementCommand).to.haveOwnProperty('isExecuted');
      expect(movementCommand.isExecuted).to.be.false;
    });
  });

  describe('When executing', () => {
    describe('When command is executed normally', () => {
      describe('When there is just one path', () => {
        it('should move the actor to the correct position', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          movementCommand.execute();
          expect(Position.areSame(actor.position, endPosition)).to.be.true;
        });

        it('command should have isExecuted = true', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          movementCommand.execute();
          expect(movementCommand.isExecuted).to.be.true;
        });
      });
      describe('When there are multiple paths', () => {
        it('should move the actor to the correct position', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, new Position(2, 2, 0)));
          movement.addPath(new Path(new Position(2, 2, 0), endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          movementCommand.execute();
          movementCommand.execute();
          expect(Position.areSame(actor.position, endPosition)).to.be.true;
        });

        it('should execute one path first, and then the next', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          const inBetweenPostiion = new Position(2, 2, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, inBetweenPostiion));
          movement.addPath(new Path(inBetweenPostiion, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          movementCommand.execute();
          expect(Position.areSame(actor.position, inBetweenPostiion)).to.be.true;
          movementCommand.execute();
          expect(Position.areSame(actor.position, endPosition)).to.be.true;
        });
        it('command should have isExecuted = true only when all the paths are finished', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          const inBetweenPostiion = new Position(2, 2, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, inBetweenPostiion));
          movement.addPath(new Path(inBetweenPostiion, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          movementCommand.execute();
          expect(movementCommand.isExecuted).to.be.false;
          movementCommand.execute();
          expect(movementCommand.isExecuted).to.be.true;
        });
      });
    });

    describe('When command is interuppted', () => {
      describe('When it is interupted in the first path', () => {
        it('should move the actor on the point where he was interuppted', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          const positionOfInteruption = new Position(2, 2, 0);

          movementCommand.execute();
          movementCommand.interuptLastPath(positionOfInteruption);
          expect(Position.areSame(actor.position, positionOfInteruption)).to.be.true;
        });
      });

      describe('When it is interupted in the second path', () => {
        it('should move the actor on the point where he was interuppted', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(5, 5, 0);
          const inBetweenPostiion = new Position(3, 3, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, inBetweenPostiion));
          movement.addPath(new Path(inBetweenPostiion, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          const positionOfInteruption = new Position(4, 4, 0);

          movementCommand.execute();
          movementCommand.execute();
          movementCommand.interuptLastPath(positionOfInteruption);
          expect(Position.areSame(actor.position, positionOfInteruption)).to.be.true;
        });
      });

      describe('When no position of interuption is given', () => {
        it('should not move the actor at all', () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          movementCommand.execute();
          movementCommand.interuptLastPath();
          expect(Position.areSame(actor.position, startPosition)).to.be.true;
        });
      });
      describe('When no position of interuption incorrect (not on the path)', () => {
        const incorrectPositionOfInterupptionError = 'Ivalid interuppt: Position not on the movement path';
        it(`should throw an error ${incorrectPositionOfInterupptionError}`, () => {
          const actor = new Actor('actor-id');
          const startPosition = new Position(1, 1, 0);
          const endPosition = new Position(3, 3, 0);
          actor.setPosition(startPosition);
          const movement = new Movement();
          movement.addPath(new Path(startPosition, endPosition));
          const movementCommand = new MovementCommand(actor, movement);

          const positionNotOnPath = new Position(4, 4, 0);

          movementCommand.execute();
          expect(() => movementCommand.interuptLastPath(positionNotOnPath)).to.throw(incorrectPositionOfInterupptionError);
        });
      });
    });
  });
});
