import { __canvasElement } from './dom.ts';
import { ImageAsset } from './assets.ts';
import { Vec2 } from './math.ts';

export type DrawStyle = {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
};

export class Canvas {
  __canvasElement: HTMLCanvasElement;
  __ctx: CanvasRenderingContext2D;

  constructor(canvasElement: HTMLCanvasElement) {
    this.__canvasElement = canvasElement;
    this.__ctx = this.__canvasElement.getContext('2d')!;

    if (!this.__ctx) {
      console.error('Could not get context of canvas!');
    }
  }

  withStyle = (style: DrawStyle, func: () => void) => {
    this.__ctx.save();
    if (style.strokeStyle !== undefined)
      this.__ctx.strokeStyle = style.strokeStyle;
    if (style.lineWidth !== undefined) this.__ctx.lineWidth = style.lineWidth;
    if (style.fillStyle !== undefined) this.__ctx.fillStyle = style.fillStyle;
    func();
    this.__ctx.restore();
  };

  drawRect(pos: Vec2, size: Vec2, style: DrawStyle = { fillStyle: 'white' }) {
    this.withStyle(style, () => {
      this.__ctx.fillRect(pos.x, pos.y, size.x, size.y);
    });
  }

  drawClear() {
    this.__ctx.clearRect(0, 0, __canvasElement.width, __canvasElement.height);
  }

  drawImage = (
    imageAsset: ImageAsset,
    pos: Vec2,
    options = { smoothing: false }
  ) => {
    if (imageAsset.__image) {
      this.__ctx.imageSmoothingEnabled = options.smoothing;
      this.__ctx.drawImage(
        imageAsset.__image,
        pos.x,
        pos.y,
        imageAsset.__image.width,
        imageAsset.__image.height
      );
    }
  };

  drawPath(
    points: Vec2[],
    style: DrawStyle = {
      strokeStyle: 'white',
      lineWidth: 1,
    }
  ) {
    this.withStyle(style, () => {
      this.__ctx.beginPath();
      this.__ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length; i++) {
        this.__ctx.lineTo(points[i].x, points[i].y);
      }
      this.__ctx.stroke();
    });
  }

  drawLine(a: Vec2, b: Vec2) {
    this.drawPath([a, b]);
  }
}
