import { MouseButton } from '../../input';
import { Vec2 } from '../../math';
import { DrawContext, GameContext } from '../gameObject';
import { PositionObject } from '../positionObject';

export class ExamplePlayer extends PositionObject {
  size = new Vec2(16, 16);

  draw(ctx: DrawContext): void {
    ctx.canvas.drawLine(
      this.pos.plus(this.size.half()),
      ctx.input.mouse.worldPos,
      {
        startOffset: 20,
        maxLength: 20,
        minLength: 20,
      }
    );
    ctx.canvas.drawRect(this.pos, this.size);
  }

  step(ctx: GameContext): void {
    const target = this.pos.copy();
    if (ctx.input.key('w')) target.y -= 1;
    if (ctx.input.key('a')) target.x -= 1;
    if (ctx.input.key('s')) target.y += 1;
    if (ctx.input.key('d')) target.x += 1;
    this.pos = this.pos.moveTowards(target, 1.5 * ctx.dtFactor);

    this.setZIndex(this.pos.y + this.size.y);

    if (ctx.input.mouse.button(MouseButton.Left)) {
      new Bullet(
        this.pos
          .plus(this.size.half())
          .moveTowards(ctx.input.mouse.worldPos, 16),
        ctx.input.mouse.worldPos
      ).activate(ctx.game);
    }
  }
}

class Bullet extends PositionObject {
  direction: Vec2;
  speed = 10;

  constructor(pos: Vec2, target: Vec2) {
    super(pos.x, pos.y);
    this.direction = pos.direction(target);

    setTimeout(() => this.destruct(), 2000);
  }

  draw(ctx: DrawContext): void {
    ctx.canvas.drawCircle(3, this.pos);
  }

  step(ctx: GameContext): void {
    const canvasSize = ctx.game.getCanvasSize();
    if (this.pos.x < 0 || canvasSize.x < this.pos.x) this.direction.x *= -1;
    if (this.pos.y < 0 || canvasSize.y < this.pos.y) this.direction.y *= -1;

    this.pos = this.pos.plus(
      this.direction.multiply(this.speed * ctx.dtFactor)
    );
  }
}
