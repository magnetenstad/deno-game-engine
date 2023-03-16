import { drawRect } from '../engine/draw.ts';
import { PositionObject } from '../engine/position.ts';

export class RectangleSinObject extends PositionObject {
  x0: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y);
    this.x0 = x;
    this.width = width;
    this.height = height;
    this.setZIndex(this.pos.y + this.height);
  }

  draw(t: number): void {
    this.pos.x = this.x0 + Math.sin(t / 40) * 100;
    drawRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
