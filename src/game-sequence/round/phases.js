export const PHASE = {
  unkeep: 'unkeepPhase',
  tactical: 'tacticalPhase',
  endPhase: 'endPhase',
  strategicPhase: 'strategicPhase'
};

export class Phase {
  constructor (phaseEnum) {
    this.phaseEnum = phaseEnum;

    this.onEndHandlers = [];
    this.onStartHandlers = [];
  }

  end () {
    this.onEndHandlers.forEach(handler => handler());
  }

  start () {
    this.onStartHandlers.forEach(handler => handler());
  }

  onEnd (handler) {
    this.onEndHandlers.push(handler);
  }

  onStart (handler) {
    this.onStartHandlers.push(handler);
  }
}
