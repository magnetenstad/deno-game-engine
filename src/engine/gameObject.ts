import { Globals } from './globals.ts';

export class GameObject {
  __changed = true;
  __zIndex = 0;

  constructor() {
    Globals.game?.addObject(this);
  }

  step() {}
  draw(_t: number) {}
  onKeyPress(_ev: string) {}
  onKeyRelease(_ev: string) {}

  setZIndex(zIndex: number) {
    this.__zIndex = zIndex;
    this.__changed = true;
  }
}
