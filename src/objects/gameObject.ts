import { AudioStore } from '../audio'
import { Canvas } from '../draw'
import { Game } from '../game'
import { Input, KeyboardKey, MouseButtonEvent } from '../input'

export type DrawContext = {
  game: Game
  canvas: Canvas
  t: number
  input: Input
}
export type GameContext = {
  game: Game
  input: Input
  audio: AudioStore
  dtFactor: number
  t: number
}

export abstract class GameObject {
  __changed = true
  __zIndex = 0
  __game?: Game

  constructor() {
    this.activate()
  }

  step?(ctx: GameContext): void
  draw?(ctx: DrawContext): void
  onMousePress?(ev: MouseButtonEvent, ctx: GameContext): void
  onMouseRelease?(ev: MouseButtonEvent, ctx: GameContext): void
  onKeyPress?(key: KeyboardKey, ctx: GameContext): void
  onKeyRelease?(key: KeyboardKey, ctx: GameContext): void
  onActivate?(ctx: GameContext): void
  onDeactivate?(ctx: GameContext): void
  onDestruct?(ctx: GameContext): void

  activate(game?: Game) {
    if (game) {
      this.deactivate()
      this.__game = game
    }
    if (!this.__game) return this
    this.__game.__addObject(this)
    this.onActivate?.(this.__game.getGameContext())
    return this
  }

  deactivate() {
    if (!this.__game) return this
    this.onDeactivate?.(this.__game.getGameContext())
    this.__game.__removeObject(this)
    return this
  }

  destruct() {
    this.deactivate()
    if (!this.__game) return this
    this.onDestruct?.(this.__game.getGameContext())
    return this
  }

  setZIndex(zIndex: number) {
    this.__zIndex = zIndex
    this.__changed = true
    return this
  }
}
