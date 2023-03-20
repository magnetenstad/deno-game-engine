import { Canvas } from '../engine/draw.ts';
import { ImageObject } from '../engine/gameObject.ts';
import { Input, MouseButton, MouseButtonEvent } from '../engine/input.ts';
import { Bullet } from './bullet.ts';

const size = 16;

export class Player extends ImageObject {
  constructor(x: number, y: number) {
    super(x, y, './player.png');
  }

  draw(c: Canvas): void {
    c.drawLine(this.imageCenter(), Input.mouse.pos, {
      startOffset: 20,
      maxLength: 20,
      minLength: 20,
    });
    c.drawImage(this.image, this.pos);
  }

  step(): void {
    const target = this.pos;
    if (Input.key('w')) target.y -= 1;
    if (Input.key('a')) target.x -= 1;
    if (Input.key('s')) target.y += 1;
    if (Input.key('d')) target.x += 1;
    this.pos = this.pos.moveTowards(target, 1);
    this.setZIndex(this.pos.y + size);
  }

  onMousePress(ev: MouseButtonEvent): void {
    if (ev.button === MouseButton.Left) {
      new Bullet(this.imageCenter().moveTowards(ev.pos, 16), ev.pos);
    }
  }
}
