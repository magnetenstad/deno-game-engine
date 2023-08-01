import { DrawContext, PositionObject, GameContext, Vec2 } from '../../../lib';

export class Bullet extends PositionObject {
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
