import { Game } from './engine/game.ts';
import { Player } from './objects/player.ts';
import { Text } from './objects/text.ts';

const gameDiv = document.querySelector('#game');

export const game = new Game(gameDiv).setOptions({
  width: 480,
  height: 320,
  scale: 2,
  fps: 60,
});

export const player = new Player(100, 250).activate(game);
new Text(() => `Player: ${JSON.stringify(player.pos)}`, 0, 0).activate(game);
new Text(() => `Objects: ${game.__gameObjects.length}`, 0, 16).activate(game);
new Text(() => `FPS: ${game.currentFps.toFixed(1)}`, 0, 32).activate(game);

game.play();
