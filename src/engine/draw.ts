import { canvasElement, ctx } from './dom.ts';
import { ImageAsset } from './images.ts';
import { Vec2 } from './position.ts';

export const drawRect = (x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, w, h);
};

export const drawClear = () => {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

export const drawImage = (
  imageAsset: ImageAsset,
  pos: Vec2,
  options = { smoothing: false }
) => {
  if (imageAsset.image) {
    ctx.imageSmoothingEnabled = options.smoothing;
    ctx.drawImage(
      imageAsset.image,
      pos.x,
      pos.y,
      imageAsset.image.width,
      imageAsset.image.height
    );
  }
};
