Utilities to format different string on Norwegian format

This library returns hard spaces `\u00a0` for formatting, so there are no line breaks in the middle of phone numbers, account numbers or other data.

# formatOrganizationNumber

Format a norwegian business entity number ("brreg").

## Examples

    import { formatOrganizationNumber } from 'norwegian-utils/formatOrganizationNumber'
    formatOrganizationNumber('995222183') === '995 222 183'

# formatPhoneNumber

Provides 4 methods:

- `isValidPhoneNumber` - Is the phone number a valid phone number, somewhere in the world? Will be true for both `00123467890` style, `+46123467890`, or norwegian 8-digit numbers `12345678`. Phone number can can be passed with spaces etc. and will still pass. **This is not exhausitve validation**, invalid phone numbers can pass, and valid one be rejected (like the emergency number `112`).
- `isNorwegianPhoneNumber` - Returns true if the number looks like a Norwegian number. Does not validate short / SMS numbers ie. `112` or `32200`.
- `shortFormatPhoneNumber` - Returns the phone number, with international prefix (so Norwegian 8-digit numbers are converted to the form +4712345678). This is appropriate to compare two phone numbers for example, or to store in databases. Removes any formatting like spaces, and always prefixes with `+`. If the format is invalid, this simply returns the original string.
- `prettyFormatPhoneNumber` - Formats the phone number for output to the user, with spaces. Avoids `+47` prefix for Norwegian numbers. For example `004712345678` is formatted as `12 34 56 78`. Business numbers are formatted on the form `12 34 56 78`. Personal numbers are formatted as `423 45 678`. If the format is invalid, this simply returns the original string.

## Examples

    import { shortFormatPhoneNumber } from 'norwegian-utils/formatPhoneNumber'
    shortFormatPhoneNumber('112') === '112'
    shortFormatPhoneNumber('12345678') === '+4712345678'
    shortFormatPhoneNumber('+44 12 34 56') === '+44123456'


    import { prettyFormatPhoneNumber } from 'norwegian-utils/formatPhoneNumber'
    prettyFormatPhoneNumber('12345678') === '12 34 56 78'
    prettyFormatPhoneNumber('+44 12 34 56') === '+44 123456'
    prettyFormatPhoneNumber('0048 781-296-647') === '+48 78 12 96 647'

    import { isValidPhoneNUmber } from 'norwegian-utils/formatPhoneNumber'
    isValidPhoneNUmber('112') === false
    isValidPhoneNUmber('+44 12 34 56') === true
    isValidPhoneNUmber('0048 781-296-647') === true

    import { isNorwegianPhoneNumber } from 'norwegian-utils/formatPhoneNumber'
    isNorwegianPhoneNumber('112') === false
    shortFormatPhoneNumber('12345678') === true
    shortFormatPhoneNumber('004712345678') === true
    isNorwegianPhoneNumber('+44 12 34 56') === false
    isNorwegianPhoneNumber('0048 781-296-647') === false

# formatAccountNumber

Formats a Norwegian 11-digit bank account number on the standard form (4, 2, 5 digits). Numbers that are not 11 digits are formatted by "best effort".

## Examples

    import { formatAccountNumber } from 'norwegian-utils/formatAccountNumber'
    formatAccountNumber('36242412345') === '3624 24 12345'
    formatAccountNumber('362424123451') === '3624 241 23451'

# formatAmount

Formats a number with thousand separators and 2 decimals. This is mainly appropriate for displaying currency amounts.

Accepts a `options` object as the second argument, two options are possible:

- `alwaysNegative: true` (default: `false`) - Always return a negative amount (to display a debt for example).
- `decimals: false` (default `true`) - Return the number with 2 decimals.

## Examples

    import { formatAmount } from 'norwegian-utils/formatAmount'
    formatAmount('1000') === '1,000.00'
    formatAmount('1000', { decimals: false }) === '1,000'
    formatAmount('1000', { alwayNegative: true }) === '-1,000.00'
