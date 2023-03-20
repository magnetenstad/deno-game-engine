import { Canvas } from '../engine/draw.ts';
import { PositionObject } from '../engine/gameObject.ts';
import { Vec2 } from '../engine/math.ts';

export class Bullet extends PositionObject {
  direction: Vec2;
  speed = 10;

  constructor(pos: Vec2, target: Vec2) {
    super(pos.x, pos.y);
    this.direction = pos.direction(target);
  }

  draw(c: Canvas): void {
    c.drawCircle(3, this.pos);
  }

  step(): void {
    this.pos = this.pos.add(this.direction.multiply(this.speed));
  }
}
