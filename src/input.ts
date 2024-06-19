import { Canvas } from './draw';
import { Vec2 } from './math';
import { GameContext, GameObject } from './objects/gameObject';

export enum MouseButton {
  Left,
  Middle,
  Right,
  BrowserBack,
  BrowserForward,
}

export type MouseButtonEvent = {
  canvasPos: Vec2;
  worldPos: Vec2;
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

  const handleInput = (gameObjects: GameObject[], ctx: GameContext) => {
    mouseButtonsJustPressed.forEach((ev) => {
      mouseButtonsActive.add(ev.button);
      gameObjects.forEach((obj) => {
        if (obj.onMousePress) obj.onMousePress(ev, ctx);
      });
    });
    mouseButtonsJustPressed.clear();
    mouseButtonsJustReleased.forEach((ev) => {
      mouseButtonsActive.delete(ev.button);
      gameObjects.forEach((obj) => {
        if (obj.onMouseRelease) obj.onMouseRelease(ev, ctx);
      });
    });
    mouseButtonsJustReleased.clear();
    keysJustPressed.forEach((key) => {
      keysActive.add(key);
      gameObjects.forEach((obj) => {
        if (obj.onKeyPress) obj.onKeyPress(key, ctx);
      });
    });
    keysJustPressed.clear();
    keysJustReleased.forEach((key) => {
      keysActive.delete(key);
      gameObjects.forEach((obj) => {
        if (obj.onKeyRelease) obj.onKeyRelease(key, ctx);
      });
    });
    keysJustReleased.clear();
  };

  const input = {
    mouse: {
      canvasPos: new Vec2(1_000_000, 1_000_000),
      worldPos: new Vec2(1_000_000, 1_000_000),
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
    const box = canvas.element.getBoundingClientRect()
    return new Vec2(
      (ev.clientX - box.left) / scale,
      (ev.clientY - box.top) / scale
    );
  };

  document.addEventListener('mousedown', (ev) => {
    const canvasPos = eventPosition(ev);
    mouseButtonsJustPressed.add({
      button: ev.button,
      canvasPos: canvasPos,
      worldPos: canvas.camera
        ? canvas.camera.toWorldPosition(input.mouse.canvasPos)
        : canvasPos,
    });
  });
  document.addEventListener('mouseup', (ev) => {
    const canvasPos = eventPosition(ev);
    mouseButtonsJustReleased.add({
      button: ev.button,
      canvasPos: canvasPos,
      worldPos: canvas.camera
        ? canvas.camera.toWorldPosition(input.mouse.canvasPos)
        : canvasPos,
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
  | ' '
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
