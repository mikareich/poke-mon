import type Vector2D from '@/Dimension/Vector'
import type { Renderable } from '@/Renderer/interfaces'

import { v4 as uuid } from 'uuid'

import Dimensions from '@/Dimension/Dimension'
import RenderCollection from '@/Renderer/RenderCollection'

/** Represents location in game */
class Location extends Dimensions {
  /** Indicates whether you can enter this location */
  public accessible: boolean = true

  /** Id of location */
  public readonly id: string = uuid()

  /** Background of location */
  private readonly background: RenderCollection

  constructor(width: number, height: number, position: Vector2D) {
    super(width, height, position)

    this.background = new RenderCollection(width, height, position)
    this.background.isRelative = true
  }

  /** Set's background of location */
  public setBackground(...renderable: Renderable[]): void {
    this.background.add(...renderable)
  }
}

export default Location
