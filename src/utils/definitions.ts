const UPLOADHEADER = [
  'Reference #',
  'Receipt #',
  'G/L Account',
  'Amount',
  'Control #',
  'Description',
]

enum DAILYCOLS {
  DATE = 4,
  BRAND = 8,
  AMOUNT = 15,
  SURCH = 16,
  DEPT = 17,
  INVOICE = 18,
  STATUS = 7,
}

enum MULTICOLS {
  DATE = 2,
  BRAND = 4,
  AMOUNT = 3,
  SURCH = 99,
  DEPT = 93,
  INVOICE = 94,
  CHAIN = 13,
}

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

interface CreditDepositRow {
  uid: string
  date: string
  brand: string
  amount: string
  surch: string
  merch: Merchant
  ctrl: string
  flag: Flags
  resp?: string
  chain?: string
}

export type { Accounts, Account, UTADepositRow, UploadRow, UploadSheet, Merchant }
export { UPLOADHEADER, UTA_COLUMN, DAILYCOLS, MULTICOLS }
