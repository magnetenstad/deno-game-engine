import { drawArrow, drawText } from '../engine/draw.ts';
import { PositionObject } from '../engine/position.ts';
import { sleep } from '../engine/time.ts';
import { game } from '../main.ts';

export type Data = Record<string, unknown>;

export class TextObject extends PositionObject {
  text: string;
  data: Data = {};
  arrowTo: TextObject[] = [];
  target?: TextObject;
  preScript: (oldData: Data, newData: Data) => Data;
  postScript: (data: Data) => Data;
  sentPrev = '';

  constructor(
    text: string,
    x: number,
    y: number,
    preScript = (oldData: Data, newData: Data) =>
      Object.assign(oldData, newData),
    postScript = (data: Data) => data
  ) {
    super(x, y);
    this.text = text;
    this.preScript = preScript;
    this.postScript = postScript;
  }

  draw(_t: number): void {
    this.arrowTo.forEach((other) => {
      drawArrow(this.pos.addX(64), other.pos.addX(-16), 2, '#222222');
    });

    drawText(this.text, this.pos.x, this.pos.y);
    drawText(
      JSON.stringify(this.postScript(this.data)),
      this.pos.x,
      this.pos.y + 16,
      '#AAAAAA',
      16
    );
  }

  step(): void {
    if (this.target) {
      this.pos.x += (this.target.pos.x - this.pos.x) * 0.04;
      this.pos.y += (this.target.pos.y - this.pos.y) * 0.04;
      if (this.pos.lengthTo(this.target.pos) < 10) {
        this.target.receiveData(this.data);
        game.removeGameObject(this);
      }
    }
  }

  async receiveData(data: Data) {
    this.data = this.preScript(this.data, data);
    await sleep(500);
    const dataToSend = this.postScript(this.data);
    const sendString = JSON.stringify(dataToSend);
    if (sendString == this.sentPrev) return;
    this.sentPrev = sendString;
    for (let i = 0; i < this.arrowTo.length; i++) {
      const other = this.arrowTo[i];
      const text = new TextObject('', this.pos.x, this.pos.y);
      text.data = dataToSend;
      text.target = other;
      game.addGameObject(text);
    }
  }
}
