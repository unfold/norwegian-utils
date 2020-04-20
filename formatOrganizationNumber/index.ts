export const formatOrganizationNumber = (orgNumber: string) => {
  if (!orgNumber) return
  orgNumber = orgNumber.replace(/ /g, '')

  if (orgNumber.length !== 9) {
    return orgNumber
  }

  return orgNumber.substring(0, 3) + '\u00a0' + orgNumber.substring(3, 6) + '\u00a0' + orgNumber.substring(6)
}

export const isValidOrganizationNumber = (orgNumber: string) => {
  return !!/^\d{9}$/.test(orgNumber)
}
