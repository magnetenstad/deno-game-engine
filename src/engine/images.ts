import { __assetsDiv } from './dom.ts';
import { Vec2 } from './math.ts';
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
    const image = new Image();
    image.src = this.__path;
    image.onload = () => {
      this.__image = image;
    };
    __assetsDiv.appendChild(image);
  }

  size() {
    return new Vec2(this.__image?.width ?? 0, this.__image?.height ?? 0);
  }
}
