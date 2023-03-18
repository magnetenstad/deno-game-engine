import { Game } from './engine/game.ts';
import { Emitter } from './objects/emitter.ts';
import { MainInputObject } from './objects/inputObject.ts';
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

game.addGameObject(new MainInputObject());

const ratingPreScript = (oldData: Data, newData: Data) => {
  const data = Object.assign(oldData, newData);
  data.rating = 0;
  if (data.noise) {
    data.rating = (data.rating as number) - (data.noise as number);
  }
  if (data.people) {
    data.rating = (data.rating as number) - (data.people as number);
  }
  return data;
};

const ratingPostScript = (data: Data) => {
  return {
    rating: data.rating || undefined,
    room: data.room || undefined,
  };
};

export const texts = {
  peopleA: new TextObject('Antall personer A', 50, 100),
  noiseA: new TextObject('Støy A', 50, 200),
  ratingA: new TextObject(
    'Rating A',
    300,
    150,
    ratingPreScript,
    ratingPostScript
  ),

  peopleB: new TextObject('Antall personer B', 50, 400),
  noiseB: new TextObject('Støy B', 50, 500),
  ratingB: new TextObject(
    'Rating B',
    300,
    450,
    ratingPreScript,
    ratingPostScript
  ),

  room: new TextObject(
    'Anbefalt arbeidsrom',
    550,
    300,
    (oldData: Data, newData: Data) => {
      if ('room' in newData && 'rating' in newData) {
        oldData['room' + newData.room] = newData.rating;
      }
      return oldData;
    },
    (data: Data) => {
      let room = '';
      let maxValue = -Infinity;
      for (const [key, value] of Object.entries(data)) {
        const v = Number(value);
        if (v > maxValue) {
          maxValue = v;
          room = key;
        }
      }
      return { room };
    }
  ),

  user1: new TextObject('Bruker 1', 800, 300),
  user2: new TextObject('Bruker 2', 800, 450),

  peopleTotal: new TextObject(
    'Personer totalt',
    300,
    300,
    (oldData: Data, newData: Data) => {
      if ('room' in newData && 'people' in newData) {
        oldData['room' + newData.room] = newData.people;
      }
      return oldData;
    },
    (data: Data) => {
      let people = 0;
      Object.values(data).forEach((value) => (people += value as number));
      return { people };
    }
  ),
  cantine: new TextObject(
    'Matbehov i kantina',
    550,
    150,
    (_: Data, newData: Data) => {
      return { cinnamonBuns: (newData.people as number) * 2 };
    }
  ),
};

texts.peopleA.arrowTo.push(texts.ratingA);
texts.noiseA.arrowTo.push(texts.ratingA);
texts.ratingA.arrowTo.push(texts.room);
texts.peopleB.arrowTo.push(texts.ratingB);
texts.noiseB.arrowTo.push(texts.ratingB);
texts.ratingB.arrowTo.push(texts.room);
texts.room.arrowTo.push(texts.user1);
texts.room.arrowTo.push(texts.user2);

texts.peopleA.arrowTo.push(texts.peopleTotal);
texts.peopleB.arrowTo.push(texts.peopleTotal);
texts.peopleTotal.arrowTo.push(texts.cantine);

const emitInterval = 10000;
export const emitters = {
  peopleA: new Emitter(emitInterval, () =>
    texts.peopleA.receiveData({
      room: 'A',
      people: Math.round(Math.random() * 10),
    })
  ),
  noiseA: new Emitter(emitInterval, () =>
    texts.noiseA.receiveData({ room: 'A', noise: Math.round(Math.random()) })
  ),
  peopleB: new Emitter(emitInterval, () =>
    texts.peopleB.receiveData({
      room: 'B',
      people: Math.round(Math.random() * 10),
    })
  ),
  noiseB: new Emitter(emitInterval, () =>
    texts.noiseB.receiveData({ room: 'B', noise: Math.round(Math.random()) })
  ),
};

Object.values(texts).forEach((text) => {
  game.addGameObject(text);
});

Object.values(emitters).forEach((emitter) => {
  game.addGameObject(emitter);
});

game.play();
