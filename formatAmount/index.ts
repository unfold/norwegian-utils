const hasNorwegian =
  Intl && Intl.NumberFormat && Intl.NumberFormat.supportedLocalesOf && Intl.NumberFormat.supportedLocalesOf(['nb-NO']).indexOf('nb-NO') !== -1

export default (amount: number, options: { decimals?: boolean; alwaysNegative?: boolean } = {}) => {
  const fractionDigits = options.decimals === undefined || options.decimals === true ? 2 : 0
  if (options.alwaysNegative === true && Math.round(amount) !== 0) {
    amount = -Math.abs(amount)
  }

  /*17.08.21: Bug in chrome making norwegian locale not available. 
  Adding polyfills broke login, so let's temporarily (tm) use swedish locale here, which is not broken.
  https://gitmemory.com/issue/formatjs/formatjs/3066/888110768
  */

  const localeString = hasNorwegian ? 'nb-NO' : 'sv-SE'

  return amount.toLocaleString(localeString, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}
