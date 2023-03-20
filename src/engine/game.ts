import { removeFromArray } from './arrays.ts';
import { __canvasElement } from './dom.ts';
import { handleInput } from './input.ts';
import { GameObject } from './gameObject.ts';
import { Globals } from './globals.ts';
import { Canvas } from './draw.ts';

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
  options: GameOptions = defaultOptions;
  gameObjects: GameObject[] = [];
  canvas: Canvas;
  t = 0;

  constructor(isGlobalGame = true) {
    if (isGlobalGame) {
      Globals.game = this;
    }
    this.canvas = new Canvas(__canvasElement);
    this.setOptions(defaultOptions);
  }

  setOptions(options: Partial<GameOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };

    __canvasElement.width = this.options.width * this.options.scale;
    __canvasElement.height = this.options.height * this.options.scale;
    this.canvas.__ctx.scale(this.options.scale, this.options.scale);

    return this;
  }

  addObject(object: GameObject) {
    this.gameObjects.push(object);
  }

  removeObject(object: GameObject) {
    removeFromArray(this.gameObjects, object);
  }

  play() {
    let timePrev = 0;

    const gameLoop = (time: number) => {
      requestAnimationFrame(gameLoop);
      const delta = time - timePrev;
      const interval = 1000 / this.options.fps;

      if (delta > interval) {
        timePrev = time - (delta % interval);
        this.__step();
      }
    };

    gameLoop(0);
  }
  __maybeSort() {
    if (!this.options.zSort) return;
    let shouldSort = false;
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i].__changed) {
        shouldSort = true;
        break;
      }
    }
    if (shouldSort) {
      this.gameObjects.sort((a, b) => a.__zIndex - b.__zIndex);
      this.gameObjects.forEach((o) => (o.__changed = false));
    }
  }

  __step() {
    this.__maybeSort();
    handleInput(this.gameObjects);
    this.canvas.drawClear();
    this.gameObjects.forEach((object) => object.draw(this.canvas, this.t));
    this.gameObjects.forEach((object) => object.step());
    this.t++;
  }
}
