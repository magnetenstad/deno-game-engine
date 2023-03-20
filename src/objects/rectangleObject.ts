import { Canvas } from '../engine/draw.ts';
import { Vec2 } from '../engine/math.ts';
import { PositionObject } from '../engine/gameObject.ts';

export class RectangleSinObject extends PositionObject {
  x0: number;
  size: Vec2;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.x0 = x;
    this.size = new Vec2(width, height);
    this.setZIndex(this.pos.y + this.size.y);
  }

  draw(c: Canvas, t: number): void {
    this.pos.x = this.x0 + Math.sin(t / 40) * 100;
    c.drawRect(this.pos, this.size);
  }
}
