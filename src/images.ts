import { assetsDiv } from './dom.ts';

export class ImageAsset {
  id: string;
  image?: HTMLImageElement;

  constructor(path: string) {
    this.id = path;
  }
}

export const ImageAssets = {
  player: new ImageAsset('img_player'),
};

Object.values(ImageAssets).forEach((imageAsset) => {
  const image = assetsDiv.querySelector(
    `#${imageAsset.id}`
  ) as HTMLImageElement;
  if (!image) {
    console.error(`Could not find #${imageAsset.id}!`);
    return;
  }
  imageAsset.image = image;
});
