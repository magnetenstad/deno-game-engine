import { Input } from '../engine/events.ts';
import { GameObject } from '../engine/gameObject.ts';
import { texts } from '../main.ts';

export class MainInputObject extends GameObject {
  step(): void {
    if (Input.key('e')) {
      texts.door.receiveData(1);
    }
  }
}
