import type { Transform } from '@/interfaces'

import { Vector2D } from '@/Dimensions'

export const COLS = 100
export const ROWS = 75
export const ORIENTED_WIDTH = window.innerWidth
export const ORIENTED_HEIGHT = window.innerHeight
export const GAME_SCREEN_RATIO = ORIENTED_HEIGHT / ORIENTED_WIDTH
export const FPS = 30
export const DEFAULT_TRANSFORM: Transform = {
  scale: 1,
  shift: new Vector2D(0, 0),
}
export const ELEVATION = {
  GROUND: 0,
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
  LEVEL_4: 4,
  LEVEL_5: 5,
}
