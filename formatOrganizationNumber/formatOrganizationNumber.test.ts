import { formatOrganizationNumber, isValidOrganizationNumber } from '.'

describe('test organization number module', () => {
  it('should format org number', () => {
    // norwegian
    expect(formatOrganizationNumber('995222183')).toBe('995\u00a0222\u00a0183')
    expect(formatOrganizationNumber('995 222 183')).toBe('995\u00a0222\u00a0183')
    expect(formatOrganizationNumber('995\u00a0222\u00a0183')).toBe('995\u00a0222\u00a0183')
  })

  it('should NOT format invalid org numbers', () => {
    // Too short / long
    expect(formatOrganizationNumber('99522218')).toBe('99522218')
    expect(formatOrganizationNumber('9952221844')).toBe('9952221844')
  })

  it('should validate valid org numbers', () => {
    // starts from +47, but not norwegian
    expect(isValidOrganizationNumber('995222183')).toBe(true)
  })

  it('should NOT validate invalid org numbers', () => {
    // starts from +47, but not norwegian
    expect(isValidOrganizationNumber('')).toBe(false)
    expect(isValidOrganizationNumber('0')).toBe(false)
    expect(isValidOrganizationNumber('99522218')).toBe(false)
    expect(isValidOrganizationNumber('9952221844')).toBe(false)
  })
})
