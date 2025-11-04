export const UPLOADHEADER = [
  'Reference #',
  'Receipt #',
  'G/L Account',
  'Amount',
  'Control #',
  'Description',
]

interface UploadRow {
  reference: string // UTA091625(V,F,H)
  receipt: string // UTA091625(V,F,H)
  glAccount: number // 3225 || 3304
  amount: number // Total Trans Amount
  control: string // RO Num || Cust Num
  description: string // CHK #
  found: boolean
}

interface UploadReport {
  [ref: string]: UploadRow[]
}

enum COLUMN {
  DATE = 1,
  CHECK_NUMBER = 4,
  TOTAL_AMOUNT = 6,
  MERCHANT = 7,
  NAME = 8,
  RESPONSE = 15,
  CONTROL = 21,
}

interface Accounts {
  vari: string
  fixed: string
  fee: string
}

interface Account {
  [store: string]: Accounts
}

export type { Accounts, Account, COLUMN, UploadReport }
