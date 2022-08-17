import type Renderable from './Renderable'
import type Renderer from './Renderer'
import type { Transform } from '@/interfaces'

import { Vector2D } from '@/Dimensions'

class Camera {
  // ==================== PUBLIC PROPERTIES ==================== //
  /** Dedicated render instance */
  public renderer: Renderer | undefined

  /** Position of the camera */
  public target: Renderable | undefined

  /** Zoom level */
  public zoom: number = 1

  // ==================== PUBLIC METHODS ==================== //

  public createTransform(): Transform {
    if (!this.renderer) throw new Error('Renderer not set')

    const scale = this.zoom
    const shift = new Vector2D(0, 0)

    // um die differenz zwischen mittelpunkt von target und mittelpunkt von canvas shiften
    if (this.target && this.renderer) {
      const targetDimensions = this.target.getAbsoluteDimensions({
        scale,
        shift,
      })
      const mTarget = new Vector2D(
        targetDimensions.position.x + targetDimensions.width / 2,
        targetDimensions.position.y + targetDimensions.height / 2
      )

      const mCanvas = new Vector2D(
        this.renderer!.width / 2,
        this.renderer!.height / 2
      )

      shift.update(
        (mCanvas.x - mTarget.x) / scale,
        (mCanvas.y - mTarget.y) / scale
      )
    }

    return {
      scale,
      shift,
    }
  }

  /** Initialize renderer */
  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer
  }
}

export default Camera
