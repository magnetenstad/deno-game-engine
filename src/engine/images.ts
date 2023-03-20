import { assetsDiv } from './dom.ts';

export class Asset {}

export class ImageAsset extends Asset {
  path: string;
  image?: HTMLImageElement;

  constructor(path: string) {
    super();
    this.path = path;
  }
}

export const loadImages = (assets: Record<string, Asset>, baseUrl: string) => {
  Object.values(assets).forEach((asset) => {
    if (!(asset instanceof ImageAsset)) return;
    const image = new Image();
    image.src = baseUrl + asset.path;
    image.onload = () => {
      asset.image = image;
    };
    assetsDiv.appendChild(image);
  });
};
