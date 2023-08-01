import { DrawContext } from '..';
import { ImageAsset } from '../assets';
import { Game } from '../game';
import { PositionObject } from './positionObject';

export class ImageObject extends PositionObject {
  image: ImageAsset;

  constructor(x: number, y: number, imagePath: string) {
    super(x, y);
    this.image = new ImageAsset(imagePath);
  }

  activate(game?: Game) {
    super.activate(game);
    if (this.__game) {
      this.image.__load(this.__game);
    }
    return this;
  }

  draw(ctx: DrawContext): void {
    ctx.canvas.drawImage(this.image, this.pos);
  }

  imageCenter() {
    return this.pos.plus(this.image.size().half());
  }
}
