import '../scss/index.scss'

import characterSprite, {
  runningRightAnimation,
} from './Sprite/characterSprite'

import { FPS } from '@/constants'
import { Vector2D } from '@/Dimensions'
import { Sea, Isle } from '@/Locations'
import Renderer, { Camera, RenderObject } from '@/Renderer'

const gameScreenCANVAS = <HTMLCanvasElement>(
  document.getElementById('gameScreen')!
)

const sea = new Sea()
const isle = new Isle()

const camera = new Camera()
const renderer = new Renderer(gameScreenCANVAS, camera)

isle.align('center', 'center', renderer.renderCollection)

const character = new RenderObject(24, 36, new Vector2D(0, 0), {
  sprite: characterSprite,
})
character.isRelative = true
character.addAnimation(runningRightAnimation)
character.useAnimation('runningRight')

character.align('center', 'center', renderer.renderCollection)

camera.target = character

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
