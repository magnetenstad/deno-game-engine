export const __appDiv = document.body.querySelector('#app')! as HTMLDivElement;

if (!__appDiv) {
  console.error('Could not find #app!');
}

export const __canvasElement = __appDiv.querySelector(
  'canvas'
)! as HTMLCanvasElement;

if (!__canvasElement) {
  console.error('Could not find #canvas!');
}

export const __ctx = __canvasElement.getContext('2d')!;

if (!__ctx) {
  console.error('Could not get context of canvas!');
}

export const __assetsDiv = document.body.querySelector(
  '#assets'
)! as HTMLDivElement;

if (!__assetsDiv) {
  console.error('Could not find #assets!');
}
