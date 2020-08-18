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
    expect(formatAccountNumber('362.424.123.123.45')).toBe('3624\u00a024\u00a012312')
    expect(formatAccountNumber('362.424.45')).toBe('3624\u00a024\u00a045')
    expect(formatAccountNumber('362.424.455')).toBe('3624\u00a024\u00a0455')
    expect(formatAccountNumber('12')).toBe('12')
    expect(formatAccountNumber('')).toBe('')
    expect(formatAccountNumber('hello')).toBe('hell\u00a0o')
    expect(formatAccountNumber('*******1234')).toBe('****\u00a0**\u00a0*1234')
  })

  it('should format masked number', () => {
    expect(formatAccountNumber('*******1234')).toBe('****\u00a0**\u00a0*1234')
  })
})
