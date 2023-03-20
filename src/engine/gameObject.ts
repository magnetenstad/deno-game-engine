import { Globals } from './globals.ts';

export class GameObject {
  __changed = true;
  __zIndex = 0;

  constructor() {
    this.activate();
  }

  step() {}
  draw(_t: number) {}
  onKeyPress(_key: string) {}
  onKeyRelease(_key: string) {}
  destructor() {}

  activate() {
    Globals.game?.addObject(this);
  }
  deactivate() {
    Globals.game?.removeObject(this);
  }
  destruct() {
    this.deactivate();
    this.destructor();
  }

  setZIndex(zIndex: number) {
    this.__zIndex = zIndex;
    this.__changed = true;
  }
}
