import { __canvasElement } from './dom.ts';
import { GameObject } from './gameObject.ts';
import { Globals } from './globals.ts';
import { Vec2 } from './math.ts';

export enum MouseButton {
  Left,
  Middle,
  Right,
  BrowserBack,
  BrowserForward,
}

export type MouseButtonEvent = {
  pos: Vec2;
  button: MouseButton;
};

const keysJustPressed = new Set<KeyboardKey>();
const keysJustReleased = new Set<KeyboardKey>();
const keysActive = new Set<KeyboardKey>();
const mouseButtonsJustPressed = new Set<MouseButtonEvent>();
const mouseButtonsJustReleased = new Set<MouseButtonEvent>();
const mouseButtonsActive = new Set<MouseButton>();

export const Input = {
  mouse: {
    pos: new Vec2(0, 0),
    button: (e: KeyboardKey) => {
      return keysActive.has(e);
    },
  },
  key: (e: KeyboardKey) => {
    return keysActive.has(e);
  },
};

const eventPosition = (ev: MouseEvent) => {
  const scale = Globals.game?.__options.scale ?? 1;
  return new Vec2(
    (ev.pageX - __canvasElement.offsetLeft) / scale,
    (ev.pageY - __canvasElement.offsetTop) / scale
  );
};

document.addEventListener('mousedown', (ev) => {
  mouseButtonsJustPressed.add({ button: ev.button, pos: eventPosition(ev) });
});
document.addEventListener('mouseup', (ev) => {
  mouseButtonsJustReleased.add({ button: ev.button, pos: eventPosition(ev) });
});
document.addEventListener('keydown', (ev) => {
  keysJustPressed.add(ev.key as KeyboardKey);
});
document.addEventListener('keyup', (ev) => {
  keysJustReleased.add(ev.key as KeyboardKey);
});

const preventDefault = (event: MouseEvent) => event.preventDefault();
document.addEventListener('mousemove', (ev) => {
  const pos = eventPosition(ev);
  Input.mouse.pos.x = pos.x;
  Input.mouse.pos.y = pos.y;
  const scale = Globals.game?.__options.scale ?? 1;
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
  mouseButtonsJustPressed.forEach((ev) => {
    mouseButtonsActive.add(ev.button);
    gameObjects.forEach((obj) => {
      if (obj.onMousePress) obj.onMousePress(ev);
    });
  });
  mouseButtonsJustPressed.clear();
  mouseButtonsJustReleased.forEach((ev) => {
    mouseButtonsActive.delete(ev.button);
    gameObjects.forEach((obj) => {
      if (obj.onMouseRelease) obj.onMouseRelease(ev);
    });
  });
  mouseButtonsJustReleased.clear();
  keysJustPressed.forEach((key) => {
    keysActive.add(key);
    gameObjects.forEach((obj) => {
      if (obj.onKeyPress) obj.onKeyPress(key);
    });
  });
  keysJustPressed.clear();
  keysJustReleased.forEach((key) => {
    keysActive.delete(key);
    gameObjects.forEach((obj) => {
      if (obj.onKeyRelease) obj.onKeyRelease(key);
    });
  });
  keysJustReleased.clear();
};

export type KeyboardKey =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'space'
  | 'enter'
  | 'alt'
  | 'ctrl'
  | 'backspace'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0';
