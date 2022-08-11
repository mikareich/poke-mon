/* eslint-disable */
import Vector2D from './Vector'

import { round, roundUp } from '@/Utils/round'

type RelativePositionX = 'left' | 'center' | 'right'
type RelativePositionY = 'top' | 'center' | 'bottom'

/**
 * Represents width, height and a position
 */
class Dimensions {
  //  ==================== PUBLIC STATIC PROPERTIES ==================== //

  public static CONFIG = {}

  //  ==================== PUBLIC PROPERTIES ==================== //

  /** Relative height on the canvas */
  public height: number

  /** Relative position on the canvas */
  public position: Vector2D = new Vector2D(0, 0)

  /** Relative width on the canvas */
  public width: number

  //  ==================== CONSTRUCTORS ==================== //

  /** Creates width, height and a position */
  constructor(width: number, height: number, position: Vector2D) {
    this.width = width
    this.height = height
    this.position = position
  }

  //  ==================== PUBLIC STATIC METHODS ==================== //

  /** Calculates absolut dimensions
   * @param ratio Relative dimensions in another collection
   * @param targetDimension Target dimensions of the collection
   */
  public static absoluteDimensions(
    ratio: Dimensions,
    targetDimension: Dimensions
  ): Dimensions {
    const { width, height, position } = ratio
    const {
      width: baseWidth,
      height: baseHeight,
      position: basePosition,
    } = targetDimension

    return new Dimensions(
      roundUp(width * baseWidth),
      roundUp(height * baseHeight),
      new Vector2D(
        round(position.x * baseWidth + basePosition.x, 0),
        round(position.y * baseHeight + basePosition.y, 0)
      )
    )
  }

  /** Calculates ratio of dimensions
   * @param dimensionsA First dimensions (as denominator)
   * @param dimensionsB Second dimensions (as numerator)
   * @returns Ratio of dimensions
   */
  public static getRatio(
    dimensionsA: Dimensions,
    dimensionsB: Dimensions
  ): Dimensions {
    const { width, height, position } = dimensionsA
    const { width: baseWidth, height: baseHeight } = dimensionsB

    return new Dimensions(
      width / baseWidth,
      height / baseHeight,
      new Vector2D(position.x / baseWidth, position.y / baseHeight)
    )
  }

  //  ==================== PUBLIC METHODS ==================== //

  /** Align object relative to canvas
   * @param positionX Relative position on x axis
   * @param positionY Relative position on y axis
   */
  public align(
    positionX: RelativePositionX,
    positionY: RelativePositionY,
    targetDimension: Dimensions
  ): void {
    const orientedWidth = targetDimension.width
    const orientedHeight = targetDimension.height
    let updatedX = this.position.x
    let updatedY = this.position.y

    if (positionX === 'left') {
      updatedX = 0
    } else if (positionX === 'center') {
      updatedX = (orientedWidth - this.width) / 2
    } else if (positionX === 'right') {
      updatedX = orientedWidth - this.width
    }

    if (positionY === 'top') {
      updatedY = 0
    } else if (positionY === 'center') {
      updatedY = (orientedHeight - this.height) / 2
    } else if (positionY === 'bottom') {
      updatedY = orientedHeight - this.height
    }

    this.position.update(updatedX, updatedY)
  }
}

export default Dimensions
