import type { Options } from './Asset'

/**
 * Creates an image from a source
 * @param src Image source
 * @param options Image options
 */
async function createImage(
  src: string,
  options: Options = {}
): Promise<HTMLImageElement> {
  const image = new Image()
  image.src = src

  Object.entries(options).forEach(([attribute, value]) =>
    image.setAttribute(attribute, value)
  )

  return new Promise((resolve, reject) => {
    image.onload = (): void => resolve(image)
    image.onerror = (): void => reject(new Error(`Could not load image ${src}`))
  })
}

export default createImage
