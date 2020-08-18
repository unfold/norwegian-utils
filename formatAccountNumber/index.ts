const ACCOUNT_CHUNKS = [4, 2, 5]

export default (accountNumber: string) => {
  if (!accountNumber) return ''

  accountNumber = accountNumber.replace(/[\s.]+/g, '')
  let result = ''
  let part
  let rest

  ACCOUNT_CHUNKS.forEach((length, index) => {
    if (accountNumber.length) {
      part = accountNumber.slice(0, length)
      rest = accountNumber.slice(length)
      result += part
      accountNumber = rest
      if (index < 2) result += '\u00a0'
    }
  })
  return result.trim()
}
