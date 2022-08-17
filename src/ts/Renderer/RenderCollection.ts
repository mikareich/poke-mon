import type { Transform, RenderData } from '@/interfaces'

import Renderable from './Renderable'

import Vector2D from '@/Dimensions/Vector'

/** Contains related render objects or render collections */
class RenderCollection extends Renderable {
  // ==================== PRIVATE PROPERTIES ==================== //

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
    items.forEach((item) => item.setParentCollection(this))

    await Promise.all(items.map((item) => item.loadAssets()))
  }

  /** Finds renderable by id */
  public findById(id: string): Renderable | undefined {
    return this._collection.find((item) => item.id === id)
  }

  /** Finds renderable by indentifier */
  public findByIdentifier(identifier: string): Renderable | undefined {
    return this.flattenCollection().find(
      (item) => item.identifier === identifier
    )
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

  /** Returns all relevant render data of collection
   * @param transfrom Transform to use
   * @returns {RenderData[]} Render data
   */
  public toRenderData(
    transfrom: Transform = Renderable.CONFIG.DEFAULT_TRANSFORM
  ): RenderData[] {
    const renderData = this.collection
      .map((item): RenderData | RenderData[] =>
        item.toRenderData(this.updateTransform(transfrom))
      )
      .flat()

    return renderData
  }

  /** Shifts transform based on position */
  public updateTransform(transform: Transform): Transform {
    let { shift, scale } = Renderable.CONFIG.DEFAULT_TRANSFORM
    shift = Vector2D.shift(
      Renderable.CONFIG.DEFAULT_TRANSFORM.shift,
      this.position
    )

    if (this.isRelative) {
      scale = transform.scale
      shift = Vector2D.shift(transform.shift, this.position)
    }

    return { scale, shift }
  }

  //  ==================== PRIVATE METHODS ==================== //

  /** Flattens all renderable in collection (with collections) */
  private flattenCollection(): Renderable[] {
    return this._collection.reduce((collection, item) => {
      if (item instanceof RenderCollection) {
        return [...collection, item, ...item.flattenCollection()]
      }

      return [...collection, item]
    }, [] as Renderable[])
  }
}

export default RenderCollection
