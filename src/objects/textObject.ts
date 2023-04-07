import { DrawStyle } from '../draw';
import { DrawInfo } from './gameObject';
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

  draw(info: DrawInfo): void {
    info.canvas.drawText(this.getText(), this.pos, this.drawStyle);
  }
}
