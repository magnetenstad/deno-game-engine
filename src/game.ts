import { removeFromArray } from './arrays';
import { initializeGameInput, Input } from './input';
import { GameObject } from './gameObject';
import { Canvas } from './draw';
import { Vec2 } from './math';

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
  __gameDiv: HTMLDivElement;
  __assetsDiv: HTMLDivElement;
  __options: GameOptions = defaultOptions;
  __gameObjects: GameObject[] = [];
  __canvas: Canvas;
  __t = 0;
  __input: Input;
  currentFps = 0;

  constructor(gameDiv: Element | null) {
    if (!gameDiv) {
      throw new Error('Element passed to Game() is null!');
    }
    if (!(gameDiv instanceof HTMLDivElement)) {
      throw new Error('Element passed to Game() is not an HTMLDivElement!');
    }
    this.__gameDiv = gameDiv;
    this.__canvas = new Canvas(this.__gameDiv);
    this.__assetsDiv = document.createElement('div');
    this.__assetsDiv.hidden = true;
    this.__gameDiv.appendChild(this.__assetsDiv);
    this.setOptions(defaultOptions);
    this.__input = initializeGameInput(this);
  }

  setOptions(options: Partial<GameOptions>) {
    this.__options = {
      ...this.__options,
      ...options,
    };

    const canvasSize = this.getCanvasSize().multiply(this.__options.scale);
    this.__canvas.__canvasElement.width = canvasSize.x;
    this.__canvas.__canvasElement.height = canvasSize.y;
    this.__canvas.__ctx.scale(this.__options.scale, this.__options.scale);

    return this;
  }

  getCanvasSize() {
    return new Vec2(this.__options.width, this.__options.height);
  }

  __addObject(object: GameObject) {
    this.__gameObjects.push(object);
  }

  __removeObject(object: GameObject) {
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
    this.__input.__handleInput(this.__gameObjects);
    this.__canvas.drawClear();
    this.__gameObjects.forEach((object) => {
      if (object.draw)
        object.draw({
          game: this,
          canvas: this.__canvas,
          input: this.__input,
          t: this.__t,
        });
    });
    this.__gameObjects.forEach((object) => {
      if (object.step)
        object.step({
          game: this,
          input: this.__input,
          dtFactor: Math.round(this.__options.fps / this.currentFps),
        });
    });
    this.__t++;
  }
}
