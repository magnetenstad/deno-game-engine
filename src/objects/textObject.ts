import { Canvas } from '../engine/draw.ts';
import { PositionObject } from '../engine/gameObject.ts';

export class TextObject extends PositionObject {
  getText: () => string;

  constructor(getText: () => string, x: number, y: number) {
    super(x, y);
    this.getText = getText;
  }

  draw(c: Canvas): void {
    c.drawText(this.getText(), this.pos);
  }
}
