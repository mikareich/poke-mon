import type { State } from '@/Sprite/interfaces'

import Location from '../Location'

import Asset from '@/Asset'
import { Vector2D } from '@/Dimensions'
import Renderer, { RenderCollection, RenderObject } from '@/Renderer'
import Sprite, { SpriteAnimation } from '@/Sprite'

const Sea = new Location(
  Renderer.CONFIG.ORIENTED_WIDTH,
  Renderer.CONFIG.ORIENTED_HEIGHT,
  new Vector2D(0, 0)
)

const seaAsset = new Asset('image', '/images/sea.png', {
  height: '72',
  width: '36',
})
const waveWidth = 36
const waveHeight = 36
const waves: State[] = [
  {
    height: waveHeight,
    image: seaAsset,
    name: 'wave_0',
    position: new Vector2D(0, 0),
    width: waveWidth,
  },
  {
    height: waveHeight,
    image: seaAsset,
    name: 'wave_1',
    position: new Vector2D(37, 0),
    width: waveWidth,
  },
]

const bg = new RenderCollection(
  Renderer.CONFIG.ORIENTED_WIDTH,
  Renderer.CONFIG.ORIENTED_HEIGHT,
  new Vector2D(0, 0)
)
bg.isRelative = true

const seaRows = Math.ceil(Renderer.CONFIG.ORIENTED_WIDTH / 36)
const seaCols = Math.ceil(Renderer.CONFIG.ORIENTED_HEIGHT / 36)

for (let i = 0; i < seaRows * seaCols; i += 1) {
  const seaAnimation = new SpriteAnimation('waves', waves)
  seaAnimation.infinite = true
  seaAnimation.ticks = 5
  const SeaSprite = new Sprite(waves)

  const position = new Vector2D(
    Math.ceil(i % seaRows) * waveWidth,
    Math.floor(i / seaRows) * waveHeight
  )
  const wave = new RenderObject(waveWidth, waveHeight, position, {
    sprite: SeaSprite,
  })
  wave.isRelative = true
  wave.addAnimation(seaAnimation)
  wave.useAnimation('waves')

  bg.add(wave)
}

Sea.setBackground(bg)

export default Sea
