import '../scss/index.scss'

import { FPS } from '@/constants'
import Vector2D from '@/Dimension/Vector'
import Renderer, { RenderObject } from '@/Renderer'
import { SingleSprite } from '@/Sprite'
import characterSprite, {
  runningDownAnimation,
  runningLeftAnimation,
  runningRightAnimation,
  runningUpAnimation,
} from '@/Sprite/characterSprite'

const gameScreenCANVAS = <HTMLCanvasElement>(
  document.getElementById('gameScreen')!
)
const renderer = new Renderer(gameScreenCANVAS)

async function init(): Promise<void> {
  // create character
  const character = new RenderObject(18, 24, new Vector2D(0, 0), {
    sprite: characterSprite,
  })
  character.isRelative = true
  character.align('center', 'center', renderer.renderCollection)

  // load animations and select one
  character.addAnimation(runningRightAnimation)
  character.addAnimation(runningLeftAnimation)
  character.addAnimation(runningUpAnimation)
  character.addAnimation(runningDownAnimation)
  character.useAnimation('runningLeft')

  // create bg
  const background = new RenderObject(
    1050,
    600,
    new Vector2D(0, 0),
    {
      sprite: new SingleSprite('/images/map.png', 3360, 1920),
    },
    'background'
  )
  background.align('center', 'center', renderer.renderCollection)
  background.isRelative = true

  await renderer.renderCollection.add(background, character)
}

init()

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
