import { Phase, PHASE } from '../phases';

export default class EndPhase extends Phase {
  constructor () {
    super(PHASE.endPhase);
  }
}
