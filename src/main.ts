import { canvas, ctx } from './dom.ts';
import { drawClear, drawRect } from './draw.ts';

const options = {
  width: 480,
  height: 320,
  scale: 2,
  fps: 60,
};

canvas.width = options.width * options.scale;
canvas.height = options.height * options.scale;
ctx.scale(options.scale, options.scale);

let drawStep = 0;

function draw() {
  drawClear();
  drawRect(Math.sin(drawStep / 10) * 100, 10, 100, 100);
  drawStep++;
}

setInterval(() => {
  draw();
}, 1000 / options.fps);
