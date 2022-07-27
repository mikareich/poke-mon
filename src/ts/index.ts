import '../scss/index.scss'

import { FPS } from '@/constants'
import Renderer /* ,{ RenderObject } */ from '@/Renderer'
import Sea from '@/Scene/Locations/Sea'

const gameScreenCANVAS = <HTMLCanvasElement>(
  document.getElementById('gameScreen')!
)
const renderer = new Renderer(gameScreenCANVAS)

async function init(): Promise<void> {
  await renderer.renderCollection.add(...Sea.background)

  console.log(renderer.renderData[0].width, renderer.renderData[0].height)
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
