import { canvas, ctx } from './dom.ts';

export const drawRect = (x: number, y: number, w: number, h: number) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, w, h);
};

export const drawClear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
