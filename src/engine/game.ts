import { removeFromArray } from './arrays.ts';
import { __canvasElement } from './dom.ts';
import { handleInput } from './input.ts';
import { GameObject } from './gameObject.ts';
import { Globals } from './globals.ts';
import { Canvas } from './draw.ts';
import { Vec2 } from './math.ts';

const defaultOptions = {
  width: 480 as number,
  height: 320 as number,
  scale: 2 as number,
  fps: 60 as number,
  zSort: true as boolean,
  baseUrl: './' as string,
} as const;

type GameOptions = typeof defaultOptions;

export class Game {
  __options: GameOptions = defaultOptions;
  __gameObjects: GameObject[] = [];
  __canvas: Canvas;
  __t = 0;
  currentFps = 0;

  constructor(isGlobalGame = true) {
    if (isGlobalGame) {
      Globals.game = this;
    }
    this.__canvas = new Canvas(__canvasElement);
    this.setOptions(defaultOptions);
  }

  setOptions(options: Partial<GameOptions>) {
    this.__options = {
      ...this.__options,
      ...options,
    };

    const canvasSize = this.getCanvasSize().multiply(this.__options.scale);
    __canvasElement.width = canvasSize.x;
    __canvasElement.height = canvasSize.y;
    this.__canvas.__ctx.scale(this.__options.scale, this.__options.scale);

    return this;
  }

  getCanvasSize() {
    return new Vec2(this.__options.width, this.__options.height);
  }

  addObject(object: GameObject) {
    this.__gameObjects.push(object);
  }

  removeObject(object: GameObject) {
    removeFromArray(this.__gameObjects, object);
  }

  play() {
    let timePrevMod = 0;
    let timePrev = 0;

    const gameLoop = (time: number) => {
      requestAnimationFrame(gameLoop);
      const delta = time - timePrevMod;
      const interval = 1000 / this.__options.fps;
      if (delta >= interval) {
        timePrevMod = time - (delta % interval);
        this.currentFps = 1000 / (time - timePrev);
        timePrev = time;
        this.__step();
      }
    };

    gameLoop(0);
  }
  __maybeSort() {
    if (!this.__options.zSort) return;
    let shouldSort = false;
    for (let i = 0; i < this.__gameObjects.length; i++) {
      if (this.__gameObjects[i].__changed) {
        shouldSort = true;
        break;
      }
    }
    if (shouldSort) {
      this.__gameObjects.sort((a, b) => a.__zIndex - b.__zIndex);
      this.__gameObjects.forEach((o) => (o.__changed = false));
    }
  }

  __step() {
    this.__maybeSort();
    handleInput(this.__gameObjects);
    this.__canvas.drawClear();
    this.__gameObjects.forEach((object) => {
      if (object.draw) object.draw(this.__canvas, this.__t);
    });
    this.__gameObjects.forEach((object) => {
      if (object.step)
        object.step(Math.round(this.__options.fps / this.currentFps));
    });
    this.__t++;
  }
}
