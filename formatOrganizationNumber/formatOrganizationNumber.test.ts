import { formatOrganizationNumber } from '.'

describe('test organization number module', () => {
  it('should format org number', () => {
    // norwegian
    expect(formatOrganizationNumber('995222183')).toBe('995\u00a0222\u00a0183')
    expect(formatOrganizationNumber('995 222 183')).toBe('995\u00a0222\u00a0183')
    expect(formatOrganizationNumber('995\u00a0222\u00a0183')).toBe('995\u00a0222\u00a0183')
  })

  it('should NOT format invalid org numbers', () => {
    // starts from +47, but not norwegian
    expect(formatOrganizationNumber('99522218')).toBe('99522218')
    expect(formatOrganizationNumber('9952221844')).toBe('9952221844')
  })
})
