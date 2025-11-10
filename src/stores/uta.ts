import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { utils, write, writeFile } from 'xlsx'
import { useGlobalStore } from './global'
import { convertDate } from '@/utils/xlFunctions'

enum COLUMN {
  DATE = 1,
  CHECK_NUMBER = 4,
  TOTAL_AMOUNT = 6,
  MERCHANT = 7,
  RESPONSE = 15,
  CONTROL = 21,
}

interface UploadRow {
  reference_number: string
  receipt_number: string
  g_l_account: string | undefined
  amount: string
  control: string
  description: string
}

interface UploadSheet {
  [name: string]: UploadRow[]
}

export const useUtaStore = defineStore('uta', () => {
  const globalStore = useGlobalStore()
  const { getMerchantType } = globalStore
  const UtaRawData: Ref<Array<string | number | boolean>[] | null | undefined> = ref(null)

  const UtaData = computed(() => {
    if (UtaRawData.value) {
      const [header, ...data] = UtaRawData.value
      return data.map((row, index) => {
        return {
          uid: `UTA-${index + 1}`,
          date: convertDate(Number(row[COLUMN.DATE])),
          chk: String(row[COLUMN.CHECK_NUMBER]),
          total: Number(row[COLUMN.TOTAL_AMOUNT]).toFixed(2),
          merch: getMerchantType(String(row[COLUMN.MERCHANT])),
          resp: String(row[COLUMN.RESPONSE]),
          ctrl:
            String(row[COLUMN.CONTROL]).length > 6
              ? String(row[COLUMN.CONTROL]).slice(-6)
              : String(row[COLUMN.CONTROL]),
        }
      })
    }
    return null
  })

  function changeCtrl(uid: string, newCtrl: string) {
    const index = uid.split('-')[1]
    if (UtaRawData.value != undefined) {
      if (index != undefined && index != null) {
        UtaRawData.value[index][COLUMN.CONTROL] = newCtrl
      }
    }
  }

  function removeRow(uid: string) {
    const index = uid.split('-')[1]
    if (UtaRawData) UtaRawData.value?.splice(Number(index), 1)
  }

  function buildSheet() {
    let refStr = ''
    const data = UtaData.value != null ? UtaData.value : []
    const sheets: UploadSheet = {}
    const book = utils.book_new()

    data
      .map((row) => {
        refStr = `UTA${row.date}${row.merch.code}`
        return {
          reference_number: refStr,
          receipt_number: refStr,
          g_l_account: row.merch.acct,
          amount: row.total,
          control: row.ctrl,
          description: refStr,
        }
      })
      .forEach((row) => {
        if (sheets[row.reference_number]) {
          sheets[row.reference_number]?.push(row)
        } else {
          sheets[row.reference_number] = [row]
        }
      })

    Object.keys(sheets).forEach((sheetName) => {
      if (sheets[sheetName]) {
        const sheet = utils.json_to_sheet(sheets[sheetName])
        utils.book_append_sheet(book, sheet, sheetName)
      }
    })
    writeFile(book, 'UTA.xlsx')
  }

  return { UtaRawData, UtaData, changeCtrl, removeRow, buildSheet }
})
