import { removeFromArray } from './arrays';
import { initializeGameInput, Input } from './input';
import { DrawContext, GameObject, GameContext } from './objects/gameObject';
import { Canvas } from './draw';
import { Vec2 } from './math';
import { AudioStore } from './audio';

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
  private __gameInstances: GameObject[] = [];
  private __canvas: Canvas;
  private __t = 0;
  private __input: Input;
  private __currentFps = 0;
  private __audioStore = new AudioStore();
  beforeDraw?: (ctx: DrawContext) => void;
  afterDraw?: (ctx: DrawContext) => void;
  beforeStep?: (ctx: GameContext) => void;
  afterStep?: (ctx: GameContext) => void;

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

  get currentFps() {
    return this.__currentFps;
  }

  getCanvasSize() {
    return new Vec2(this.__options.width, this.__options.height);
  }

  getInstances(filter?: (o: GameObject) => boolean) {
    return filter
      ? this.__gameInstances.filter(filter)
      : [...this.__gameInstances];
  }

  getInstancesOfClass<T extends GameObject>(
    typeT: new (...params: any[]) => T
  ): T[] {
    return this.getInstances((obj) => obj instanceof typeT) as T[];
  }

  __addObject(object: GameObject) {
    this.__gameInstances.push(object);
  }

  __removeObject(object: GameObject) {
    removeFromArray(this.__gameInstances, object);
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
        this.__currentFps = 1000 / (time - timePrev);
        timePrev = time;
        this.__step();
      }
    };

    gameLoop(0);
  }

  private __maybeSort() {
    if (!this.__options.zSort) return;
    const shouldSort = this.__gameInstances.some((obj) => obj.__changed);
    if (shouldSort) {
      this.__gameInstances.sort((a, b) => a.__zIndex - b.__zIndex);
      this.__gameInstances.forEach((o) => (o.__changed = false));
    }
  }

  getGameContext(): GameContext {
    return {
      game: this,
      input: this.__input,
      audio: this.__audioStore,
      dtFactor: Math.round(this.__options.fps / this.currentFps),
    };
  }

  private __step() {
    // Info objects
    const drawCtx = {
      game: this,
      canvas: this.__canvas,
      input: this.__input,
      t: this.__t,
    };
    const gameCtx = this.getGameContext();

    // Camera, zIndex
    this.__input.mouse.worldPos = this.__input.mouse.worldPos.plus(
      this.__canvas.__getCameraPositionDelta()
    );
    this.__maybeSort();

    // Input
    this.__input.__handleInput(this.__gameInstances, gameCtx);

    // Draw events
    this.__canvas.drawClear();

    this.beforeDraw?.(drawCtx);
    this.__gameInstances.forEach((object) => {
      object.draw?.(drawCtx);
    });
    this.afterDraw?.(drawCtx);

    // Step events
    this.beforeStep?.(gameCtx);
    this.__gameInstances.forEach((object) => {
      object.step?.(gameCtx);
    });
    this.afterStep?.(gameCtx);

    // Timestep
    this.__t++;
  }
}
