import { PositionObject, DrawInfo } from 'web-game-engine';

export class Text extends PositionObject {
  getText: () => string;

  constructor(getText: () => string, x: number, y: number) {
    super(x, y);
    this.getText = getText;
  }

  draw(info: DrawInfo): void {
    info.canvas.drawText(this.getText(), this.pos);
  }
}
