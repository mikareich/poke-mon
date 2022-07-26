import type { Options } from './Asset'

/**
 * Creates an audio from a source
 * @param src Audio source
 * @param options Audio options
 */
async function createAudio(
  src: string,
  options: Options = {}
): Promise<HTMLAudioElement> {
  const audio = document.createElement('audio')
  audio.src = src

  Object.entries(options).forEach(([attribute, value]) =>
    audio.setAttribute(attribute, value)
  )

  return new Promise((resolve, reject) => {
    audio.onload = (): void => resolve(audio)
    audio.onerror = (): void => reject(new Error(`Could not load audio ${src}`))
  })
}

export default createAudio
