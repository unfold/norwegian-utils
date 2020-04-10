import formatAmount from '.'

describe('test formatting amount', () => {
  it('should format decimal numbers', () => {
    expect(formatAmount(1)).toBe('1.00')
    expect(formatAmount(1.25)).toBe('1.25')
    expect(formatAmount(1000)).toBe('1,000.00')
    expect(formatAmount(10000)).toBe('10,000.00')
    expect(formatAmount(1000000.253)).toBe('1,000,000.25')
  })

  it('should not output decimals when passed decimals: false', () => {
    expect(formatAmount(0.25143, { decimals: false })).toBe('0')
    expect(formatAmount(1000000.253, { decimals: false })).toBe('1,000,000')
  })

  it('should always output negative when alwaysNegative', () => {
    expect(formatAmount(1000.25, { alwaysNegative: true, decimals: false })).toBe('-1,000')
    expect(formatAmount(1000.25, { alwaysNegative: true })).toBe('-1,000.25')
  })
})
