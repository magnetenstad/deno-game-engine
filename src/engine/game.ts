import { removeFromArray } from './arrays.ts';
import { canvasElement, ctx } from './dom.ts';
import { drawClear } from './draw.ts';
import { handleInput } from './events.ts';
import { GameObject } from './gameObject.ts';
import { ImageAsset, loadImages } from './images.ts';

const defaultOptions = {
  width: 480,
  height: 320,
  scale: 2,
  draw_fps: 60,
  step_fps: 60,
} as const;

type GameOptions = typeof defaultOptions;

export class Game {
  options: GameOptions = defaultOptions;
  drawInterval?: number = undefined;
  stepInterval?: number = undefined;
  drawStep = 0;
  gameObjects: GameObject[] = [];
  isPlaying = false;
  imageAssets?: Record<string, ImageAsset>;

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

    if (this.isPlaying) {
      this.resetIntervals();
    }
  }

  resetIntervals() {
    clearInterval(this.drawInterval);
    this.drawInterval = setInterval(() => {
      drawClear();
      this.gameObjects.forEach((object) => object.draw(this.drawStep));
      this.drawStep++;
    }, 1000 / defaultOptions.draw_fps);

    clearInterval(this.stepInterval);
    this.stepInterval = setInterval(() => {
      handleInput(this);
      this.gameObjects.forEach((object) => object.step());
    }, 1000 / defaultOptions.step_fps);
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
    this.isPlaying = true;
    if (!this.imageAssets) {
      console.warn(
        'Game has no image assets! Use game.setImageAssets() before calling game.play()'
      );
    }
    this.resetIntervals();
  }
}
