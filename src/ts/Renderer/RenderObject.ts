import type { Vector2D } from '@/Dimensions'
import type { RenderData, Transform } from '@/interfaces'
import type Sprite from '@/Sprite'
import type { SpriteAnimation } from '@/Sprite'

import Renderable from './Renderable'

import Dimensions from '@/Dimensions'

interface Background {
  color?: string
  sprite?: Sprite
}

class RenderObject extends Renderable {
  //  ==================== PUBLIC STATIC PROPERTIES ==================== //
  public static readonly CONFIG = {
    ...Renderable.CONFIG,
    /** Default background color */
    DEFAULT_BACKGROUND_COLOR: 'red',
  }

  //  ==================== PUBLIC PROPERTIES ==================== //

  /** Animations */
  public readonly animations: SpriteAnimation[] = []

  /** Color of background */
  public readonly background: Background = {
    color: RenderObject.CONFIG.DEFAULT_BACKGROUND_COLOR,
  }

  /** Current animation */
  public currentAnimation: SpriteAnimation | undefined

  //  ==================== CONSTRUCTOR ==================== //

  /** Represents game object on game screen */
  constructor(
    width: number,
    height: number,
    position: Vector2D,
    background?: Background
  ) {
    super(width, height, position)

    if (background) this.background = background
  }

  //  ==================== PUBLIC METHODS ==================== //

  /** Adds animation to object
   * @param animation Animation to add
   */
  public addAnimation(animation: SpriteAnimation): void {
    this.animations.push(animation)
  }

  public async loadAssets(): Promise<void> {
    await this.background.sprite?.loadAssets()
    await Promise.all(
      this.animations.map((animation) => animation.loadAssets())
    )
  }

  /** Stops animation */
  public stopAnimation(): void {
    this.currentAnimation = undefined
  }

  /** Returns all relevant render data
   * @param transform Transform to use
   * @returns {RenderData} Render data
   */
  public toRenderData(
    transform: Transform = Renderable.CONFIG.DEFAULT_TRANSFORM
  ): RenderData {
    const renderData: RenderData = {
      background: {
        color: this.background.color,
        sprite: this.currentAnimation || this.background.sprite,
      },
      ...Dimensions.transform(this, transform),
    }

    return renderData
  }

  /** Uses animation to render object
   * @param animationName Animation to use
   */
  public useAnimation(animationName: string): void {
    const animation = this.animations.find(({ name }) => name === animationName)
    this.currentAnimation = animation
  }
}

export default RenderObject
