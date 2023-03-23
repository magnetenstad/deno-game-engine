import { ImageAsset } from './assets.ts';
import { Vec2 } from './math.ts';

export type DrawStyle = {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  font?: string;
  fontSize?: number;
};

export class Canvas {
  __parent: HTMLElement;
  __canvasElement: HTMLCanvasElement;
  __ctx: CanvasRenderingContext2D;

  constructor(parent: HTMLElement) {
    this.__parent = parent;
    this.__canvasElement = document.createElement('canvas');
    this.__canvasElement.classList.add('gameCanvas');
    this.__parent.appendChild(this.__canvasElement);
    this.__ctx = this.__canvasElement.getContext('2d')!;

    if (!this.__ctx) {
      console.error('Could not get context of canvas!');
    }
  }

  withStyle = (style: DrawStyle, func: () => void) => {
    this.__ctx.save();
    if (style.strokeStyle) this.__ctx.strokeStyle = style.strokeStyle;
    if (style.lineWidth !== undefined) this.__ctx.lineWidth = style.lineWidth;
    if (style.fillStyle) this.__ctx.fillStyle = style.fillStyle;
    if (style.font || style.fontSize)
      this.__ctx.font = `${style.fontSize ?? 8}px ${style.font ?? 'arial'}`;
    func();
    this.__ctx.restore();
  };

  drawRect(pos: Vec2, size: Vec2, style: DrawStyle = { fillStyle: 'white' }) {
    this.withStyle(style, () => {
      this.__ctx.fillRect(pos.x, pos.y, size.x, size.y);
    });
  }

  drawClear() {
    this.__ctx.clearRect(
      0,
      0,
      this.__canvasElement.width,
      this.__canvasElement.height
    );
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

  drawText(
    text: string,
    pos: Vec2,
    style: DrawStyle = { fillStyle: 'white', font: 'arial', fontSize: 8 }
  ) {
    this.withStyle(style, () => {
      this.__ctx.fillText(text, pos.x, pos.y + (style.fontSize ?? 0));
    });
  }

  drawCircle(
    radius: number,
    pos: Vec2,
    style: DrawStyle = { fillStyle: 'white' }
  ) {
    this.withStyle(style, () => {
      this.__ctx.beginPath();
      this.__ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
      this.__ctx.fill();
      this.__ctx.stroke();
    });
  }
}
