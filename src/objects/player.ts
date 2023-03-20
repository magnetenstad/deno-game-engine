import { ImageAsset } from '../engine/assets.ts';
import { Canvas } from '../engine/draw.ts';
import { Input } from '../engine/input.ts';
import { Vec2 } from '../engine/math.ts';
import { PositionObject } from '../engine/position.ts';

const size = 16;

export class Player extends PositionObject {
  speed = 10;
  image = new ImageAsset('./player.png');
  target: Vec2;

  constructor(x: number, y: number) {
    super(x, y);
    this.target = this.pos.copy();
  }

  draw(c: Canvas): void {
    c.drawLine(this.image.size().center(this.pos), Input.mouse.pos);
    c.drawImage(this.image, this.pos);
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
