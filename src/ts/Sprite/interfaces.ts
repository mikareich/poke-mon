import type Asset from '@/Asset'
import type Vector2D from '@/Dimensions/Vector'

export interface State {
  height: number
  image: Asset
  name: string
  position: Vector2D
  width: number
}
