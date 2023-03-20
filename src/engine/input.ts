import { canvasElement } from './dom.ts';
import { Game } from './game.ts';
import { Globals } from './globals.ts';
import { Vec2 } from './math.ts';

const keysJustPressed = new Set<string>();
const keysJustReleased = new Set<string>();
const activeKeys = new Set<string>();

export const Input = {
  mouse: {
    pos: new Vec2(0, 0),
  },
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
document.addEventListener('mousemove', (ev) => {
  const scale = Globals.game?.options.scale ?? 1;
  Input.mouse.pos.x = (ev.pageX - canvasElement.offsetLeft) / scale;
  Input.mouse.pos.y = (ev.pageY - canvasElement.offsetTop) / scale;
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
