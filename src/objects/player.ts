import { drawRect } from '../draw.ts';
import { Input } from '../events.ts';
import { PositionObject } from '../gameObject.ts';

export class Player extends PositionObject {
  speed = 10;

  draw(): void {
    drawRect(this.pos.x, this.pos.y, 30, 30);
  }

  step(): void {
    if (Input.key('w')) this.pos.y -= this.speed;
    if (Input.key('a')) this.pos.x -= this.speed;
    if (Input.key('s')) this.pos.y += this.speed;
    if (Input.key('d')) this.pos.x += this.speed;
  }
}
