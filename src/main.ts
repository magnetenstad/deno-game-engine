import { Game } from './engine/game.ts';
import { Player } from './objects/player.ts';
import { RectangleSinObject } from './objects/rectangleObject.ts';
import { TextObject } from './objects/textObject.ts';

export const game = new Game().setOptions({
  width: 480,
  height: 320,
  scale: 2,
  fps: 60,
});

new RectangleSinObject(10, 10, 50, 50);
new RectangleSinObject(100, 250, 50, 50);
export const player = new Player(100, 250);
new TextObject(() => JSON.stringify(player.pos), 0, 0);
new TextObject(() => JSON.stringify(game.__gameObjects.length), 0, 16);

game.play();
