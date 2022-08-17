import type RenderCollection from './RenderCollection'
import type { Transform, RenderData } from '@/interfaces'

import { v4 as uuid } from 'uuid'

import Renderer from './Renderer'

import { DEFAULT_TRANSFORM } from '@/constants'
import Dimensions, { Vector2D } from '@/Dimensions'

class Renderable extends Dimensions {
  public static readonly CONFIG = {
    /** Default transform */
    DEFAULT_TRANSFORM,
  }

  /** ID of render object */
  public readonly id = uuid()

  /** Identifier of the object */
  public identifier: string | undefined

  /** Indicates whether width, height and position are relativ calculated */
  public isRelative: boolean = false

  /** Position  on canvas */
  public position: Vector2D = new Vector2D(0, 0)

  /** Render priority */
  public renderPriority: number = 0

  /** Next instance of this render object */
  private _parrentCollection: RenderCollection | undefined

  constructor(width: number, height: number, position: Vector2D) {
    super(width, height, position)
    this.position = position // idk irgendwie wird die sonst auf 0,0 gesetzt
  }

  /** Next instance of this render object */
  public get parentCollection(): RenderCollection | undefined {
    return this._parrentCollection
  }

  /** Returns absolut dimensions on game canvas
   * @param rendererTransform Simulated transform of the renderer
   * @returns {Dimensions} Absolute dimensions
   */
  public getAbsoluteDimensions(
    rendererTransform = Renderer.CONFIG.DEFAULT_TRANSFORM
  ): Dimensions {
    const renderStack = Renderer.generateStack(this)
    const finalTransform = renderStack.reduce(
      (transform: Transform, collection: RenderCollection) =>
        collection.updateTransform(transform),
      rendererTransform
    )

    return Dimensions.transform(this, finalTransform)
  }

  /** Loads all containing assets */
  // eslint-disable-next-line class-methods-use-this
  public async loadAssets(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  /** Sets parent collection */
  public setParentCollection(collection: RenderCollection): void {
    this._parrentCollection = collection
  }

  /** Returns all relevant render data
   * @param transform Transform to use
   * @returns {RenderData} Render data
   */
  // eslint-disable-next-line class-methods-use-this
  public toRenderData(
    // eslint-disable-next-line no-unused-vars
    transform: Transform = Renderable.CONFIG.DEFAULT_TRANSFORM
  ): RenderData | RenderData[] {
    throw new Error('Method not implemented.')
  }
}

export default Renderable
