import { drawImage } from '../engine/draw.ts';
import { Input } from '../engine/events.ts';
import { Vec2, PositionObject } from '../engine/position.ts';
import { Assets } from '../main.ts';

const size = 16;

export class Player extends PositionObject {
  speed = 10;
  image = Assets.player;
  target: Vec2;

  constructor(x: number, y: number) {
    super(x, y);
    this.target = this.pos.copy();
  }

  draw(): void {
    drawImage(this.image, this.pos);
  }

  step(): void {
    const snapped = this.pos.snap(size);
    if (Input.key('w')) this.target.y = snapped.y - size;
    if (Input.key('a')) this.target.x = snapped.x - size;
    if (Input.key('s')) this.target.y = snapped.y + size;
    if (Input.key('d')) this.target.x = snapped.x + size;
    this.pos.x += Math.sign(this.target.x - this.pos.x);
    this.pos.y += Math.sign(this.target.y - this.pos.y);
    this.setZIndex(this.pos.y + size);
  }
}
