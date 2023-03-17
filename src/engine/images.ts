import { assetsDiv } from './dom.ts';

export class ImageAsset {
  path: string;
  image?: HTMLImageElement;

  constructor(path: string) {
    this.path = path;
  }
}

export const loadImages = (
  imageAssets: Record<string, ImageAsset>,
  baseUrl: string
) => {
  Object.values(imageAssets).forEach((imageAsset) => {
    const image = new Image();
    image.src = baseUrl + imageAsset.path;
    image.onload = () => {
      imageAsset.image = image;
    };
    assetsDiv.appendChild(image);
  });
};
