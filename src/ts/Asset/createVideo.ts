import type { Options } from './Asset'

/**
 * Creates an video from a source
 * @param src Video source
 * @param options Video options
 */
async function createVideo(
  src: string,
  options: Options = {}
): Promise<HTMLVideoElement> {
  const video = document.createElement('video')
  video.src = src

  Object.entries(options).forEach(([attribute, value]) =>
    video.setAttribute(attribute, value)
  )

  return new Promise((resolve, reject) => {
    video.onload = (): void => resolve(video)
    video.onerror = (): void => reject(new Error(`Could not load video ${src}`))
  })
}

export default createVideo
