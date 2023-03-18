import { canvasElement, ctx } from './dom.ts';
import { ImageAsset } from './images.ts';
import { Vec2 } from './position.ts';

export const drawRect = (x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, w, h);
};

export const drawClear = () => {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
};

export const drawImage = (
  imageAsset: ImageAsset,
  pos: Vec2,
  options = { smoothing: false }
) => {
  if (imageAsset.image) {
    ctx.imageSmoothingEnabled = options.smoothing;
    ctx.drawImage(
      imageAsset.image,
      pos.x,
      pos.y,
      imageAsset.image.width,
      imageAsset.image.height
    );
  }
};

export const drawText = (
  text: string,
  x: number,
  y: number,
  color = 'white',
  size = 20
) => {
  ctx.save();
  ctx.font = `${size}px arial`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  ctx.restore();
};

export const drawArrow = (from: Vec2, to: Vec2, width = 2, color = 'white') => {
  //variables to be used when creating the arrow
  const headlen = 10;
  const fromx = from.x;
  const fromy = from.y;
  const tox = to.x;
  const toy = to.y;
  const angle = Math.atan2(toy - fromy, tox - fromx);

  ctx.save();
  ctx.strokeStyle = color;

  //starting path of the arrow from the start square to the end square
  //and drawing the stroke
  ctx.beginPath();
  ctx.moveTo(fromx, fromy);
  ctx.lineTo(tox, toy);
  ctx.lineWidth = width;
  ctx.stroke();

  //starting a new path from the head of the arrow to one of the sides of
  //the point
  ctx.beginPath();
  ctx.moveTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //path from the side point of the arrow, to the other side point
  ctx.lineTo(
    tox - headlen * Math.cos(angle + Math.PI / 7),
    toy - headlen * Math.sin(angle + Math.PI / 7)
  );

  //path from the side point back to the tip of the arrow, and then
  //again to the opposite side point
  ctx.lineTo(tox, toy);
  ctx.lineTo(
    tox - headlen * Math.cos(angle - Math.PI / 7),
    toy - headlen * Math.sin(angle - Math.PI / 7)
  );

  //draws the paths created above
  ctx.stroke();
  ctx.restore();
};

export const drawOutline = (x: number, y: number, w: number, h: number) => {
  ctx.save();
  ctx.strokeStyle = '#666666';
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
};
