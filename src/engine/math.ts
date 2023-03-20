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

  half() {
    return this.multiply(0.5);
  }

  snap(gridSize: number) {
    return new Vec2(
      Math.round(this.x / gridSize) * gridSize,
      Math.round(this.y / gridSize) * gridSize
    );
  }

  lengthTo(pos: Vec2) {
    return Math.sqrt((this.x - pos.x) ** 2 + (this.y - pos.y) ** 2);
  }

  isInside(pos: Vec2, size: Vec2) {
    return (
      pos.x <= this.x &&
      this.x <= pos.x + size.x &&
      pos.y <= this.y &&
      this.y <= pos.y + size.y
    );
  }

  moveTowards(pos: Vec2, length: number) {
    return this.add(this.direction(pos).multiply(length));
  }

  direction(pos: Vec2) {
    if (pos.y === this.y && pos.x === this.x) return new Vec2(0, 0);
    const angle = Math.atan2(pos.y - this.y, pos.x - this.x);
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  round() {
    return new Vec2(Math.round(this.x), Math.round(this.y));
  }

  copy() {
    return new Vec2(this.x, this.y);
  }
}
