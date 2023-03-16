export const appDiv = document.body.querySelector('#app')! as HTMLDivElement;

if (!appDiv) {
  console.error('Could not find #app!');
}

export const canvasElement = appDiv.querySelector(
  'canvas'
)! as HTMLCanvasElement;

if (!canvasElement) {
  console.error('Could not find #canvas!');
}

export const ctx = canvasElement.getContext('2d')!;

if (!ctx) {
  console.error('Could not get context of canvas!');
}

export const assetsDiv = document.body.querySelector(
  '#assets'
)! as HTMLDivElement;

if (!assetsDiv) {
  console.error('Could not find #assets!');
}
