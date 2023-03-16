const app = document.body.querySelector('#app')!;

if (!app) {
  console.log('Could not find #app!');
}

app.innerHTML = 'Hello deno-game-engine!';
