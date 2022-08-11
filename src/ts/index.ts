import '../scss/index.scss'

import { FPS } from '@/constants'
import { Vector2D } from '@/Dimensions'
import { Sea, Isle } from '@/Locations'
import Renderer, { RenderObject } from '@/Renderer'
import characterSprite, {
  runningRightAnimation,
} from '@/Sprite/characterSprite'

const gameScreenCANVAS = <HTMLCanvasElement>(
  document.getElementById('gameScreen')!
)

const renderer = new Renderer(gameScreenCANVAS)

const sea = new Sea()
const isle = new Isle()
isle.align('center', 'center', renderer.renderCollection)

const character = new RenderObject(36, 48, new Vector2D(0, 0), {
  sprite: characterSprite,
})
character.isRelative = true
character.addAnimation(runningRightAnimation)
character.useAnimation('runningRight')
character.align('center', 'center', renderer.renderCollection)

renderer.renderCollection.add(sea.background, isle.background, character)

let lastTime = 0
function gameLoop(timestamp: number): void {
  const deltaTime = timestamp - lastTime

  if (deltaTime > 1000 / FPS) {
    renderer.render()
    lastTime = timestamp
  }
  requestAnimationFrame(gameLoop)
}

gameLoop(0)
