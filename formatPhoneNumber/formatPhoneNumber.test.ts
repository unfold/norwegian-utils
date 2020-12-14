import { shortFormatPhoneNumber, isValidPhoneNumber, prettyFormatPhoneNumber, isNorwegianPhoneNumber, isNorwegianMobilePhoneNumber } from './'

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

  it('should format for database or comparison', () => {
    // norwegian
    expect(shortFormatPhoneNumber('94099781')).toBe('+4794099781')
    expect(shortFormatPhoneNumber('940-99-781')).toBe('+4794099781')
    expect(shortFormatPhoneNumber('4794099781')).toBe('+4794099781')
    expect(shortFormatPhoneNumber('47 940-99-781')).toBe('+4794099781')
    expect(shortFormatPhoneNumber('004794099781')).toBe('+4794099781')
    expect(shortFormatPhoneNumber('00 47 940 99 781')).toBe('+4794099781')
    expect(shortFormatPhoneNumber('+4794099781')).toBe('+4794099781')

    expect(shortFormatPhoneNumber('+4747282690')).toBe('+4747282690')
    expect(shortFormatPhoneNumber('004747282690')).toBe('+4747282690')
    expect(shortFormatPhoneNumber('47282690')).toBe('+4747282690')

    // international
    expect(shortFormatPhoneNumber('+48 781 296 647')).toBe('+48781296647')
    expect(shortFormatPhoneNumber('0048 781-296-647')).toBe('+48781296647')
    expect(shortFormatPhoneNumber('+290 1234')).toBe('+2901234')
    expect(shortFormatPhoneNumber('00290 1234')).toBe('+2901234')

    // not valid
    expect(shortFormatPhoneNumber('479409')).toBe('479409')

    // Back and forth
    expect(shortFormatPhoneNumber(prettyFormatPhoneNumber('+4794099781'))).toBe('+4794099781')
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

  it('should validate norwegian numbers', () => {
    // norwegian
    expect(isNorwegianPhoneNumber('94099781')).toBe(true)
    expect(isNorwegianPhoneNumber('940-99-781')).toBe(true)
    expect(isNorwegianPhoneNumber('4794099781')).toBe(true)
    expect(isNorwegianPhoneNumber('47 940-99-781')).toBe(true)
    expect(isNorwegianPhoneNumber('004794099781')).toBe(true)
    expect(isNorwegianPhoneNumber('+48 781 296 647')).toBe(false)
    expect(isNorwegianPhoneNumber('0048 781-296-647')).toBe(false)
    expect(isNorwegianPhoneNumber('+290 1234')).toBe(false)
    expect(isNorwegianPhoneNumber('00290 1234')).toBe(false)

    expect(isNorwegianPhoneNumber('112')).toBe(false) // too short
    expect(isNorwegianPhoneNumber('4794099')).toBe(false) // too short
    expect(isNorwegianPhoneNumber('479409911')).toBe(false) // too long
    expect(isNorwegianPhoneNumber('47940997811')).toBe(false) // too long
    expect(isNorwegianPhoneNumber('+47940997811')).toBe(false) // too long

    expect(isNorwegianPhoneNumber('+48 781 296 647')).toBe(false)
    expect(isNorwegianPhoneNumber('0048 781-296-647')).toBe(false)
    expect(isNorwegianPhoneNumber('+290 1234')).toBe(false)
    expect(isNorwegianPhoneNumber('00290 1234')).toBe(false)

    // M2M traffic
    expect(isNorwegianPhoneNumber('+47581234567890')).toBe(true)
    expect(isNorwegianPhoneNumber('+47591234567890')).toBe(false) // M2M, but 59x
  })

  it('should validate norwegian mobile phone numbers', () => {
    // valid mobile phones
    expect(isNorwegianMobilePhoneNumber('94099781')).toBe(true)
    expect(isNorwegianMobilePhoneNumber('+4794099781')).toBe(true)
    expect(isNorwegianMobilePhoneNumber('44099781')).toBe(true)
    expect(isNorwegianMobilePhoneNumber('+4744099781')).toBe(true)

    // mobile, but not Norwegian
    expect(isNorwegianMobilePhoneNumber('+48781296647')).toBe(false)
    expect(isNorwegianMobilePhoneNumber('781296647')).toBe(false)

    // not valid numbers
    expect(isNorwegianMobilePhoneNumber('1234')).toBe(false)
    expect(isNorwegianMobilePhoneNumber('+47940997811')).toBe(false)

    // Norwegian, but not mobile
    expect(isNorwegianPhoneNumber('22162935')).toBe(true)
    expect(isNorwegianPhoneNumber('+4722162935')).toBe(true)
    expect(isNorwegianMobilePhoneNumber('22162935')).toBe(false)
    expect(isNorwegianMobilePhoneNumber('+4722162935')).toBe(false)

    // M2M traffic - 12 digits
    expect(isNorwegianMobilePhoneNumber('+47581234567890')).toBe(false)
    expect(isNorwegianMobilePhoneNumber('+47581234567890', true)).toBe(true)

    // M2M traffic - 8 digits
    expect(isNorwegianMobilePhoneNumber('+4759123456')).toBe(false)
    expect(isNorwegianMobilePhoneNumber('+4759123456', true)).toBe(true)

    // M2M, but bad suffix
    expect(isNorwegianMobilePhoneNumber('+47591234567890', true)).toBe(false) // 59xx should be 8-digits
    expect(isNorwegianMobilePhoneNumber('+4758123456', true)).toBe(false) // 58xx should be 8-digits
  })

  it('should pretty format international number', () => {
    // international
    expect(prettyFormatPhoneNumber('+48 781 296 647')).toBe('+48\u00a078\u00a012\u00a096\u00a0647')
    expect(prettyFormatPhoneNumber('0048 781-296-647')).toBe('+48\u00a078\u00a012\u00a096\u00a0647')
    expect(prettyFormatPhoneNumber('+290 1234')).toBe('+29\u00a001\u00a0234')
    expect(prettyFormatPhoneNumber('00290 1234')).toBe('+29\u00a001\u00a0234')
  })
})
