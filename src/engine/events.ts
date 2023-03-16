import { Game } from './game.ts';

const keysJustPressed = new Set<string>();
const keysJustReleased = new Set<string>();
const activeKeys = new Set<string>();

export const Input = {
  key: (e: string) => {
    return activeKeys.has(e);
  },
};

document.addEventListener('keydown', (ev) => {
  keysJustPressed.add(ev.key);
});
document.addEventListener('keyup', (ev) => {
  keysJustReleased.add(ev.key);
});

export const handleInput = (game: Game) => {
  keysJustPressed.forEach((key) => {
    activeKeys.add(key);
    game.gameObjects.forEach((obj) => obj.onKeyPress(key));
  });
  keysJustReleased.forEach((key) => {
    activeKeys.delete(key);
    game.gameObjects.forEach((obj) => obj.onKeyRelease(key));
  });
  keysJustPressed.clear();
  keysJustReleased.clear();
};
