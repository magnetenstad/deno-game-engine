import { drawOutline, drawText } from '../engine/draw.ts';
import { GameObject } from '../engine/gameObject.ts';
import { PositionObject } from '../engine/position.ts';

export class Outline extends GameObject {
  around: PositionObject[] = [];
  header = '';

  constructor(around: PositionObject[], header = '') {
    super();
    this.around = around;
    this.header = header;
  }

  draw() {
    const minX = Math.min(...this.around.map((o) => o.pos.x));
    const minY = Math.min(...this.around.map((o) => o.pos.y));
    const maxX = Math.max(...this.around.map((o) => o.pos.x));
    const maxY = Math.max(...this.around.map((o) => o.pos.y));

    drawText(this.header, minX, minY - 50, '#AAAAAA');
    drawOutline(minX - 20, minY - 40, maxX - minX + 200, maxY - minY + 80);
  }
}
