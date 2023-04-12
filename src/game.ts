import { removeFromArray } from './arrays';
import { initializeGameInput, Input } from './input';
import { DrawInfo, GameObject, StepInfo } from './objects/gameObject';
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
  private __gameDiv: HTMLDivElement;
  private __assetsDiv: HTMLDivElement;
  private __options: GameOptions = defaultOptions;
  private __gameObjects: GameObject[] = [];
  private __canvas: Canvas;
  private __t = 0;
  private __input: Input;
  beforeDraw?: (info: DrawInfo) => void;
  afterDraw?: (info: DrawInfo) => void;
  beforeStep?: (info: StepInfo) => void;
  afterStep?: (info: StepInfo) => void;
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
    this.__input = initializeGameInput(this.__canvas);
  }

  setOptions(options: Partial<GameOptions>) {
    this.__options = {
      ...this.__options,
      ...options,
    };

    const canvasSize = this.getCanvasSize().multiply(this.__options.scale);
    this.__canvas.setOptions({
      width: canvasSize.x,
      height: canvasSize.y,
      scale: this.__options.scale,
    });

    return this;
  }

  get options() {
    return { ...this.__options };
  }

  get canvas() {
    return this.__canvas;
  }

  getCanvasSize() {
    return new Vec2(this.__options.width, this.__options.height);
  }

  getGameObjects(filter?: (o: GameObject) => boolean) {
    return filter ? this.__gameObjects.filter(filter) : [...this.__gameObjects];
  }

  __addObject(object: GameObject) {
    this.__gameObjects.push(object);
  }

  __removeObject(object: GameObject) {
    removeFromArray(this.__gameObjects, object);
  }

  __addAssetElement(element: HTMLElement) {
    this.__assetsDiv?.appendChild(element);
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

  private __maybeSort() {
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

  private __step() {
    this.__input.mouse.worldPos = this.__input.mouse.worldPos.plus(
      this.__canvas.__getCameraPositionDelta()
    );
    this.__maybeSort();
    this.__input.__handleInput(this.__gameObjects);
    this.__canvas.drawClear();
    if (this.beforeDraw)
      this.beforeDraw({
        game: this,
        canvas: this.__canvas,
        input: this.__input,
        t: this.__t,
      });
    this.__gameObjects.forEach((object) => {
      if (object.draw)
        object.draw({
          game: this,
          canvas: this.__canvas,
          input: this.__input,
          t: this.__t,
        });
    });
    if (this.afterDraw)
      this.afterDraw({
        game: this,
        canvas: this.__canvas,
        input: this.__input,
        t: this.__t,
      });
    if (this.beforeStep)
      this.beforeStep({
        game: this,
        input: this.__input,
        dtFactor: Math.round(this.__options.fps / this.currentFps),
      });
    this.__gameObjects.forEach((object) => {
      if (object.step)
        object.step({
          game: this,
          input: this.__input,
          dtFactor: Math.round(this.__options.fps / this.currentFps),
        });
    });
    if (this.afterStep)
      this.afterStep({
        game: this,
        input: this.__input,
        dtFactor: Math.round(this.__options.fps / this.currentFps),
      });
    this.__t++;
  }
}
