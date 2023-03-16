import { Game } from './engine/game.ts';
import { ImageAsset } from './engine/images.ts';
import { Player } from './objects/player.ts';
import { RectangleSinObject } from './objects/rectangleObject.ts';

const game = new Game();

export const ImageAssets = {
  player: new ImageAsset('player.png'),
};

game.setOptions({
  width: 480,
  height: 320,
  scale: 2,
  draw_fps: 60,
  step_fps: 60,
});

game.setImageAssets(ImageAssets);

game.addGameObject(new RectangleSinObject(10, 10));
game.addGameObject(new RectangleSinObject(100, 250));
game.addGameObject(new Player(100, 250));

game.play();
