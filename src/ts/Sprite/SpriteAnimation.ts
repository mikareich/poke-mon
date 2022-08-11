import type { State } from './interfaces'

import { FPS } from '../constants'

import Sprite from './Sprite'

class SpriteAnimation extends Sprite {
  //  ==================== PUBLIC PROPERTIES ==================== //

  /** Whether the animations repeats */
  public infinite: boolean = false

  /** Name of the animation */
  public readonly name: string

  /** Index of the current state */
  public stateIndex: number = 0

  /** How many times the state changes in one second */
  public ticks: number = FPS

  //  ==================== PRIVATE PROPERTIES ==================== //

  /** Last time the state was changed */
  private lastUpdate: number = 0

  //  ==================== CONSTRUCTOR ==================== //

  /** Creates new animation */
  constructor(name: string, states: State[]) {
    super(states)

    this.name = name

    this.setCurrentState(states[0].name)
  }

  //  ==================== PUBLIC METHODS ==================== //

  /** Triggers next sprite state */
  public update(): void {
    const deltaTime = Date.now() - this.lastUpdate
    if (deltaTime >= 1000 / this.ticks) {
      this.lastUpdate = Date.now()
      if (this.stateIndex < this.states.length - 1) {
        this.stateIndex += 1
      } else if (this.infinite) {
        this.stateIndex = 0
      }

      this.setCurrentState(this.states[this.stateIndex].name)
    }
  }
}

export default SpriteAnimation
