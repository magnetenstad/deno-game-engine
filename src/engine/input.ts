import { __canvasElement } from './dom.ts';
import { GameObject } from './gameObject.ts';
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

const preventDefault = (event: MouseEvent) => event.preventDefault();
document.addEventListener('keydown', (ev) => {
  keysJustPressed.add(ev.key);
});
document.addEventListener('keyup', (ev) => {
  keysJustReleased.add(ev.key);
});
document.addEventListener('mousemove', (ev) => {
  const scale = Globals.game?.options.scale ?? 1;
  Input.mouse.pos.x = (ev.pageX - __canvasElement.offsetLeft) / scale;
  Input.mouse.pos.y = (ev.pageY - __canvasElement.offsetTop) / scale;
  if (
    Input.mouse.pos.isInside(
      new Vec2(0, 0),
      new Vec2(__canvasElement.width / scale, __canvasElement.height / scale)
    )
  ) {
    document.addEventListener('contextmenu', preventDefault);
  } else {
    document.removeEventListener('contextmenu', preventDefault);
  }
});

export const handleInput = (gameObjects: GameObject[]) => {
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
