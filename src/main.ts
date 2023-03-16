import { Game } from './engine/game.ts';
import { Player } from './objects/player.ts';
import { RectangleSinObject } from './objects/rectangleObject.ts';

const game = new Game();

game.setOptions({
  width: 480,
  height: 320,
  scale: 2,
  draw_fps: 60,
  step_fps: 60,
});

game.addGameObject(new RectangleSinObject(10, 10));
game.addGameObject(new RectangleSinObject(100, 250));
game.addGameObject(new Player(100, 250));

game.play();
