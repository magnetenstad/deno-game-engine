import {
  DrawContext,
  ImageObject,
  MouseButton,
  GameContext,
} from '../../../lib';
import { MouseButtonEvent } from '../../../lib/input';
import { Bullet } from './bullet';

export class Player extends ImageObject {
  constructor(x: number, y: number) {
    super(x, y, './player.png');
  }

  draw(ctx: DrawContext): void {
    ctx.canvas.drawLine(this.imageCenter(), ctx.input.mouse.worldPos, {
      startOffset: 20,
      maxLength: 20,
      minLength: 20,
    });
    ctx.canvas.drawImage(this.image, this.pos);
  }

  step(ctx: GameContext): void {
    const target = this.pos.copy();
    if (ctx.input.key('w')) target.y -= 1;
    if (ctx.input.key('a')) target.x -= 1;
    if (ctx.input.key('s')) target.y += 1;
    if (ctx.input.key('d')) target.x += 1;
    this.pos = this.pos.moveTowards(target, 1.5 * ctx.dtFactor);

    this.setZIndex(this.pos.y + this.image.size().y);
  }

  onMousePress(ev: MouseButtonEvent, ctx: GameContext): void {
    if (ev.button == MouseButton.Left) {
      new Bullet(
        this.imageCenter().moveTowards(ev.worldPos, 16),
        ev.worldPos
      ).activate(ctx.game);
    }
  }
}
