import { Camera, DrawContext, Game, TextObject, Vec2 } from '../../../lib'
import { Enemy } from './enemy'
import { Player } from './player'

const gameDiv = document.querySelector('#game')

const options = {
  width: 480,
  height: 270,
  scale: 3,
  fps: 60,
}
const game = new Game(gameDiv).setOptions(options)

const player = new Player(100, 250).activate(game)
game.canvas.camera = new Camera(new Vec2(480, 320)).setTarget(player)

new Enemy(200, 200).activate(game)

new TextObject(() => `Player: ${JSON.stringify(player.pos)}`, 8, 8).activate(
  game
)

new TextObject(() => `Objects: ${game.getInstances().length}`, 8, 24).activate(
  game
)
new TextObject(() => `FPS: ${game.currentFps.toFixed(1)}`, 8, 8, {
  gui: true,
}).activate(game)

game.beforeDraw = (ctx: DrawContext) => {
  ctx.canvas.drawRect(new Vec2(0, 0), new Vec2(options.width, options.height), {
    fillStyle: '',
    strokeStyle: 'blue',
    lineWidth: 1,
  })
}

export const audio = {
  explosion: './explosion.wav',
} as const

Object.values(audio).forEach((url) => game.getGameContext().audio.prefetch(url))

game.play()
