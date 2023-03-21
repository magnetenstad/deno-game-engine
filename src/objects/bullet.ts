import { Canvas } from '../engine/draw.ts';
import { PositionObject } from '../engine/gameObject.ts';
import { Vec2 } from '../engine/math.ts';
import { game } from '../main.ts';

export class Bullet extends PositionObject {
  direction: Vec2;
  speed = 10;

  constructor(pos: Vec2, target: Vec2) {
    super(pos.x, pos.y);
    this.direction = pos.direction(target);

    setTimeout(() => this.destruct(), 2000);
  }

  draw(c: Canvas): void {
    c.drawCircle(3, this.pos);
  }

  step(dtFactor: number): void {
    this.pos = this.pos.add(this.direction.multiply(this.speed * dtFactor));

    const canvasSize = game.getCanvasSize();
    if (this.pos.x < 0 || canvasSize.x < this.pos.x) this.direction.x *= -1;
    if (this.pos.y < 0 || canvasSize.y < this.pos.y) this.direction.y *= -1;
  }
}
