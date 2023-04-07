import { MouseButton } from '../../input';
import { Vec2 } from '../../math';
import { DrawInfo, StepInfo } from '../gameObject';
import { PositionObject } from '../positionObject';

export class ExamplePlayer extends PositionObject {
  size = new Vec2(16, 16);

  draw(info: DrawInfo): void {
    info.canvas.drawLine(
      this.pos.plus(this.size.half()),
      info.input.mouse.worldPos,
      {
        startOffset: 20,
        maxLength: 20,
        minLength: 20,
      }
    );
    info.canvas.drawRect(this.pos, this.size);
  }

  step(info: StepInfo): void {
    const target = this.pos.copy();
    if (info.input.key('w')) target.y -= 1;
    if (info.input.key('a')) target.x -= 1;
    if (info.input.key('s')) target.y += 1;
    if (info.input.key('d')) target.x += 1;
    this.pos = this.pos.moveTowards(target, 1.5 * info.dtFactor);

    this.setZIndex(this.pos.y + this.size.y);

    if (info.input.mouse.button(MouseButton.Left)) {
      new Bullet(
        this.pos
          .plus(this.size.half())
          .moveTowards(info.input.mouse.worldPos, 16),
        info.input.mouse.worldPos
      ).activate(info.game);
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

  draw(info: DrawInfo): void {
    info.canvas.drawCircle(3, this.pos);
  }

  step(info: StepInfo, recursive: boolean = false): void {
    this.pos = this.pos.plus(
      this.direction.multiply(this.speed * info.dtFactor)
    );

    if (recursive) return;

    const canvasSize = info.game.getCanvasSize();
    const dirPrev = this.direction.copy();
    if (this.pos.x < 0 || canvasSize.x < this.pos.x) this.direction.x *= -1;
    if (this.pos.y < 0 || canvasSize.y < this.pos.y) this.direction.y *= -1;
    if (!this.direction.equals(dirPrev)) {
      this.step(info, true);
    }
  }
}
