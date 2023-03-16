import { gameObjects } from './gameobject.ts';

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

export const handleInput = () => {
  keysJustPressed.forEach((key) => {
    activeKeys.add(key);
    gameObjects.forEach((obj) => obj.onKeyPress(key));
  });
  keysJustReleased.forEach((key) => {
    activeKeys.delete(key);
    gameObjects.forEach((obj) => obj.onKeyRelease(key));
  });
  keysJustPressed.clear();
  keysJustReleased.clear();
};
