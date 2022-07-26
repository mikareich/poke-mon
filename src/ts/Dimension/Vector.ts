/** A vector in a two-dimensional coordinate system */
class Vector2D {
  /** The x coordinate */
  private _x: number

  /** The y coordinate */
  private _y: number

  /**
   * Creates a new vector
   * @param x The x coordinate of the vector
   * @param y The y coordinate of the vector
   */
  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  /** The x coordinate */
  public get x(): number {
    return this._x
  }

  /** The y coordinate */
  public get y(): number {
    return this._y
  }

  /** Updates the vector */
  public update(x: number, y: number): void {
    this._x = x
    this._y = y
  }
}

export default Vector2D
