import { drawRect, drawText } from '../engine/draw.ts';
import { GameObject } from '../engine/gameObject.ts';
import { emitters, game } from '../main.ts';
import { TextObject } from './textObject.ts';

type EmitterKey = keyof typeof emitters;

export class GlobalInput extends GameObject {
  keys = '';
  autoEmit = false;

  onKeyPress(key: string): void {
    if (key == 'q') {
      this.autoEmit = !this.autoEmit;
      game.gameObjects.forEach((obj) => {
        if (obj instanceof TextObject) {
          obj.data = {};
        }
      });
      return;
    }

    if (!isNaN(+key)) {
      if (this.keys.length == 0) return;
      const all = Object.keys(emitters) as EmitterKey[];
      const filtered = [] as EmitterKey[];
      for (let j = 0; j < all.length; j++) {
        if (all[j].substring(0, this.keys.length) === this.keys) {
          filtered.push(all[j]);
        }
      }
      filtered.forEach((name: EmitterKey) => {
        emitters[name].func(Number(key));
      });
      this.keys = '';
    } else if (key.length == 1) {
      this.keys += key;
    } else {
      this.keys = '';
    }
  }

  draw(_t: number): void {
    if (!this.autoEmit) {
      drawRect(10, 10, 20, 20);
    }
    drawText(this.keys, 40, 30);
  }
}
