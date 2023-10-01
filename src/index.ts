import { Game } from './game';
import { GameObject, DrawContext, GameContext } from './objects/gameObject';
import { Vec2, clamp, randomFloat, randomInt } from './math';
import { MouseButton } from './input';
import { DrawStyle } from './draw';
import { Camera } from './camera';
import { PositionObject } from './objects/positionObject';
import { ImageObject } from './objects/imageObject';
import { TextObject } from './objects/textObject';
import { ExamplePlayer } from './objects/examples/examplePlayer';
import { MouseButtonEvent } from './input';
import { ImageAsset } from './assets';

export {
  Game,
  GameObject,
  PositionObject,
  ImageObject,
  Vec2,
  MouseButton,
  Camera,
  TextObject,
  ExamplePlayer,
  ImageAsset,
  clamp,
  randomFloat,
  randomInt,
};

export type { DrawContext, GameContext, DrawStyle, MouseButtonEvent };
