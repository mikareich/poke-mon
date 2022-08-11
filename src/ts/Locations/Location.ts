import type Vector2D from '@/Dimensions/Vector'
import type { Renderable } from '@/Renderer/interfaces'

import { v4 as uuid } from 'uuid'

import Dimensions from '@/Dimensions'
import { RenderCollection } from '@/Renderer'

/** Represents location in game */
class Location extends Dimensions {
  /** Indicates whether you can enter this location */
  public accessible: boolean = true

  /** Id of location */
  public readonly id: string = uuid()

  /** Background of location */
  private _background: RenderCollection

  constructor(width: number, height: number, position: Vector2D) {
    super(width, height, position)

    this._background = new RenderCollection(
      this.width,
      this.height,
      this.position
    )
    this._background.isRelative = true
  }

  /** Background of location */
  public get background(): RenderCollection {
    const clone = Object.assign(
      Object.create(Object.getPrototypeOf(this._background)),
      this._background
    )

    return clone
  }

  /** Set's background of location */
  public async setBackground(...renderable: Renderable[]): Promise<void> {
    await this._background.add(...renderable)
  }
}

export default Location
