import type { RenderData } from './interfaces'
import type Sprite from '@/Sprite'
import type { SpriteAnimation } from '@/Sprite'

import { v4 as uuid } from 'uuid'

import Dimensions, { Vector2D } from '@/Dimensions'

interface Background {
  color?: string
  sprite?: Sprite
}

class RenderObject extends Dimensions {
  //  ==================== PUBLIC STATIC PROPERTIES ==================== //
  public static CONFIG = {
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

  /** ID of render object */
  public readonly id = uuid()

  /** Identifier of the object */
  public readonly identifier: string | undefined

  /** Indicates whether width, height and position are relativ calculated */
  public isRelative: boolean = false

  /** Keeps aspect ratio when scaling */
  public keepAspectRatio: boolean = true

  /** Position  on canvas */
  public position: Vector2D = new Vector2D(0, 0)

  /** Render priority */
  public renderPriority: number = 0

  //  ==================== CONSTRUCTOR ==================== //

  /** Represents game object on game screen */
  constructor(
    width: number,
    height: number,
    position: Vector2D,
    background?: Background,
    identifier?: string
  ) {
    super(width, height, position)
    this.position = position // idk irgendwie wird die sonst auf 0,0 gesetzt

    if (background) this.background = background
    if (identifier) this.identifier = identifier
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

  /** Returns all relevant render data based on base dimensions
   * @param baseDimensions Based dimensions
   * @returns {RenderObject}
   */
  public toRenderData(
    baseDimensions?: Dimensions,
    targetDimensions?: Dimensions
  ): RenderData {
    const renderData: RenderData = {
      background: {
        color: this.background.color,
        sprite: this.currentAnimation || this.background.sprite,
      },
      height: this.height,
      position: this.position,
      width: this.width,
    }

    // update to oriented dimensions
    if (this.isRelative && baseDimensions && targetDimensions) {
      const relativeDimensions = Dimensions.getRatio(this, baseDimensions)
      const { width, height, position } = Dimensions.absoluteDimensions(
        relativeDimensions,
        targetDimensions
      )

      renderData.width = width
      renderData.height = height
      renderData.position = position
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
