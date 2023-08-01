import { Vec2 } from '../../../lib';
import { ImageObject, GameContext } from '../../../lib';
import { randomInt } from '../../../lib/math';
import { Bullet } from './bullet';

export class Enemy extends ImageObject {
  target: Vec2 = new Vec2(0, 0);

  constructor(x: number, y: number) {
    super(x, y, './enemy.png');
  }

  onActivate(ctx: GameContext) {
    this.randomizeTarget(ctx);
  }

  step(ctx: GameContext): void {
    this.pos = this.pos.moveTowards(this.target, 1 * ctx.dtFactor);
    this.setZIndex(this.pos.y + this.image.size().y);

    if (this.pos.lengthTo(this.target) < 32) {
      this.randomizeTarget(ctx);
    }

    const bullets = ctx.game.getInstancesOfClass<Bullet>(Bullet);
    bullets.forEach((bullet) => {
      if (bullet.pos.lengthTo(this.imageCenter()) < this.image.size().x) {
        bullet.destruct();
        new Enemy(this.pos.x, this.pos.y).activate(ctx.game);
        new Enemy(this.pos.x, this.pos.y).activate(ctx.game);
        this.destruct();
      }
    });
  }

  randomizeTarget(ctx: GameContext) {
    const canvasSize = ctx.game.getCanvasSize();
    this.target = new Vec2(
      randomInt(0, canvasSize.x),
      randomInt(0, canvasSize.y)
    );
  }
}
