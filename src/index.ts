import { ImageAsset } from './assets'
import { Camera } from './camera'
import { DrawStyle } from './draw'
import { Game } from './game'
import { MouseButton, MouseButtonEvent } from './input'
import { Vec2, clamp, randomFloat, randomInt } from './math'
import { ExamplePlayer } from './objects/examples/examplePlayer'
import { DrawContext, GameContext, GameObject } from './objects/gameObject'
import { ImageObject } from './objects/imageObject'
import { PositionObject } from './objects/positionObject'
import { TextObject } from './objects/textObject'

export {
  Camera,
  ExamplePlayer,
  Game,
  GameObject,
  ImageAsset,
  ImageObject,
  MouseButton,
  PositionObject,
  TextObject,
  Vec2,
  clamp,
  randomFloat,
  randomInt,
}

export type { DrawContext, DrawStyle, GameContext, MouseButtonEvent }
