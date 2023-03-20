export class Vec2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(pos: Vec2) {
    return new Vec2(this.x + pos.x, this.y + pos.y);
  }

  multiply(n: number) {
    return new Vec2(this.x * n, this.y * n);
  }

  snap(gridSize: number) {
    return new Vec2(
      Math.round(this.x / gridSize) * gridSize,
      Math.round(this.y / gridSize) * gridSize
    );
  }

  copy() {
    return new Vec2(this.x, this.y);
  }
}

export const centerOfRect = (pos: Vec2, size: Vec2) => {
  return pos.add(size.multiply(0.5));
};
