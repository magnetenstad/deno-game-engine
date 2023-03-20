import { removeFromArray } from './arrays.ts';
import { __canvasElement, __ctx } from './dom.ts';
import { drawClear } from './draw.ts';
import { handleInput } from './input.ts';
import { GameObject } from './gameObject.ts';
import { Globals } from './globals.ts';

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
  t = 0;

  constructor(isGlobalGame = true) {
    this.setOptions(defaultOptions);
    if (isGlobalGame) {
      Globals.game = this;
    }
  }

  setOptions(options: Partial<GameOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };

    __canvasElement.width = this.options.width * this.options.scale;
    __canvasElement.height = this.options.height * this.options.scale;
    __ctx.scale(this.options.scale, this.options.scale);

    return this;
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
    handleInput(this);
    drawClear();
    this.gameObjects.forEach((object) => object.draw(this.t));
    this.gameObjects.forEach((object) => object.step());
    this.t++;
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
}
