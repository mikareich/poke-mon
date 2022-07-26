import Asset from '../Asset'

import Sprite from './Sprite'
import SpriteAnimation from './SpriteAnimation'

// create assets

const assetRight = new Asset('image', '/images/playerRight.png', {
  height: '68',
  width: '192',
})

const assetLeft = new Asset('image', '/images/playerLeft.png', {
  height: '68',
  width: '192',
})

const assetUp = new Asset('image', '/images/playerUp.png', {
  height: '68',
  width: '192',
})

const assetDown = new Asset('image', '/images/playerDown.png', {
  height: '68',
  width: '192',
})

// create states
const rightSprite = Sprite.createHorizontalStates(
  'right',
  assetRight,
  192,
  68,
  4
)
const leftSprite = Sprite.createHorizontalStates('left', assetLeft, 192, 68, 4)
const upSprite = Sprite.createHorizontalStates('up', assetUp, 192, 68, 4)
const downSprite = Sprite.createHorizontalStates('down', assetDown, 192, 68, 4)

// create sprite
const characterSprite = new Sprite([
  ...rightSprite,
  ...leftSprite,
  ...upSprite,
  ...downSprite,
])

// create animations
export const runningRightAnimation = new SpriteAnimation(
  'runningRight',
  rightSprite
)
runningRightAnimation.infinite = true
runningRightAnimation.ticks = 10

export const runningLeftAnimation = new SpriteAnimation(
  'runningLeft',
  leftSprite
)
runningLeftAnimation.infinite = true
runningLeftAnimation.ticks = 10

export const runningUpAnimation = new SpriteAnimation('runningUp', upSprite)
runningUpAnimation.infinite = true
runningUpAnimation.ticks = 10

export const runningDownAnimation = new SpriteAnimation(
  'runningDown',
  downSprite
)
runningDownAnimation.infinite = true
runningDownAnimation.ticks = 10

export default characterSprite
