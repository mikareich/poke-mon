import type { Transform } from '@/interfaces'

import { round } from '@/Utils/round'

/** A vector in a two-dimensional coordinate system */
class Vector2D {
  // ==================== PRIVAT PROPERTIES ==================== //

  /** The x coordinate */
  private _x: number

  /** The y coordinate */
  private _y: number

  // ==================== CONSTRUCTOR ==================== //

  /**
   * Creates a new vector
   * @param x The x coordinate of the vector
   * @param y The y coordinate of the vector
   */
  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  //  ==================== PUBLIC GETTERS ==================== //

  /** The x coordinate */
  public get x(): number {
    return this._x
  }

  /** The y coordinate */
  public get y(): number {
    return this._y
  }

  // ==================== PUBLIC STATIC METHODS ==================== //

  /** Scales vector by specific multiplier  */
  public static scale(vector: Vector2D, multiplier: number): Vector2D {
    return new Vector2D(
      round(vector.x * multiplier, 0),
      round(vector.y * multiplier, 0)
    )
  }

  /** Shifts vector by specific amount */
  public static shift(vector: Vector2D, amount: Vector2D): Vector2D {
    return new Vector2D(
      round(vector.x + amount.x, 0),
      round(vector.y + amount.y, 0)
    )
  }

  /** Transforms vector */
  public static transform(vector: Vector2D, transform: Transform): Vector2D {
    const { scale, shift } = transform
    return Vector2D.scale(Vector2D.shift(vector, shift), scale)
  }

  // ==================== PUBLIC METHODS ==================== //

  /** Updates the vector */
  public update(x: number, y: number): void {
    this._x = x
    this._y = y
  }
}

export default Vector2D
