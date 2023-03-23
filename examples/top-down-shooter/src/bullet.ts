import { PositionObject, DrawInfo, StepInfo } from 'web-game-engine';
import { Vec2 } from 'web-game-engine/lib/math';

export class Bullet extends PositionObject {
  direction: Vec2;
  speed = 10;

  constructor(pos: Vec2, target: Vec2) {
    super(pos.x, pos.y);
    this.direction = pos.direction(target);

    setTimeout(() => this.destruct(), 2000);
  }

  draw(info: DrawInfo): void {
    info.canvas.drawCircle(3, this.pos);
  }

  step(info: StepInfo): void {
    this.pos = this.pos.add(
      this.direction.multiply(this.speed * info.dtFactor)
    );

    const canvasSize = info.game.getCanvasSize();
    if (this.pos.x < 0 || canvasSize.x < this.pos.x) this.direction.x *= -1;
    if (this.pos.y < 0 || canvasSize.y < this.pos.y) this.direction.y *= -1;
  }
}
