import { Canvas } from '../engine/draw.ts';
import { ImageObject } from '../engine/gameObject.ts';
import { Input, MouseButton } from '../engine/input.ts';
import { Bullet } from './bullet.ts';

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

  step(dtFactor: number): void {
    const target = this.pos.copy();
    if (Input.key('w')) target.y -= 1;
    if (Input.key('a')) target.x -= 1;
    if (Input.key('s')) target.y += 1;
    if (Input.key('d')) target.x += 1;
    this.pos = this.pos.moveTowards(target, 1.5 * dtFactor);

    this.setZIndex(this.pos.y + this.image.size().y);

    if (Input.mouse.button(MouseButton.Left)) {
      new Bullet(
        this.imageCenter().moveTowards(Input.mouse.pos, 16),
        Input.mouse.pos
      );
    }
  }
}
