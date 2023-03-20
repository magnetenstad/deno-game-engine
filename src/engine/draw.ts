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

  drawLine(
    a: Vec2,
    b: Vec2,
    options: {
      startOffset?: number;
      endOffset?: number;
      maxLength?: number;
      minLength?: number;
    }
  ) {
    const _a = a.copy();
    const _b = b.copy();
    const angle = Math.atan2(_b.y - _a.y, _b.x - _a.x);
    if (options.startOffset) {
      _a.x += options.startOffset * Math.cos(angle);
      _a.y += options.startOffset * Math.sin(angle);
    }
    if (options.endOffset) {
      _b.x += options.endOffset * Math.cos(angle);
      _b.y += options.endOffset * Math.sin(angle);
    }
    const length = _a.lengthTo(_b);
    if (options.maxLength && length > options.maxLength) {
      _b.x = _a.x + options.maxLength * Math.cos(angle);
      _b.y = _a.y + options.maxLength * Math.sin(angle);
    } else if (options.minLength && length < options.minLength) {
      _b.x = _a.x + options.minLength * Math.cos(angle);
      _b.y = _a.y + options.minLength * Math.sin(angle);
    }
    this.drawPath([_a, _b]);
  }
}
