import { Vec2 } from './math'
import { PositionObject } from './objects/positionObject'

export class Camera {
  size: Vec2
  posPrev: Vec2 = new Vec2(0, 0)
  target?: PositionObject

  constructor(size: Vec2) {
    this.size = size
  }

  setTarget(target: PositionObject) {
    this.target = target
    return this
  }

  toWorldPosition(worldPos: Vec2) {
    if (!this.target) {
      return worldPos
    }
    return worldPos.plus(this.target.pos).minus(this.size.half())
  }

  toCanvasPosition(canvasPos: Vec2) {
    if (!this.target) {
      return canvasPos
    }
    return canvasPos.minus(this.target.pos).plus(this.size.half())
  }
}
