import type { State } from '@/Sprite/interfaces'

import Location from './Location'

import Asset from '@/Asset'
import { Vector2D } from '@/Dimensions'
import { RenderObject } from '@/Renderer'
import Sprite, { SpriteAnimation } from '@/Sprite'
import { round } from '@/Utils/round'

class Forest extends Location {
  public static readonly CONFIG = {
    TREE_SIZES: [
      [40, 48],
      [60, 69],
      [80, 96],
    ],
  }

  constructor(
    width: number,
    height: number,
    postion: Vector2D,
    numberOfTrees: number
  ) {
    super(width, height, postion)

    // add trees
    const trees: RenderObject[] = []

    for (let i = 0; i < numberOfTrees; i += 1) {
      const tree = Forest.createTree()
      tree.position = new Vector2D(
        round(Math.random() * (width - tree.width), 0),
        round(Math.random() * (height - tree.height), 0)
      )
      tree.isRelative = true
      trees.push(tree)
    }

    // sort trees by y position
    trees.sort((a, b) => a.position.y + a.height - b.position.y - b.height)

    this.addToBackground(...trees)
  }

  private static createTree(): RenderObject {
    // get random tree size
    const [width, height] =
      Forest.CONFIG.TREE_SIZES[
        Math.floor(Math.random() * Forest.CONFIG.TREE_SIZES.length)
      ]

    const asset = new Asset('image', '/images/big-tree.png', {
      height: height.toString(),
      width: width.toString(),
    })

    const states: State[] = [
      {
        height: 48,
        image: asset,
        name: 'bigTree_0',
        position: new Vector2D(1, 1),
        width: 46,
      },
      {
        height: 48,
        image: asset,
        name: 'bigTree_1',
        position: new Vector2D(48, 1),
        width: 46,
      },
      {
        height: 48,
        image: asset,
        name: 'bigTree_2',
        position: new Vector2D(1, 50),
        width: 46,
      },
      {
        height: 48,
        image: asset,
        name: 'bigTree_3',
        position: new Vector2D(48, 50),
        width: 46,
      },
    ]
    const sprite = new Sprite(states)
    const animation = new SpriteAnimation('moving', states)
    animation.infinite = true
    animation.ticks = 10

    const tree = new RenderObject(width, height, new Vector2D(0, 0), {
      sprite,
    })
    tree.addAnimation(animation)
    tree.useAnimation('moving')

    // select random state
    const randomStateIndex = Math.floor(Math.random() * states.length)

    if (tree.currentAnimation)
      tree.currentAnimation.stateIndex = randomStateIndex

    return tree
  }
}

export default Forest
