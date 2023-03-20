import { Canvas } from './draw.ts';
import { Globals } from './globals.ts';

export abstract class GameObject {
  __changed = true;
  __zIndex = 0;

  constructor() {
    this.activate();
  }

  step?(): void;
  draw?(c: Canvas, t: number): void;
  onKeyPress?(key: string): void;
  onKeyRelease?(key: string): void;
  destructor?(): void;

  activate() {
    Globals.game?.addObject(this);
  }
  deactivate() {
    Globals.game?.removeObject(this);
  }
  destruct() {
    this.deactivate();
    if (this.destructor) {
      this.destructor();
    }
  }

  setZIndex(zIndex: number) {
    this.__zIndex = zIndex;
    this.__changed = true;
  }
}
