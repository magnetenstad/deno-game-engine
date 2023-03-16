import { canvasElement, ctx } from './dom.ts';
import { ImageAsset } from './images.ts';

export const drawRect = (x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, w, h);
};

export const drawClear = () => {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

export const drawImage = (
  imageAsset: ImageAsset,
  x: number,
  y: number,
  options = { smoothing: false }
) => {
  if (imageAsset.image) {
    ctx.imageSmoothingEnabled = options.smoothing;
    ctx.drawImage(
      imageAsset.image,
      x,
      y,
      imageAsset.image.width,
      imageAsset.image.height
    );
  }
};
