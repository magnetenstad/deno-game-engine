export type Position = {
  x: number;
  y: number;
};

export class GameObject {
  step() {}
  draw(_t: number) {}
  onKeyPress(_ev: string) {}
  onKeyRelease(_ev: string) {}
}

export class PositionObject extends GameObject {
  pos: Position = { x: 0, y: 0 };

  constructor(x: number, y: number) {
    super();
    this.pos.x = x;
    this.pos.y = y;
  }
}
