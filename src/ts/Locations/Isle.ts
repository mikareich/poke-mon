import Forest from './Forest'
import Location from './Location'

import { Vector2D } from '@/Dimensions'
import { RenderObject } from '@/Renderer'
import { SingleSprite } from '@/Sprite'

class Isle extends Location {
  public static readonly CONFIG = {
    HEIGHT: 600,
    WIDTH: 800,
  }

  constructor() {
    const width = Isle.CONFIG.WIDTH
    const height = Isle.CONFIG.HEIGHT
    super(width, height, new Vector2D(0, 0))

    const sprite = new SingleSprite('/images/isle.png', 360, 240)
    const bg = new RenderObject(width, height, new Vector2D(0, 0), {
      sprite,
    })
    bg.isRelative = true
    this.setBackground(bg)

    // add forest
    const forest = new Forest(200, 200, new Vector2D(100, 50), 10)

    this.setBackground(forest.background)
  }
}

export default Isle
