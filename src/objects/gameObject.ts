import { Canvas } from '../draw';
import { Input, KeyboardKey, MouseButtonEvent } from '../input';
import { Game } from '../game';

export type DrawInfo = { game: Game; canvas: Canvas; t: number; input: Input };
export type StepInfo = {
  game: Game;
  input: Input;
  dtFactor: number;
};

export abstract class GameObject {
  __changed = true;
  __zIndex = 0;
  __game?: Game;

  constructor() {
    this.activate();
  }

  step?(info: StepInfo): void;
  draw?(info: DrawInfo): void;
  onMousePress?(ev: MouseButtonEvent): void;
  onMouseRelease?(ev: MouseButtonEvent): void;
  onKeyPress?(key: KeyboardKey): void;
  onKeyRelease?(key: KeyboardKey): void;
  destructor?(): void;

  activate(game?: Game) {
    if (game) {
      this.deactivate();
      this.__game = game;
    }
    this.__game?.__addObject(this);
    return this;
  }

  deactivate() {
    this.__game?.__removeObject(this);
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
