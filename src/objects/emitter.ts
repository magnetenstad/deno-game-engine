import { GameObject } from '../engine/gameObject.ts';

export class Emitter extends GameObject {
  data: unknown;
  interval: number;
  emitPrev = 0;
  func: () => void;

  constructor(interval: number, func: () => void) {
    super();
    this.interval = interval;
    this.func = func;
  }

  step(): void {
    const now = new Date().getTime();
    if (now - this.emitPrev > this.interval) {
      this.func();
      this.emitPrev = now;
    }
  }
}
