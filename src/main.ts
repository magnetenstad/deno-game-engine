import { Game } from './engine/game.ts';
import { Player } from './objects/player.ts';
import { Text } from './objects/text.ts';

export const game = new Game().setOptions({
  width: 480,
  height: 320,
  scale: 2,
  fps: 60,
});

export const player = new Player(100, 250);
new Text(() => `Player: ${JSON.stringify(player.pos)}`, 0, 0);
new Text(() => `Objects: ${game.__gameObjects.length}`, 0, 16);
new Text(() => `FPS: ${game.currentFps.toFixed(1)}`, 0, 32);

game.play();
