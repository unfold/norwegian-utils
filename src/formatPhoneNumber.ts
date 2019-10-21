export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  return !!(norwegianRegex(phoneNumber) || internationalRegex(phoneNumber))
}

export const formatPhoneNumberForAuthentication = (phoneNumber: string): string | undefined => {
  const norwegianNumber = norwegianRegex(phoneNumber)
  if (norwegianNumber) return `+47${norwegianNumber.localPart}`

  const internationalNumber = internationalRegex(phoneNumber)
  if (internationalNumber) return `+${internationalNumber.internationalPart}`

  return undefined
}

export const prettyFormatPhoneNumber = (phoneNumber: string): string => {
  let match = norwegianRegex(phoneNumber)

  if (match) {
    const localPart = match.localPart
    const firstNumber = localPart.substring(0, 1)
    // Numbers starting on 4 and 9 are mobile, and should be formatted as 444 55 666
    // Source: http://no.wikipedia.org/wiki/Nummerplan_(E.164)
    // Formatting guidance: http://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#tlf

    if (firstNumber === '4' || firstNumber === '9') {
      // Other numbers should be formatted as 12 34 56 78
      return localPart.substring(0, 3) + '\u00a0' + localPart.substring(3, 5) + '\u00a0' + localPart.substring(5)
    }

    return localPart.substring(0, 2) + '\u00a0' + localPart.substring(2, 4) + '\u00a0' + localPart.substring(4, 6) + '\u00a0' + localPart.substring(6)
  }

  const internationalNumber = internationalRegex(phoneNumber)
  if (internationalNumber) {
    return `+${splitIntoGroups(internationalNumber.internationalPart)}`
  }

  return phoneNumber
}

// Supporting method: Split into groups of 3 numbers
const splitIntoGroups = (str: string): string => {
  const split = str.match(/.{1,2}/g)
  if (split) {
    return split.slice(0, split.length - 1).join('\u00a0') + split[split.length - 1]
  }
  return ''
}

// Supporting method, matches all Norwegian phone numbers
const norwegianRegex = (phoneNumber: string): { localPart: string } | false => {
  phoneNumber = (phoneNumber + '').replace(/^\+/g, '00').replace(/\D/g, '')

  // avoid matching 8-d;igits numbers like 00123456 or +123456
  if (phoneNumber.match(/^00/) && !phoneNumber.match(/^0047/)) {
    return false
  }

  // valid numbers like +4747282690 passed as 47282690 - add country code to avoid next condition
  if (phoneNumber.match(/^47/) && phoneNumber.length === 8) {
    phoneNumber = `47${phoneNumber}`
  }

  // avoid 8-digits numbers starting with 47
  if (phoneNumber.match(/^47/) && phoneNumber.length !== 10) {
    return false
  }

  const groups = phoneNumber.match(/^((0047)|(47))?([0-9]{8})$/)
  if (groups) {
    return {
      localPart: groups[4],
    }
  }

  return false
}

// Supporting method, matches all possible phone numbers
const internationalRegex = (phoneNumber: string): { internationalPart: string } | false => {
  phoneNumber = (phoneNumber + '').replace(/^\+/g, '00').replace(/\D/g, '')

  // exclude norwegian numbers here
  if (phoneNumber.match(/^0047/) || phoneNumber.match(/^47/)) {
    return false
  }

  const groups = phoneNumber.match(/^(00)([0-9]{7,15})$/)
  if (groups) {
    return {
      internationalPart: groups[2],
    }
  }

  return false
}
