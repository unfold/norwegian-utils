export default (accountNumber: string): string => {
  if (!accountNumber) return ''

  // Remove all non-numbers
  const split = accountNumber.match(/\+?\d*/g)?.join('')
  if (!split) return accountNumber

  // First 3 numbers, then X numbers, then 5 numbers
  const matches = split.match(/(\d{4})(\d*)(\d{5})/)
  if (matches && matches.length > 0) {
    if (matches[2]) {
      return matches.slice(1).join('\u00a0')
    }
  }

  return split
}
