import type { Vector2D } from '@/Dimensions'
import type { SpriteAnimation } from '@/Sprite'
import type Sprite from '@/Sprite'

export interface Transform {
  scale: number
  shift: Vector2D
}

export interface RenderData {
  background: {
    color?: string
    sprite?: Sprite | SpriteAnimation
  }
  height: number
  position: Vector2D
  width: number
}
