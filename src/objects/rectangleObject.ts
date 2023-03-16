import { drawRect } from '../engine/draw.ts';
import { PositionObject } from '../engine/gameObject.ts';

export class RectangleSinObject extends PositionObject {
  draw(t: number): void {
    drawRect(this.pos.x + Math.sin(t / 10) * 100, this.pos.y + 10, 50, 50);
  }
}
