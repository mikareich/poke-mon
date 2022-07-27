import Sprite from './Sprite'

import Asset from '@/Asset'
import { Vector2D } from '@/Dimensions'

class SingleSprite extends Sprite {
  //  ==================== CONSTRUCTOR ==================== //
  constructor(src: string, width: number, height: number) {
    const asset = new Asset('image', src, {
      height: height.toString(),
      width: width.toString(),
    })

    super([
      {
        height,
        image: asset,
        name: 'default',
        position: new Vector2D(0, 0),
        width,
      },
    ])

    this.setCurrentState('default')
  }
}

export default SingleSprite
