import type { Renderable, RenderData } from './interfaces'
import type { Transform } from '@/interfaces'

import { v4 as uuid } from 'uuid'

import Dimensions from '@/Dimensions/Dimensions'
import Vector2D from '@/Dimensions/Vector'
import { round } from '@/Utils/round'

export const defaultTransform: Transform = {
  scale: 1,
  shift: new Vector2D(0, 0),
}

/** Contains related render objects or render collections */
class RenderCollection extends Dimensions {
  // ==================== PUBLIC PROPERTIES ==================== //

  /** ID of the collection */
  public readonly id = uuid()

  /** Indicates whether width, height and position are relativ calculated */
  public isRelative: boolean = false

  /** Collection */
  private _collection: Renderable[] = []

  // ==================== CONSTRUCTOR ==================== //

  /** Creates new collection
   * @param width Width of collection
   * @param height Height of collection
   * @param position Position of the collection
   */
  constructor(width: number, height: number, position: Vector2D) {
    super(width, height, position)
    this.isRelative = false
  }

  /** Collection */
  public get collection(): Renderable[] {
    return [...this._collection]
  }

  //  ==================== PUBLIC METHODS ==================== //

  /** Adds render items to collection
   * @param items Items to add
   */
  public async add(...items: Renderable[]): Promise<void> {
    this._collection.push(...items)

    await Promise.all(items.map((item) => item.loadAssets()))
  }

  /** Loads all assets of containing items */
  public async loadAssets(): Promise<void> {
    await Promise.all(this._collection.map((item) => item.loadAssets()))
  }

  /** Removes item from collection
   * @param item Item to remove
   */
  public remove(item: Renderable): void {
    this._collection.splice(this._collection.indexOf(item), 1)

    const index = this._collection.indexOf(item)
    if (index !== -1) this._collection.splice(index, 1)
  }

  /** Returns all relevant render data based on base dimensions
   * @param targetDimension Based dimensions
   */
  public toRenderData(transfrom: Transform = defaultTransform): RenderData[] {
    const scale = round(
      this.isRelative ? transfrom.scale : defaultTransform.scale
    )
    const shift = Vector2D.shift(
      this.isRelative ? transfrom.shift : defaultTransform.shift,
      this.position
    )

    const renderData = this.collection
      .map((item): RenderData | RenderData[] =>
        item.toRenderData({ scale, shift })
      )
      .flat()

    return renderData
  }
}

export default RenderCollection
