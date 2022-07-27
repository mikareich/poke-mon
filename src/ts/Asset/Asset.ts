import createAudio from './createAudio'
import createImage from './createImage'
import createVideo from './createVideo'

export interface Options {
  [optionAttribute: string]: string
}

type AssetType = 'image' | 'audio' | 'video'

type LoadedAsset = HTMLImageElement | HTMLAudioElement | HTMLVideoElement

class Asset {
  // ==================== PRIVATE STATIC PROPERTIES ==================== //

  // eslint-disable-next-line no-use-before-define
  private static createdAssets: Asset[] = []

  //  ==================== PUBLIC PROPERTIES ==================== //

  /** Loaded asset */
  public asset: LoadedAsset | undefined

  /** Indicates whether asset is loaded or not */
  public loaded: boolean = false

  /** Options of the asset */
  public readonly options: Options

  /** Source of the asset */
  public readonly src: string

  /** Type of the asset */
  public readonly type: AssetType

  constructor(type: AssetType, src: string, options?: Options) {
    this.type = type
    this.src = src
    this.options = options || {}

    const loadedAsset = Asset.getAsset(type, src, options)
    if (loadedAsset) {
      this.loaded = true
      this.asset = loadedAsset.asset
    }
  }

  // ==================== PRIVATE STATIC METHODS ==================== //

  /** Returns asset if it's already created */
  private static getAsset(
    type: AssetType,
    src: string,
    options?: Options
  ): Asset | undefined {
    return this.createdAssets.find(
      (asset) =>
        asset.type === type && asset.src === src && asset.options === options
    )
  }

  /** Loads asset and returns html element */
  public async loadAsset(): Promise<LoadedAsset> {
    let asset
    switch (this.type) {
      case 'image':
        asset = await createImage(this.src, this.options)
        break
      case 'audio':
        asset = await createAudio(this.src, this.options)
        break
      case 'video':
        asset = await createVideo(this.src, this.options)
        break
      default:
        throw new Error(`Unknown asset type ${this.type}`)
    }

    this.loaded = true
    this.asset = asset

    return asset
  }
}

export default Asset
