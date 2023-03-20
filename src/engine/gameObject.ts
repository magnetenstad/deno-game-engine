import { Canvas } from './draw.ts';
import { Globals } from './globals.ts';
import { KeyboardKey, MouseButtonEvent } from './input.ts';
import { ImageAsset } from './assets.ts';
import { Vec2 } from './math.ts';

export abstract class GameObject {
  __changed = true;
  __zIndex = 0;

  constructor() {
    this.activate();
  }

  step?(): void;
  draw?(c: Canvas, t: number): void;
  onMousePress?(ev: MouseButtonEvent): void;
  onMouseRelease?(ev: MouseButtonEvent): void;
  onKeyPress?(key: KeyboardKey): void;
  onKeyRelease?(key: KeyboardKey): void;
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

export class PositionObject extends GameObject {
  pos: Vec2;

  constructor(x: number, y: number) {
    super();
    this.pos = new Vec2(x, y);
    this.setZIndex(y);
  }
}

export class ImageObject extends PositionObject {
  image: ImageAsset;

  constructor(x: number, y: number, imagePath: string) {
    super(x, y);
    this.image = new ImageAsset(imagePath);
  }

  imageCenter() {
    return this.pos.add(this.image.size().half());
  }
}
