export default (accountNumber: string) => {
  /* https://no.wikipedia.org/wiki/MOD11 */
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  const accountNumberWithoutSpacesAndPeriods = accountNumber.replace(/[\s.]+/g, '')
  if (accountNumberWithoutSpacesAndPeriods.length !== 11) {
    return false
  } else {
    const controlDigit = parseInt(accountNumberWithoutSpacesAndPeriods.charAt(10), 10)
    const accountNumberWithoutControlDigit = accountNumberWithoutSpacesAndPeriods.substring(0, 10)
    let sum = 0
    for (let index = 0; index < 10; index++) {
      sum += parseInt(accountNumberWithoutControlDigit.charAt(index), 10) * weights[index]
    }
    const reminder = sum % 11
    return controlDigit === (reminder === 0 ? 0 : 11 - reminder)
  }
}
