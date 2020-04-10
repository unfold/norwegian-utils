import formatAccountNumber from '.'

describe('test formatting account numbers', () => {
  it('should format valid account numbers', () => {
    expect(formatAccountNumber('3624 24 12345')).toBe('3624\u00a024\u00a012345')
    expect(formatAccountNumber('3624\u00a024\u00a012345')).toBe('3624\u00a024\u00a012345')
    expect(formatAccountNumber('36242412345')).toBe('3624\u00a024\u00a012345')
    expect(formatAccountNumber('3624.24.12345')).toBe('3624\u00a024\u00a012345')
    expect(formatAccountNumber('362.424.123.45')).toBe('3624\u00a024\u00a012345')
  })

  it('should try for invalid numbers', () => {
    expect(formatAccountNumber('362.424.123.123.45')).toBe('3624\u00a024123\u00a012345')
    expect(formatAccountNumber('362.424.45')).toBe('36242445')
    expect(formatAccountNumber('362.424.455')).toBe('362424455')
  })
})
