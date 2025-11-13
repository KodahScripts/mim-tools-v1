const UPLOADHEADER = [
  'Reference #',
  'Receipt #',
  'G/L Account',
  'Amount',
  'Control #',
  'Description',
]

enum UTA_COLUMN {
  DATE = 1,
  CHECK_NUMBER = 4,
  TOTAL_AMOUNT = 6,
  MERCHANT = 7,
  RESPONSE = 15,
  CONTROL = 21,
}

interface UploadRow {
  reference: string
  receipt: string
  glAccount: string
  amount: number
  control: string
  description: string
}

interface Accounts {
  vari: string
  fixed: string
  fee: string
}

interface Account {
  [store: string]: Accounts
}

interface Merchant {
  code: string
  acct: string | undefined
}

interface Flags {
  delete: boolean
}

interface UTADepositRow {
  uid: string
  date: string
  chk: string
  total: string
  merch: Merchant
  resp: string
  ctrl: string
  flag: Flags
}

interface UploadSheet {
  [name: string]: UTADepositRow[]
}

export type { Accounts, Account, UTADepositRow, UploadRow, UploadSheet, Merchant }
export { UPLOADHEADER, UTA_COLUMN }
