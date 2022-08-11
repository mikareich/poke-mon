// FIX: loading problem with waves

import type { State } from '@/Sprite/interfaces'

import Location from './Location'

import Asset from '@/Asset'
import { Vector2D } from '@/Dimensions'
import Renderer, { RenderCollection, RenderObject } from '@/Renderer'
import Sprite, { SpriteAnimation } from '@/Sprite'
import { roundOff, roundUp } from '@/Utils/round'

class Sea extends Location {
  constructor() {
    super(
      Renderer.CONFIG.ORIENTED_WIDTH,
      Renderer.CONFIG.ORIENTED_HEIGHT,
      new Vector2D(0, 0)
    )
    this.accessible = false

    // create background
    const waveCollection = new RenderCollection(
      Renderer.CONFIG.ORIENTED_WIDTH,
      Renderer.CONFIG.ORIENTED_HEIGHT,
      new Vector2D(0, 0)
    )
    waveCollection.isRelative = true

    const waveBackground = new RenderObject(
      waveCollection.width,
      waveCollection.height,
      new Vector2D(0, 0),
      {
        color: '#67E6D2',
      }
    )
    waveBackground.isRelative = true
    waveCollection.add(waveBackground)

    // add waves
    const waveAsset = new Asset('image', '/images/waves.png', {
      height: '72',
      width: '72',
    })

    const waveWidth = 72
    const waveHeight = 72

    const waveRows = roundUp(Renderer.CONFIG.ORIENTED_WIDTH / waveWidth)
    const waveCols = roundUp(Renderer.CONFIG.ORIENTED_HEIGHT / waveHeight)

    const createWaveState = (index: number): State => ({
      height: 36,
      image: waveAsset,
      name: `wave_${index}`,
      position: new Vector2D((index % 2) * 36, Math.floor(index / 2) * 36),
      width: 36,
    })

    const waves = []
    for (let i = 0; i < 4; i += 1) {
      const wave = createWaveState(i)
      waves.push(wave)
    }

    for (let i = 0; i < waveRows * waveCols; i += 1) {
      // create animation
      const animation = new SpriteAnimation('waves', waves)
      animation.infinite = true
      animation.ticks = 2

      // create sprite
      const sprite = new Sprite(waves)

      const position = new Vector2D(
        roundUp(i % waveRows) * waveWidth,
        roundOff(i / waveRows) * waveHeight
      )
      const wave = new RenderObject(waveWidth, waveHeight, position, {
        sprite,
      })
      wave.isRelative = true
      wave.addAnimation(animation)

      const randomStateIndex = Math.floor(Math.random() * waves.length)
      sprite?.setCurrentState(sprite.states[randomStateIndex].name)

      if (wave.currentAnimation)
        wave.currentAnimation.stateIndex = randomStateIndex
      wave.useAnimation('waves')

      waveCollection.add(wave)
    }

    this.setBackground(waveCollection)
  }
}

export default Sea
