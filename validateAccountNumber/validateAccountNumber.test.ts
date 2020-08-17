import validateAccountNumber from '.'

describe('Account number validation', () => {
  it('Should return true for correct account numbers regardless of formatting', () => {
    expect(validateAccountNumber('1234.56.78903')).toBeTruthy()
    expect(validateAccountNumber('12345678903')).toBeTruthy()
    expect(validateAccountNumber('1234 56 78903')).toBeTruthy()
  })

  it('Should return false for account numbers with wrong control number', () => {
    expect(validateAccountNumber('1224.56.78903')).toBeFalsy()
    expect(validateAccountNumber('1234.56.78909')).toBeFalsy()
    expect(validateAccountNumber('12245678903')).toBeFalsy()
    expect(validateAccountNumber('12345678909')).toBeFalsy()
    expect(validateAccountNumber('1224 56 78903')).toBeFalsy()
    expect(validateAccountNumber('1234 56 78909')).toBeFalsy()
  })

  it('Should return false for account numbers with incorrect length', () => {
    expect(validateAccountNumber('1224')).toBeFalsy()
    expect(validateAccountNumber('12342190109812092180128')).toBeFalsy()
    expect(validateAccountNumber('0')).toBeFalsy()
  })

  it('Should return false for account numbers with letters and charachters other than spaces and periods', () => {
    expect(validateAccountNumber('1224aaa')).toBeFalsy()
    expect(validateAccountNumber('123456hello')).toBeFalsy()
    expect(validateAccountNumber('Kontonummer')).toBeFalsy()
    expect(validateAccountNumber('1224-56-78903')).toBeFalsy()
  })
})
