import type RenderCollection from './RenderCollection'
import type RenderObject from './RenderObject'
import type Vector2D from '@/Dimension/Vector'
import type Sprite from '@/Sprite/Sprite'
import type SpriteAnimation from '@/Sprite/SpriteAnimation'

export type BackgroundType = 'color' | 'sprite'

export interface RenderData {
  background: {
    color?: string
    sprite?: Sprite | SpriteAnimation
  }
  height: number
  position: Vector2D
  width: number
}

export type Renderable = RenderObject | RenderCollection
