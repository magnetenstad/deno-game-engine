export const app = document.body.querySelector('#app')! as HTMLDivElement;

if (!app) {
  console.error('Could not find #app!');
}

export const canvas = app.querySelector('canvas')! as HTMLCanvasElement;

if (!canvas) {
  console.error('Could not find #canvas!');
}

export const ctx = canvas.getContext('2d')!;

if (!ctx) {
  console.error('Could not get context of canvas!');
}
