import { ref, computed, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { utils, writeFile } from 'xlsx'
import { useGlobalStore, type Merchant } from './global'
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
  uid: string
  date: string
  chk: string
  total: string
  merch: Merchant
  resp: string
  ctrl: string
}

interface UploadSheet {
  [name: string]: UploadRow[]
}

export const useUtaStore = defineStore('uta', () => {
  const globalStore = useGlobalStore()
  const { selectedStore } = storeToRefs(globalStore)
  const { getMerchantType } = globalStore
  const UtaRawData: Ref<Array<string | number | boolean>[] | null | undefined> = ref(null)

  const today = computed(() => {
    const todaysDate: Date = new Date()
    let [month, day, year] = todaysDate.toLocaleDateString().split('/')
    if (Number(month) < 10) month = `0${month}`
    if (Number(day) < 10) day = `0${day}`
    return [month, day, year?.slice(-2)].join('')
  })

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

  const AllSheets = computed(() => {
    const sheets: UploadSheet = {}

    UtaData.value?.forEach((row) => {
      const refStr = `UTA${row.date}${row.merch.code}`
      if (sheets[refStr]) {
        sheets[refStr]?.push(row)
      } else {
        sheets[refStr] = [row]
      }
    })
    return sheets
  })

  function changeCtrl(uid: string, newCtrl: string) {
    const index = Number(uid.split('-')[1])
    if (UtaRawData.value != undefined) {
      if (index != undefined && index != null) {
        UtaRawData.value[index][COLUMN.CONTROL] = newCtrl
      }
    }
  }

  function removeRow(uid: string) {
    const index = Number(uid.split('-')[1])
    UtaRawData.value?.slice(index, 1)
  }

  function removeSheet(sheetName: string) {
    console.log(sheetName)
  }

  function buildSheet() {
    const sheets = AllSheets.value
    Object.keys(sheets).forEach((sheetName) => {
      const book = utils.book_new()
      if (sheets[sheetName]) {
        const sheet = utils.json_to_sheet(sheets[sheetName])
        utils.book_append_sheet(book, sheet, sheetName)
      }
      writeFile(book, `${selectedStore.value}_UTA_${sheetName}.csv`)
    })
  }

  return { UtaRawData, UtaData, today, AllSheets, changeCtrl, removeRow, removeSheet, buildSheet }
})
