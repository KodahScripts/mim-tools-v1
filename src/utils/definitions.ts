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

interface Accounts {
  vari: string
  fixed: string
  fee: string
}

interface Account {
  [store: string]: Accounts
}

interface UTADepositRow {
  date: string
  chk: string
  total: string
  merch: string
  resp: string
  ctrl: string
}

export type { Accounts, Account, UploadReport, UTADepositRow }
