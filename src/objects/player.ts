import { Canvas } from '../engine/draw.ts';
import { ImageObject } from '../engine/gameObject.ts';
import { MouseButton } from '../engine/input.ts';
import { game } from '../main.ts';
import { Bullet } from './bullet.ts';

export class Player extends ImageObject {
  constructor(x: number, y: number) {
    super(x, y, './player.png');
  }

  draw(c: Canvas): void {
    c.drawLine(this.imageCenter(), game.input.mouse.pos, {
      startOffset: 20,
      maxLength: 20,
      minLength: 20,
    });
    c.drawImage(this.image, this.pos);
  }

  step(dtFactor: number): void {
    const target = this.pos.copy();
    if (game.input.key('w')) target.y -= 1;
    if (game.input.key('a')) target.x -= 1;
    if (game.input.key('s')) target.y += 1;
    if (game.input.key('d')) target.x += 1;
    this.pos = this.pos.moveTowards(target, 1.5 * dtFactor);

    this.setZIndex(this.pos.y + this.image.size().y);

    if (game.input.mouse.button(MouseButton.Left)) {
      new Bullet(
        this.imageCenter().moveTowards(game.input.mouse.pos, 16),
        game.input.mouse.pos
      ).activate(game);
    }
  }
}
