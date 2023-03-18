import { GameObject } from '../engine/gameObject.ts';
import { globalInput } from '../main.ts';

export class Emitter extends GameObject {
  data: unknown;
  interval: number;
  emitPrev = 0;
  func: (value?: number) => void;

  constructor(interval: number, func: (value?: number) => void) {
    super();
    this.interval = interval;
    this.func = func;
  }

  step(): void {
    const now = new Date().getTime();
    if (now - this.emitPrev > this.interval && globalInput.autoEmit) {
      this.func();
      this.emitPrev = now;
    }
  }
}
