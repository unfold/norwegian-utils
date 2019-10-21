import { formatPhoneNumberForAuthentication, isValidPhoneNumber, prettyFormatPhoneNumber } from './formatPhoneNumber'

describe('test phoneNumber module', () => {
  it('should validate phone numbers', () => {
    // norwegian
    expect(isValidPhoneNumber('94099781')).toBe(true)
    expect(isValidPhoneNumber('940-99-781')).toBe(true)
    expect(isValidPhoneNumber('47 940 99 781')).toBe(true)
    expect(isValidPhoneNumber('4794099781')).toBe(true)
    expect(isValidPhoneNumber('00 47 940 99 781')).toBe(true)
    expect(isValidPhoneNumber('004794099781')).toBe(true)
    expect(isValidPhoneNumber('+4794099781')).toBe(true)

    // valid norwegian numbers starts with 47
    expect(isValidPhoneNumber('+4747282690')).toBe(true)
    expect(isValidPhoneNumber('004747282690')).toBe(true)
    expect(isValidPhoneNumber('47282690')).toBe(true)

    // international - must have + or 00
    expect(isValidPhoneNumber('+48 781 296 647')).toBe(true)
    expect(isValidPhoneNumber('0048 781-296-647')).toBe(true)

    // https://www.quora.com/What-is-maximum-and-minimum-length-of-any-mobile-number-across-the-world
    expect(isValidPhoneNumber('+290 1234')).toBe(true)
    expect(isValidPhoneNumber('00290 1234')).toBe(true)
  })

  it('should NOT validate phone numbers', () => {
    // starts from +47, but not norwegian
    expect(isValidPhoneNumber('+47940997')).toBe(false) // too short
    expect(isValidPhoneNumber('+47940997810')).toBe(false) // too long
    expect(isValidPhoneNumber('+479409978')).toBe(false) // too short
    expect(isValidPhoneNumber('0047940997810')).toBe(false) // too long
    expect(isValidPhoneNumber('00479409978')).toBe(false) // too short
    expect(isValidPhoneNumber('47940997810')).toBe(false) // too long
    expect(isValidPhoneNumber('479409978')).toBe(false) // too short

    // international - must have + or 00
    expect(isValidPhoneNumber('48 781 296 647')).toBe(false)
    expect(isValidPhoneNumber('+290 123')).toBe(false) // too short
    expect(isValidPhoneNumber('00290 123')).toBe(false) // too short
    expect(isValidPhoneNumber('00 48 12345678901234')).toBe(false) // too long
  })

  it('should format for auth', () => {
    // norwegian
    expect(formatPhoneNumberForAuthentication('94099781')).toBe('+4794099781')
    expect(formatPhoneNumberForAuthentication('940-99-781')).toBe('+4794099781')
    expect(formatPhoneNumberForAuthentication('4794099781')).toBe('+4794099781')
    expect(formatPhoneNumberForAuthentication('47 940-99-781')).toBe('+4794099781')
    expect(formatPhoneNumberForAuthentication('004794099781')).toBe('+4794099781')
    expect(formatPhoneNumberForAuthentication('00 47 940 99 781')).toBe('+4794099781')
    expect(formatPhoneNumberForAuthentication('+4794099781')).toBe('+4794099781')

    expect(formatPhoneNumberForAuthentication('+4747282690')).toBe('+4747282690')
    expect(formatPhoneNumberForAuthentication('004747282690')).toBe('+4747282690')
    expect(formatPhoneNumberForAuthentication('47282690')).toBe('+4747282690')

    // international
    expect(formatPhoneNumberForAuthentication('+48 781 296 647')).toBe('+48781296647')
    expect(formatPhoneNumberForAuthentication('0048 781-296-647')).toBe('+48781296647')
    expect(formatPhoneNumberForAuthentication('+290 1234')).toBe('+2901234')
    expect(formatPhoneNumberForAuthentication('00290 1234')).toBe('+2901234')

    // not valid
    expect(formatPhoneNumberForAuthentication('479409')).toBe(undefined)

    // Back and forth
    expect(formatPhoneNumberForAuthentication(prettyFormatPhoneNumber('+4794099781'))).toBe('+4794099781')
  })

  it('should pretty format Norwegian number', () => {
    // norwegian
    expect(prettyFormatPhoneNumber('94099781')).toBe('940\u00a099\u00a0781')
    expect(prettyFormatPhoneNumber('940-99-781')).toBe('940\u00a099\u00a0781')
    expect(prettyFormatPhoneNumber('4794099781')).toBe('940\u00a099\u00a0781')
    expect(prettyFormatPhoneNumber('47 940-99-781')).toBe('940\u00a099\u00a0781')
    expect(prettyFormatPhoneNumber('004794099781')).toBe('940\u00a099\u00a0781')
    expect(prettyFormatPhoneNumber('00 47 940 99 781')).toBe('940\u00a099\u00a0781')
    expect(prettyFormatPhoneNumber('+4794099781')).toBe('940\u00a099\u00a0781')

    expect(prettyFormatPhoneNumber('+4747282690')).toBe('472\u00a082\u00a0690')
    expect(prettyFormatPhoneNumber('004747282690')).toBe('472\u00a082\u00a0690')
    expect(prettyFormatPhoneNumber('47282690')).toBe('472\u00a082\u00a0690')

    // not valid Norwegian number, no formatting applied
    expect(prettyFormatPhoneNumber('4794099')).toBe('4794099')
  })

  it('should pretty format international number', () => {
    // international
    expect(prettyFormatPhoneNumber('+48 781 296 647')).toBe('+48\u00a078\u00a012\u00a096\u00a0647')
    expect(prettyFormatPhoneNumber('0048 781-296-647')).toBe('+48\u00a078\u00a012\u00a096\u00a0647')
    expect(prettyFormatPhoneNumber('+290 1234')).toBe('+29\u00a001\u00a0234')
    expect(prettyFormatPhoneNumber('00290 1234')).toBe('+29\u00a001\u00a0234')
  })
})
