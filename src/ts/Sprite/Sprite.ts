import type { State } from './interfaces'
import type Asset from '@/Asset'
import type { RenderData } from '@/interfaces'

import { v4 as uuid } from 'uuid'

import Vector2D from '@/Dimensions/Vector'

class Sprite {
  //  ==================== PUBLIC STATIC PROPERTIES ==================== //

  public static CONFIG = {}

  //  ==================== PUBLIC PROPERTIES ==================== //

  /** ID of the sprite */
  public readonly id = uuid()

  /** All sprites states */
  public readonly states: State[]

  //  ==================== PRIVATE PROPERTIES ==================== //

  private _currentState: State | undefined = undefined

  //  ==================== CONSTRUCTORS ==================== //

  constructor(states: State[] = []) {
    this.states = states
  }

  //  ==================== PUBLIC STATIC METHODS ==================== //

  /**
   * Forms sprite out of assets
   * @param name Namepattern of states
   * @param asset Asset to use
   * @param assetWidth Width of asset
   * @param assetHeight Height of asset
   * @param numberOfStates Number of states to form
   */
  public static createHorizontalStates(
    name: string,
    asset: Asset,
    assetWidth: number,
    assetHeight: number,
    numberOfStates: number
  ): State[] {
    const width = assetWidth / numberOfStates
    const height = assetHeight

    const states = []
    for (let i = 0; i < numberOfStates; i += 1) {
      states.push({
        height,
        image: asset,
        name: `${name}_${i}`,
        position: new Vector2D(i * width, 0),
        width,
      })
    }

    return states
  }

  /**
   * Renders sprite on canvas
   * @param renderData Render data
   * @param ctx Canvas context
   * @param state State of sprite
   */
  public static renderState(
    renderData: RenderData,
    ctx: CanvasRenderingContext2D,
    state: State
  ): void {
    const { width, height, position } = renderData
    const { x: dx, y: dy } = position
    const { x: sx, y: sy } = state.position

    const image = state.image.asset as HTMLImageElement

    if (image !== undefined) {
      ctx.imageSmoothingEnabled = false

      ctx.drawImage(
        image,
        sx,
        sy,
        state.width,
        state.height,
        dx,
        dy,
        width,
        height
      )
    }
  }

  //  ==================== PUBLIC METHODS ==================== //

  /** Returns currently selected state */
  public getCurrentState(): State | undefined {
    return this._currentState || this.states[0]
  }

  /**
   * Searches for state with given name
   * @param name Name of state
   * @returns State with given name
   */
  public getState(name: string): State | undefined {
    return this.states.find((state) => state.name === name)
  }

  /** Load all assets */
  public async loadAssets(): Promise<void> {
    await Promise.all(this.states.map((state) => state.image.loadAsset()))
  }

  /** Sets new state */
  public setCurrentState(name: string): void {
    this._currentState = this.states.find((state) => state.name === name)
  }
}

export default Sprite
