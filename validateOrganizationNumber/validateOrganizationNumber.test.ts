import validateOrganizationNumber from '.'

describe('Organization number validation', () => {
  it('Should return true for correct organization numbers regardless of formatting', () => {
    expect(validateOrganizationNumber('965.920.358')).toBeTruthy()
    expect(validateOrganizationNumber('965920358')).toBeTruthy()
    expect(validateOrganizationNumber('965 920 358')).toBeTruthy()
    expect(validateOrganizationNumber('965\u00a0920\u00a0358')).toBeTruthy()
  })

  it('Should return false for organization numbers with wrong control number', () => {
    expect(validateOrganizationNumber('965920356')).toBeFalsy()
    expect(validateOrganizationNumber('965.920.356')).toBeFalsy()
    expect(validateOrganizationNumber('96 592 03 56')).toBeFalsy()
    expect(validateOrganizationNumber('12345678909')).toBeFalsy()
    expect(validateOrganizationNumber('965920353')).toBeFalsy()
    expect(validateOrganizationNumber('965920352')).toBeFalsy()
  })

  it('Should return false for organization numbers with incorrect length', () => {
    expect(validateOrganizationNumber('1224')).toBeFalsy()
    expect(validateOrganizationNumber('12342190109812092180128')).toBeFalsy()
    expect(validateOrganizationNumber('0')).toBeFalsy()
  })

  it('Should return false for organization numbers with letters and characters other than spaces and periods', () => {
    expect(validateOrganizationNumber('1224aaa')).toBeFalsy()
    expect(validateOrganizationNumber('123456hello')).toBeFalsy()
    expect(validateOrganizationNumber('Organiasjonsnummer')).toBeFalsy()
    expect(validateOrganizationNumber('1224-56-78903')).toBeFalsy()
  })
})
