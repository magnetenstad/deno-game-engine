import { assetsDiv } from './dom.ts';

export class ImageAsset {
  id: string;
  image?: HTMLImageElement;

  constructor(path: string) {
    this.id = path;
  }
}

export const loadImages = (imageAssets: Record<string, ImageAsset>) => {
  Object.values(imageAssets).forEach((imageAsset) => {
    const image = new Image();
    image.src = `/${imageAsset.id}`;
    image.onload = () => {
      imageAsset.image = image;
    };
    assetsDiv.appendChild(image);
  });
};
