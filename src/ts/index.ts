import '../scss/index.scss'
import { GAME_SCREEN_RATIO } from './constants'

const gameScreenCANVAS = <HTMLCanvasElement>document.getElementById('gameScreen')!

// set width and height of canvas to fill the screen
const width = window.innerWidth
const height = width * GAME_SCREEN_RATIO
gameScreenCANVAS.width = window.innerWidth
gameScreenCANVAS.height = height
