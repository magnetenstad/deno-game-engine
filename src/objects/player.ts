import { drawImage } from '../engine/draw.ts';
import { Input } from '../engine/events.ts';
import { PositionObject } from '../engine/gameObject.ts';
import { ImageAssets } from '../main.ts';

export class Player extends PositionObject {
  speed = 10;
  image = ImageAssets.player;

  draw(): void {
    drawImage(this.image, this.pos.x, this.pos.y);
  }

  step(): void {
    if (Input.key('w')) this.pos.y -= this.speed;
    if (Input.key('a')) this.pos.x -= this.speed;
    if (Input.key('s')) this.pos.y += this.speed;
    if (Input.key('d')) this.pos.x += this.speed;
  }
}
