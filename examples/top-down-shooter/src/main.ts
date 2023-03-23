import { Game } from 'web-game-engine';
import { Player } from './player';
import { Text } from './text';

const gameDiv = document.querySelector('#game');

const game = new Game(gameDiv).setOptions({
  width: 480,
  height: 320,
  scale: 2,
  fps: 60,
});

const player = new Player(100, 250).activate(game);
new Text(() => `Player: ${JSON.stringify(player.pos)}`, 0, 0).activate(game);
new Text(() => `Objects: ${game.__gameObjects.length}`, 0, 16).activate(game);
new Text(() => `FPSd: ${game.currentFps.toFixed(1)}`, 0, 32).activate(game);

game.play();
