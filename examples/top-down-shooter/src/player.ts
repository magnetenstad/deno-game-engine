import { DrawInfo, ImageObject, MouseButton, StepInfo } from 'web-game-engine';
import { Bullet } from './bullet';

export class Player extends ImageObject {
  constructor(x: number, y: number) {
    super(x, y, './player.png');
  }

  draw(info: DrawInfo): void {
    info.canvas.drawLine(this.imageCenter(), info.input.mouse.pos, {
      startOffset: 20,
      maxLength: 20,
      minLength: 20,
    });
    info.canvas.drawImage(this.image, this.pos);
  }

  step(info: StepInfo): void {
    const target = this.pos.copy();
    if (info.input.key('w')) target.y -= 1;
    if (info.input.key('a')) target.x -= 1;
    if (info.input.key('s')) target.y += 1;
    if (info.input.key('d')) target.x += 1;
    this.pos = this.pos.moveTowards(target, 1.5 * info.dtFactor);

    this.setZIndex(this.pos.y + this.image.size().y);

    if (info.input.mouse.button(MouseButton.Left)) {
      new Bullet(
        this.imageCenter().moveTowards(info.input.mouse.pos, 16),
        info.input.mouse.pos
      ).activate(info.game);
    }
  }
}
