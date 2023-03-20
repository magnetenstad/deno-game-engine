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

  center(offset = new Vec2(0, 0)) {
    return offset.add(this.multiply(0.5));
  }

  snap(gridSize: number) {
    return new Vec2(
      Math.round(this.x / gridSize) * gridSize,
      Math.round(this.y / gridSize) * gridSize
    );
  }

  isInside(pos: Vec2, size: Vec2) {
    return (
      pos.x <= this.x &&
      this.x <= pos.x + size.x &&
      pos.y <= this.y &&
      this.y <= pos.y + size.y
    );
  }

  copy() {
    return new Vec2(this.x, this.y);
  }
}
