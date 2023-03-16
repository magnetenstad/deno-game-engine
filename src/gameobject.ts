import { removeFromArray } from './arrays.ts';

export type Position = {
  x: number;
  y: number;
};

export class GameObject {
  onKeyPress(_ev: string) {}
  onKeyRelease(_ev: string) {}
  draw() {}
  step() {}
}

export class PositionObject extends GameObject {
  pos: Position = { x: 0, y: 0 };

  constructor(x: number, y: number) {
    super();
    this.pos.x = x;
    this.pos.y = y;
  }
}

export const gameObjects: GameObject[] = [];

export function addGameObject(object: GameObject) {
  gameObjects.push(object);
}

export function removeGameObject(object: GameObject) {
  removeFromArray(gameObjects, object);
}
