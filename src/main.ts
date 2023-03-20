import { Game } from './engine/game.ts';
import { ImageAsset } from './engine/images.ts';
import { Player } from './objects/player.ts';
import { RectangleSinObject } from './objects/rectangleObject.ts';

const game = new Game().setOptions({
  width: 480,
  height: 320,
  scale: 2,
  fps: 60,
});

export const Assets = {
  player: new ImageAsset('./player.png'),
} as const;

new RectangleSinObject(10, 10, 50, 50);
new RectangleSinObject(100, 250, 50, 50);
new Player(100, 250);

game.play();
