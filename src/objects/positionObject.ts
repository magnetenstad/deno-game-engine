import { Vec2 } from '../math';
import { GameObject } from './gameObject';

export class PositionObject extends GameObject {
  pos: Vec2;

  constructor(x: number, y: number) {
    super();
    this.pos = new Vec2(x, y);
    this.setZIndex(y);
  }
}
