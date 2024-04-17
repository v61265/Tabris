import { GPT_AD_NETWORK, GPT_UNITS, mediaSize } from '~/constants/ads'

/**
 * Generate the width of the ad's wrapper div.
 * For GPT ads, there will be three types of adSize 'fixed', 'multi', 'fluid'.
 * Since we only use 'multi' type (ex: [[300, 250], [1, 1]]),
 * the adWidth caculation will use 'multi' type caclulatin directly.
 */

type SingleSizeArray = [number, number]

export function getAdWidth(adSize: SingleSizeArray[]): string {
  const widthMax = adSize?.reduce((acc, curr) => Math.max(curr[0], acc), 0)
  return widthMax ? `${widthMax}px` : '0px'
}

function getDevice(width: number) {
  const isDesktopWidth = width >= mediaSize.xl
  return isDesktopWidth ? 'PC' : 'MB'
}

/**
 * Generate full key like 'PC_HD' if the component support dynamic device adKey like 'HD'
 */
function getAdFullKey(device: 'PC' | 'MB', adKey: string): string {
  return adKey.includes('_') ? adKey : `${device}_${adKey}`
}

interface GPTAdData {
  adUnit: string
  adSize: SingleSizeArray[]
}

/**
 * Get GPT_UNITS adData
 * @param pageKey - Key to access GPT_UNITS first layer
 * @param adKey - Key to access GPT_UNITS second layer, might need to complete with device
 * @param width - Browser width
 * @returns GPTAdData if found, otherwise undefined
 */
function getAdData(
  pageKey: string,
  adKey: string,
  width: number
): GPTAdData | undefined {
  const device = getDevice(width)
  const adFullKey = getAdFullKey(device, adKey)
  const adData = GPT_UNITS[pageKey][adFullKey]

  if (!adData) {
    console.error(
      `Unable to find the AD data. Got the pageKey "${pageKey}" and adKey "${adFullKey}". Please provide a valid pageKey or adKey.`
    )
  }

  return adData
}

/**
 * Generate adSlot params for googletag.defineSlot.
 */
export interface GPTAdSlotParam {
  adUnitPath: string
  adSize: SingleSizeArray[]
}

/**
 * Generate adSlot params for googletag.defineSlot.
 * @param pageKey - Key to access GPT_UNITS first layer
 * @param adKey - Key to access GPT_UNITS second layer, might need to complete with device
 * @param width - Browser width
 * @returns GPTAdSlotParam
 */
export function getAdSlotParam(
  pageKey: string,
  adKey: string,
  width: number
): GPTAdSlotParam | undefined {
  const adData = getAdData(pageKey, adKey, width)
  if (!adData) {
    return
  }
  const { adUnit, adSize } = adData
  const adUnitPath = getAdUnitPath(adUnit)
  return { adUnitPath, adSize }
}

/**
 * Create adSize array with size string like '970250'.
 * @param sizeString - Size string
 * @returns SingleSizeArray
 */
function createAdSize(sizeString: string): SingleSizeArray {
  return [
    parseInt(sizeString.substring(0, 3)),
    parseInt(sizeString.substring(3)),
  ]
}

/**
 * Create adSize with special adUnit string like 'mirror_RWD_2022FIFA_970250-300250_FT'.
 * @param adUnit - Special adUnit string for topic page
 * @returns SingleSizeArray[] if valid adSize found, otherwise undefined
 */
function getAdSize(adUnit: string): SingleSizeArray[] | undefined {
  const adUnitSlices = adUnit.split('_')
  let hasNan = false
  const adSize = adUnitSlices[adUnitSlices.length - 2]
    ?.split('-')
    .map((sizeString) => {
      const singleAdSize = createAdSize(sizeString)
      if (isNaN(singleAdSize[0]) || isNaN(singleAdSize[1])) {
        hasNan = true
      }
      return singleAdSize
    })

  return hasNan ? undefined : adSize
}

/**
 * Generate adUnitPath for given adUnit.
 * @param adUnit - AdUnit string
 * @returns AdUnit path
 */
function getAdUnitPath(adUnit: string): string {
  return `/${GPT_AD_NETWORK}/${adUnit}`
}

/**
 * Generate adSlot params for googletag.defineSlot.
 * Especially for custom adUnit in CMS like topic DFP field.
 * @param adUnit - AdUnit string
 * @returns GPTAdSlotParam
 */
export function getAdSlotParamByAdUnit(adUnit: string): GPTAdSlotParam {
  const adUnitPath = getAdUnitPath(adUnit)
  const adSize = getAdSize(adUnit) || []
  return { adUnitPath, adSize }
}
