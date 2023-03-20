import { __assetsDiv } from './dom.ts';
import { Vec2 } from './math.ts';

const assets = new Map<string, unknown>();

export class Asset {}

export class ImageAsset extends Asset {
  __path: string;
  __image?: HTMLImageElement;

  constructor(path: string) {
    super();
    this.__path = path;
    this.__load();
  }

  __load() {
    const memo = assets.get(this.__path);
    if (memo instanceof HTMLImageElement) {
      this.__image = memo;
    }
    const image = new Image();
    image.src = this.__path;
    image.onload = () => {
      assets.set(this.__path, image);
      this.__image = image;
    };
    __assetsDiv.appendChild(image);
  }

  size() {
    return new Vec2(this.__image?.width ?? 0, this.__image?.height ?? 0);
  }
}
