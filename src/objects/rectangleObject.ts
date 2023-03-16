import { drawRect } from '../draw.ts';
import { PositionObject } from '../gameObject.ts';
import { drawStep } from '../main.ts';

export class RectangleSinObject extends PositionObject {
  draw(): void {
    drawRect(
      this.pos.x + Math.sin(drawStep / 10) * 100,
      this.pos.y + 10,
      50,
      50
    );
  }
}
