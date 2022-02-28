export default (organizationNumber: string) => {
  /* https://no.wikipedia.org/wiki/MOD11 */
  const weights = [3, 2, 7, 6, 5, 4, 3, 2]
  const organizationNumberWithoutSpacesAndPeriods = organizationNumber.replace(/[\s.]+/g, '')
  if (organizationNumberWithoutSpacesAndPeriods.length !== 9) {
    return false
  } else {
    const controlDigit = parseInt(organizationNumberWithoutSpacesAndPeriods.charAt(8), 10)
    const organizationNumberWithoutControlDigit = organizationNumberWithoutSpacesAndPeriods.substring(0, 8)
    let sum = 0
    for (let index = 0; index < 8; index++) {
      sum += parseInt(organizationNumberWithoutControlDigit.charAt(index), 10) * weights[index]
    }
    const reminder = sum % 11
    return controlDigit === (reminder === 0 ? 0 : 11 - reminder)
  }
}
