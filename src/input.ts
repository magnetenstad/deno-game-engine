import { Canvas } from './draw';
import { GameObject } from './gameObject';
import { Vec2 } from './math';

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

document.addEventListener('keydown', (ev) => {
  keysJustPressed.add(ev.key as KeyboardKey);
});
document.addEventListener('keyup', (ev) => {
  keysJustReleased.add(ev.key as KeyboardKey);
});

export type Input = ReturnType<typeof initializeGameInput>;

export const initializeGameInput = (canvas: Canvas) => {
  const mouseButtonsJustPressed = new Set<MouseButtonEvent>();
  const mouseButtonsJustReleased = new Set<MouseButtonEvent>();
  const mouseButtonsActive = new Set<MouseButton>();

  const handleInput = (gameObjects: GameObject[]) => {
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

  const input = {
    mouse: {
      canvasPos: new Vec2(0, 0),
      worldPos: new Vec2(0, 0),
      button: (button: MouseButton) => {
        return mouseButtonsActive.has(button);
      },
    },
    key: (e: KeyboardKey) => {
      return keysActive.has(e);
    },
    __handleInput: handleInput,
  };

  const eventPosition = (ev: MouseEvent) => {
    const scale = canvas.scale ?? 1;
    return new Vec2(
      (ev.pageX - canvas.element.offsetLeft) / scale,
      (ev.pageY - canvas.element.offsetTop) / scale
    );
  };

  document.addEventListener('mousedown', (ev) => {
    mouseButtonsJustPressed.add({
      button: ev.button,
      pos: eventPosition(ev),
    });
  });
  document.addEventListener('mouseup', (ev) => {
    mouseButtonsJustReleased.add({
      button: ev.button,
      pos: eventPosition(ev),
    });
  });
  const preventDefault = (event: MouseEvent) => event.preventDefault();
  document.addEventListener('mousemove', (ev) => {
    input.mouse.canvasPos = eventPosition(ev);
    input.mouse.worldPos = canvas.camera
      ? canvas.camera.toWorldPosition(input.mouse.canvasPos)
      : input.mouse.canvasPos;

    const scale = canvas.scale ?? 1;
    if (
      input.mouse.canvasPos.isInside(
        new Vec2(0, 0),
        new Vec2(canvas.element.width / scale, canvas.element.height / scale)
      )
    ) {
      document.addEventListener('contextmenu', preventDefault);
    } else {
      document.removeEventListener('contextmenu', preventDefault);
    }
  });

  return input;
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
