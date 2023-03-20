import { canvasElement, ctx } from './dom.ts';
import { ImageAsset } from './images.ts';
import { Vec2 } from './math.ts';

export const drawRect = (pos: Vec2, size: Vec2) => {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.fillRect(pos.x, pos.y, size.x, size.y);
  ctx.restore();
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

export const drawPath = (points: Vec2[]) => {
  ctx.save();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
  ctx.restore();
};

export const drawLine = (a: Vec2, b: Vec2) => {
  drawPath([a, b]);
};
