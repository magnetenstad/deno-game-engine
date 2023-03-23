import { ImageAsset } from './assets';
import { PositionObject } from './gameObject';
import { Vec2 } from './math';

export type DrawStyle = {
  strokeStyle?: string;
  lineWidth?: number;
  fillStyle?: string;
  font?: string;
  fontSize?: number;
  gui?: boolean;
  imageSmoothingEnabled?: boolean;
};

export class Canvas {
  __parentElement: HTMLElement;
  __canvasElement: HTMLCanvasElement;
  __ctx: CanvasRenderingContext2D;
  __camera?: Camera;

  constructor(__parentDiv: HTMLElement) {
    this.__parentElement = __parentDiv;
    this.__canvasElement = document.createElement('canvas');
    this.__canvasElement.classList.add('gameCanvas');
    this.__parentElement.appendChild(this.__canvasElement);
    this.__ctx = this.__canvasElement.getContext('2d')!;

    if (!this.__ctx) {
      console.error('Could not get context of canvas!');
    }
  }

  setCamera(camera: Camera) {
    this.__camera = camera;
  }

  withStyle(style: DrawStyle, func: () => void) {
    this.__ctx.save();
    if (style.strokeStyle) this.__ctx.strokeStyle = style.strokeStyle;
    if (style.lineWidth !== undefined) this.__ctx.lineWidth = style.lineWidth;
    if (style.fillStyle) this.__ctx.fillStyle = style.fillStyle;
    if (style.font || style.fontSize)
      this.__ctx.font = `${style.fontSize ?? 8}px ${style.font ?? 'arial'}`;
    if (style.imageSmoothingEnabled != undefined)
      this.__ctx.imageSmoothingEnabled = style.imageSmoothingEnabled;
    func();
    this.__ctx.restore();
  }

  withStyleAndPos(style: DrawStyle, func: (pos: Vec2) => void, pos: Vec2) {
    this.withStyle(style, () => {
      if (this.__camera && !style.gui) {
        func(this.__camera.toCanvasPosition(pos));
      } else {
        func(pos);
      }
    });
  }

  withStyleAndPositions(
    style: DrawStyle,
    func: (positions: Vec2[]) => void,
    positions: Vec2[]
  ) {
    this.withStyle(style, () => {
      if (this.__camera && !style.gui) {
        func(positions.map((pos) => this.__camera!.toCanvasPosition(pos)));
      } else {
        func(positions);
      }
    });
  }

  drawRect(pos: Vec2, size: Vec2, style?: DrawStyle) {
    const _style = Object.assign({ fillStyle: 'white' }, style);
    this.withStyleAndPos(
      _style,
      (pos: Vec2) => {
        if (_style.fillStyle) this.__ctx.fillRect(pos.x, pos.y, size.x, size.y);
        if (_style.strokeStyle)
          this.__ctx.strokeRect(pos.x, pos.y, size.x, size.y);
      },
      pos
    );
  }

  drawClear() {
    this.__ctx.clearRect(
      0,
      0,
      this.__canvasElement.width,
      this.__canvasElement.height
    );
  }

  drawImage = (imageAsset: ImageAsset, pos: Vec2, style?: DrawStyle) => {
    const _style = Object.assign({ imageSmoothingEnabled: false }, style);
    this.withStyleAndPos(
      _style,
      (pos: Vec2) => {
        if (imageAsset.__image) {
          this.__ctx.drawImage(
            imageAsset.__image,
            pos.x,
            pos.y,
            imageAsset.__image.width,
            imageAsset.__image.height
          );
        }
      },
      pos
    );
  };

  drawPath(points: Vec2[], style?: DrawStyle) {
    const _style = Object.assign(
      {
        strokeStyle: 'white',
        lineWidth: 1,
      },
      style
    );
    this.withStyleAndPositions(
      _style,
      (points: Vec2[]) => {
        this.__ctx.beginPath();
        this.__ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
          this.__ctx.lineTo(points[i].x, points[i].y);
        }
        this.__ctx.stroke();
      },
      points
    );
  }

  drawLine(
    a: Vec2,
    b: Vec2,
    options: {
      startOffset?: number;
      endOffset?: number;
      maxLength?: number;
      minLength?: number;
    },
    style?: DrawStyle
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
    this.drawPath([_a, _b], style);
  }

  drawText(text: string, pos: Vec2, style?: DrawStyle) {
    const _style = Object.assign(
      { fillStyle: 'white', font: 'arial', fontSize: 8 },
      style
    );
    this.withStyleAndPos(
      _style,
      (pos: Vec2) => {
        this.__ctx.fillText(text, pos.x, pos.y + (_style.fontSize ?? 0));
      },
      pos
    );
  }

  drawCircle(radius: number, pos: Vec2, style?: DrawStyle) {
    const _style = Object.assign({ fillStyle: 'white' }, style);
    this.withStyleAndPos(
      _style,
      (pos: Vec2) => {
        this.__ctx.beginPath();
        this.__ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        this.__ctx.fill();
        this.__ctx.stroke();
      },
      pos
    );
  }
}

export class Camera {
  size: Vec2;
  posPrev: Vec2 = new Vec2(0, 0);
  target?: PositionObject;

  constructor(size: Vec2) {
    this.size = size;
  }

  setTarget(target: PositionObject) {
    this.target = target;
    return this;
  }

  toWorldPosition(worldPos: Vec2) {
    if (!this.target) {
      return worldPos;
    }
    return worldPos.plus(this.target.pos).minus(this.size.half());
  }

  toCanvasPosition(canvasPos: Vec2) {
    if (!this.target) {
      return canvasPos;
    }
    return canvasPos.minus(this.target.pos).plus(this.size.half());
  }
}
