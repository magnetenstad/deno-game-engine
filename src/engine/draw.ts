import { __canvasElement, __ctx } from './dom.ts';
import { ImageAsset } from './assets.ts';
import { Vec2 } from './math.ts';

export type DrawStyle = {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
};

const withStyle = (style: DrawStyle, func: () => void) => {
  __ctx.save();
  if (style.strokeStyle !== undefined) __ctx.strokeStyle = style.strokeStyle;
  if (style.lineWidth !== undefined) __ctx.lineWidth = style.lineWidth;
  if (style.fillStyle !== undefined) __ctx.fillStyle = style.fillStyle;
  func();
  __ctx.restore();
};

export const drawRect = (
  pos: Vec2,
  size: Vec2,
  style: DrawStyle = { fillStyle: 'white' }
) => {
  withStyle(style, () => {
    __ctx.fillRect(pos.x, pos.y, size.x, size.y);
  });
};

export const drawClear = () => {
  __ctx.clearRect(0, 0, __canvasElement.width, __canvasElement.height);
};

export const drawImage = (
  imageAsset: ImageAsset,
  pos: Vec2,
  options = { smoothing: false }
) => {
  if (imageAsset.__image) {
    __ctx.imageSmoothingEnabled = options.smoothing;
    __ctx.drawImage(
      imageAsset.__image,
      pos.x,
      pos.y,
      imageAsset.__image.width,
      imageAsset.__image.height
    );
  }
};

export const drawPath = (
  points: Vec2[],
  style: DrawStyle = {
    strokeStyle: 'white',
    lineWidth: 1,
  }
) => {
  withStyle(style, () => {
    __ctx.beginPath();
    __ctx.moveTo(points[0].x, points[0].y);
    for (let i = 0; i < points.length; i++) {
      __ctx.lineTo(points[i].x, points[i].y);
    }
    __ctx.stroke();
  });
};

export const drawLine = (a: Vec2, b: Vec2) => {
  drawPath([a, b]);
};
