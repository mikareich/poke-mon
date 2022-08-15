/* eslint-disable */
import Vector2D from './Vector'

import { round, roundUp } from '@/Utils/round'
import { Transform } from '@/interfaces'

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
  /**
   * Transforms dimensions by a scale factor and a position
   * @param dimensions Dimensions to scale
   * @param transform Transform to apply
   */
  public static transform(
    dimensions: Dimensions,
    transform: Transform
  ): Dimensions {
    const { width, height } = Dimensions.scale(dimensions, transform.scale)

    return new Dimensions(
      width,
      height,
      Vector2D.transform(dimensions.position, transform)
    )
  }

  /** Scales dimension by specific multiplier */
  public static scale(dimensions: Dimensions, multiplier: number): Dimensions {
    const { width, height } = dimensions

    return new Dimensions(
      round(width * multiplier, 0),
      round(height * multiplier, 0),
      dimensions.position
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
