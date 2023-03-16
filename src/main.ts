import { canvas, ctx } from './dom.ts';
import { drawClear } from './draw.ts';
import { handleInput } from './events.ts';
import { addGameObject, gameObjects } from './gameobject.ts';
import { Player } from './objects/player.ts';
import { RectangleSinObject } from './objects/rectangleObject.ts';

const options = {
  width: 480,
  height: 320,
  scale: 2,
  draw_fps: 60,
  step_fps: 60,
};

canvas.width = options.width * options.scale;
canvas.height = options.height * options.scale;
ctx.scale(options.scale, options.scale);

export let drawStep = 0;

setInterval(() => {
  drawClear();
  gameObjects.forEach((object) => object.draw());
  drawStep++;
}, 1000 / options.draw_fps);

setInterval(() => {
  handleInput();
  gameObjects.forEach((object) => object.step());
}, 1000 / options.step_fps);

addGameObject(new RectangleSinObject(10, 10));
addGameObject(new RectangleSinObject(100, 250));
addGameObject(new Player(100, 250));
