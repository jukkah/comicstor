export const Money = `
  type Money {
    value: String
    code: String
  }
`

export const MoneyInput = `
  input MoneyInput {
    value: String
    code: String
  }
`

export const queries = `
  currencyCodes: [String!]!
`
