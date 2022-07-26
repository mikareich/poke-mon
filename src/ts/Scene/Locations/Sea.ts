import Location from '../Location'

import { Vector2D } from '@/Dimension'
import Renderer from '@/Renderer'

const Sea = new Location(
  Renderer.CONFIG.ORIENTED_WIDTH,
  Renderer.CONFIG.ORIENTED_WIDTH,
  new Vector2D(0, 0)
)

export default Sea
