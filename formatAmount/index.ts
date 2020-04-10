export default (amount: number, options: { decimals?: boolean; alwaysNegative?: boolean } = {}) => {
  const fractionDigits = options.decimals === undefined || options.decimals === true ? 2 : 0
  if (options.alwaysNegative === true && Math.round(amount) !== 0) {
    amount = -Math.abs(amount)
  }

  return amount.toLocaleString('nb-NO', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}
