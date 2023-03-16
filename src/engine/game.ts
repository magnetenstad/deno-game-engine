import { removeFromArray } from './arrays.ts';
import { canvasElement, ctx } from './dom.ts';
import { drawClear } from './draw.ts';
import { handleInput } from './events.ts';
import { GameObject } from './gameObject.ts';
import { ImageAsset, loadImages } from './images.ts';

const defaultOptions = {
  width: 480 as number,
  height: 320 as number,
  scale: 2 as number,
  fps: 60 as number,
  zSort: true as boolean,
} as const;

type GameOptions = typeof defaultOptions;

export class Game {
  options: GameOptions = defaultOptions;
  gameObjects: GameObject[] = [];
  imageAssets?: Record<string, ImageAsset>;
  t = 0;

  constructor() {
    this.setOptions(defaultOptions);
  }

  setOptions(options: Partial<GameOptions>) {
    this.options = {
      ...this.options,
      ...options,
    };

    canvasElement.width = this.options.width * this.options.scale;
    canvasElement.height = this.options.height * this.options.scale;
    ctx.scale(this.options.scale, this.options.scale);
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

  addGameObject(object: GameObject) {
    this.gameObjects.push(object);
  }

  removeGameObject(object: GameObject) {
    removeFromArray(this.gameObjects, object);
  }

  setImageAssets(imageAssets: Record<string, ImageAsset>) {
    this.imageAssets = imageAssets;
    loadImages(this.imageAssets);
  }

  play() {
    if (!this.imageAssets) {
      console.warn(
        'Game has no image assets! Use game.setImageAssets() before calling game.play()'
      );
    }
    const interval = 1000 / this.options.fps;
    let timePrev = 0;
    const gameLoop = (time: number) => {
      requestAnimationFrame(gameLoop);
      this.__step();

      const delta = time - timePrev;

      if (delta > interval) {
        timePrev = time - (delta % interval);
        this.__step();
      }
    };
    gameLoop(0);
  }
}
