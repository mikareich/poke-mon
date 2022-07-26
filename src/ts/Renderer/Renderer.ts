import type { RenderData } from './interfaces'

import {
  GAME_SCREEN_RATIO,
  ORIENTED_HEIGHT,
  ORIENTED_WIDTH,
} from '../constants'

import RenderCollection from './RenderCollection'

import Dimensions from '@/Dimension/Dimension'
import Vector2D from '@/Dimension/Vector'
import Sprite, { SpriteAnimation } from '@/Sprite'

/** The core function of the Render class is the rendering of render objects. It
stores all render objects in a render collection. When a renderer is initiated,
the game canvas is also scaled to preset dimensions and the canvas context is
created. */
class Renderer {
  //* ==================== PUBLIC STATIC PROPERTIES ==================== //

  /** Presets */
  public static CONFIG = {
    /** Aspect ratio of canvas */
    CANVAS_RATIO: GAME_SCREEN_RATIO,
    /** Simulated height of the canvas */
    ORIENTED_HEIGHT,
    /** Simulated width of the canvas */
    ORIENTED_WIDTH,
  }

  //* ==================== PUBLIC PROPERTIES  ==================== //

  /** Game Canvas */
  public readonly canvasElement: HTMLCanvasElement

  /** Canvas Rendering Context */
  public readonly context: CanvasRenderingContext2D

  /** List of objects to render on each frame */
  public readonly renderCollection = new RenderCollection(
    Renderer.CONFIG.ORIENTED_WIDTH,
    Renderer.CONFIG.ORIENTED_HEIGHT,
    new Vector2D(0, 0)
  )

  //* ==================== CONSTRUCTORS ==================== //

  /** Initiates new renderer */
  constructor(canvasElement: HTMLCanvasElement) {
    this.canvasElement = canvasElement
    this.context = canvasElement.getContext('2d')!

    this.context.imageSmoothingEnabled = true
    this.context.imageSmoothingQuality = 'high'

    this.renderCollection.isRelative = true

    // set dimensions of canvas on resize
    Renderer.setDimensions(canvasElement)
    window.addEventListener('resize', () => {
      Renderer.setDimensions(canvasElement)
      this.render()
    })
  }

  //* ==================== PUBLIC GETTERS ==================== //

  /** Absolute height of canvas */
  public get height(): number {
    return this.canvasElement.height
  }

  /** Absolute width of canvas */
  public get width(): number {
    return this.canvasElement.width
  }

  //* ==================== PUBLIC STATIC METHODS ==================== //

  /** Renders render object on canvas
   * @param renderData Render data
   * @param ctx Canvas context
   */
  public static render(
    renderData: RenderData,
    ctx: CanvasRenderingContext2D
  ): void {
    const { width, height, position, background } = renderData
    const { x, y } = position

    if (background.sprite) {
      Sprite.renderState(renderData, ctx, background.sprite?.getCurrentState()!)

      if (background.sprite instanceof SpriteAnimation) {
        background.sprite.update()
      }
    } else if (background.color) {
      ctx.fillStyle = background.color!
      ctx.fillRect(x, y, width, height)
    }
  }

  //* ==================== PRIVATE STATIC METHODS ==================== //

  /** Sets width and height of canvas based on given ratio
   * @param canvasElement Canvas element
   */
  private static setDimensions(canvasElement: HTMLCanvasElement): void {
    const { CANVAS_RATIO } = Renderer.CONFIG

    let width = window.innerWidth
    let height = width * CANVAS_RATIO

    if (height > window.innerHeight) {
      height = window.innerHeight
      width = height / CANVAS_RATIO
    }

    canvasElement.setAttribute('width', `${width}`)
    canvasElement.setAttribute('height', `${height}`)
  }

  //* ==================== PUBLIC METHODS ==================== //

  /** Renders all render objects and collections */
  public async render(): Promise<void> {
    this.context.clearRect(0, 0, this.width, this.height)

    const absoluteDimensions = new Dimensions(
      this.width,
      this.height,
      new Vector2D(0, 0)
    )
    // render all render data
    const renderData = this.renderCollection.toRenderData(
      this.renderCollection,
      absoluteDimensions
    )
    renderData.forEach((data) => Renderer.render(data, this.context))
  }
}

export default Renderer