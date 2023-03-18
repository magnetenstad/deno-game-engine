import { Game } from './engine/game.ts';
import { Emitter } from './objects/emitter.ts';
import { GlobalInput } from './objects/globalInput.ts';
import { Outline } from './objects/outline.ts';
import { Data, TextObject } from './objects/textObject.ts';

export const game = new Game();

export const ImageAssets = {};

game.setOptions({
  width: 1000,
  height: 600,
  scale: 2,
  fps: 60,
});

game.setImageAssets(ImageAssets);

export const globalInput = new GlobalInput();
game.addGameObject(globalInput);

// const ratingPreScript = (oldData: Data, newData: Data) => {
//   const data = Object.assign(oldData, newData);
//   data.rating = 0;
//   if (data.noise) {
//     data.rating = (data.rating as number) - (data.noise as number);
//   }
//   if (data.people) {
//     data.rating = (data.rating as number) - (data.people as number);
//   }
//   return data;
// };

// const ratingPostScript = (data: Data) => {
//   return {
//     rating: data.rating || undefined,
//     room: data.room || undefined,
//   };
// };

export const texts = {
  apeople: new TextObject('Antall personer A', 50, 100),
  anoise: new TextObject('Støy A', 50, 200),
  xpeople: new TextObject('Antall personer', 350, 150),

  bpeople: new TextObject('Antall personer B', 50, 400),
  bnoise: new TextObject('Støy B', 50, 500),
  xnoise: new TextObject('Støy', 350, 450),

  room: new TextObject(
    'Anbefalt arbeidsrom',
    550,
    300,
    (oldData: Data, newData: Data) => {
      for (const key of Object.keys(newData)) {
        oldData[key] = Object.assign(oldData[key] ?? {}, newData[key]);
      }
      return oldData;
    },
    (data: Data) => {
      let roomName = '';
      let maxValue = -Infinity;
      for (const key of Object.keys(data)) {
        const roomObj = data[key] as Record<string, number>;
        let value = 20;
        if ('noise' in roomObj) {
          value -= roomObj.noise;
        }
        if ('people' in roomObj) {
          value -= roomObj.people;
        }
        if (value > maxValue) {
          maxValue = value;
          roomName = key;
        }
      }
      return roomName ? { room: roomName } : {};
    }
  ),

  user1: new TextObject('Bruker 1', 800, 300),
  user2: new TextObject('Bruker 2', 800, 450),
  app: new TextObject('StøyApp', 550, 500),
  cantine: new TextObject('Kantine', 550, 100, (_: Data, newData: Data) => {
    let result = 0;
    Object.values(newData).forEach((v: any) => (result += v.people ?? 0));
    return { cinnamonBuns: result * 2 };
  }),

  // peopleTotal: new TextObject(
  //   'Personer totalt',
  //   300,
  //   300,
  //   (oldData: Data, newData: Data) => {
  //     if ('room' in newData && 'people' in newData) {
  //       oldData['room' + newData.room] = newData.people;
  //     }
  //     return oldData;
  //   },
  //   (data: Data) => {
  //     let people = 0;
  //     Object.values(data).forEach((value) => (people += value as number));
  //     return { people };
  //   }
  // ),
  // cantine: new TextObject(
  //   'Matbehov i kantina',
  //   550,
  //   150,
  //   (_: Data, newData: Data) => {
  //     return { cinnamonBuns: (newData.people as number) * 2 };
  //   }
  // ),
};

texts.apeople.arrowTo.push(texts.xpeople);
texts.anoise.arrowTo.push(texts.xnoise);
texts.xpeople.arrowTo.push(texts.room);
texts.bpeople.arrowTo.push(texts.xpeople);
texts.bnoise.arrowTo.push(texts.xnoise);
texts.xnoise.arrowTo.push(texts.room);
texts.room.arrowTo.push(texts.user1);
texts.room.arrowTo.push(texts.user2);
texts.xnoise.arrowTo.push(texts.app);
texts.xpeople.arrowTo.push(texts.cantine);

// texts.peopleA.arrowTo.push(texts.peopleTotal);
// texts.peopleB.arrowTo.push(texts.peopleTotal);
// texts.peopleTotal.arrowTo.push(texts.cantine);

const outlineA = new Outline([texts.anoise, texts.apeople], 'Rom A');
const outlineB = new Outline([texts.bnoise, texts.bpeople], 'Rom B');
game.addGameObject(outlineA);
game.addGameObject(outlineB);

const emitInterval = 10000;
export const emitters = {
  apeople: new Emitter(emitInterval, (value?: number) =>
    texts.apeople.receiveData({
      A: { people: value ?? Math.round(Math.random() * 10) },
    })
  ),
  anoise: new Emitter(emitInterval, (value?: number) =>
    texts.anoise.receiveData({
      A: { noise: value ?? Math.round(Math.random()) },
    })
  ),
  bpeople: new Emitter(emitInterval, (value?: number) =>
    texts.bpeople.receiveData({
      B: { people: value ?? Math.round(Math.random() * 10) },
    })
  ),
  bnoise: new Emitter(emitInterval, (value?: number) =>
    texts.bnoise.receiveData({
      B: { noise: value ?? Math.round(Math.random()) },
    })
  ),
} as const;

Object.values(texts).forEach((text) => {
  game.addGameObject(text);
});

Object.values(emitters).forEach((emitter) => {
  game.addGameObject(emitter);
});

game.play();
