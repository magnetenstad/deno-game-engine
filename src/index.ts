import { Game } from './game';
import { GameObject, DrawContext, GameContext } from './objects/gameObject';
import { Vec2 } from './math';
import { MouseButton } from './input';
import { DrawStyle } from './draw';
import { Camera } from './camera';
import { PositionObject } from './objects/positionObject';
import { ImageObject } from './objects/imageObject';
import { TextObject } from './objects/textObject';
import { ExamplePlayer } from './objects/examples/examplePlayer';
import { playSound } from './audio';

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
  playSound,
};
export type { DrawContext, GameContext, DrawStyle };
