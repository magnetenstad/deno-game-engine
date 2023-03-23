import { Game } from './game';
import { Vec2 } from './math';

const assets = new Map<string, unknown>();

export class Asset {}

export class ImageAsset extends Asset {
  __path: string;
  __image?: HTMLImageElement;

  constructor(path: string, game?: Game) {
    super();
    this.__path = path;
    if (game) {
      this.__load(game);
    }
  }

  __load(game: Game) {
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
    game.__assetsDiv?.appendChild(image);
  }

  size() {
    return new Vec2(this.__image?.width ?? 0, this.__image?.height ?? 0);
  }
}
