import { DrawStyle } from '../draw';
import { DrawContext } from './gameObject';
import { PositionObject } from './positionObject';

export class TextObject extends PositionObject {
  getText: () => string;
  drawStyle: DrawStyle;

  constructor(
    getText: () => string,
    x: number,
    y: number,
    drawStyle: DrawStyle = {}
  ) {
    super(x, y);
    this.getText = getText;
    this.drawStyle = drawStyle;
  }

  draw(ctx: DrawContext): void {
    ctx.canvas.drawText(this.getText(), this.pos, this.drawStyle);
  }
}
