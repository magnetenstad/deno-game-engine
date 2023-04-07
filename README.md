# web-game-engine

A 2D game engine based on the [standard Web APIs](https://developer.mozilla.org/en-US/docs/Web/API).

See the `examples/` folder for example projects, and go [here](https://magne.dev/web-game-engine/) to play them.

## Get started with Vite + web-game-engine

1. Initialize a new Vite project. Choose `Vanilla` and `Typescript`

```console
npm create vite@latest
```

2. `cd` into the directory
3. Install web-game-engine

```console
npm i web-game-engine
```

4. Delete `src/counter.ts` and `src/style.css`. Replace the contents of `src/main.ts` with

```ts
import { ExamplePlayer, Game, TextObject } from 'web-game-engine';

const game = new Game(document.querySelector('#app'));

new ExamplePlayer(50, 50)
  .activate(game);
new TextObject(() => `FPS: ${game.currentFps.toFixed(1)}`, 8, 8)
  .activate(game);

game.play();
```

5. Play the game by running in dev mode

```console
npm run dev
```

6. Build, and deploy the `dist` folder

```console
npm run build
```

