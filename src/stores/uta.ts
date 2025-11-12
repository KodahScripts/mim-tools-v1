import { ref, computed, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { utils, writeFile } from 'xlsx'
import { useGlobalStore } from './global'
import { type UTADepositRow, type UploadSheet } from '@/utils/definitions'

export const useUtaStore = defineStore('uta', () => {
  const globalStore = useGlobalStore()
  const { selectedStore } = storeToRefs(globalStore)

  const UtaRawData: Ref<UTADepositRow[] | null> = ref(null)

  const AllSheets = computed(() => {
    const sheets: UploadSheet = {}

    if (UtaRawData.value) {
      UtaRawData.value.forEach((row) => {
        const refStr = `UTA${row.date}${row.merch.code}`
        if (sheets[refStr]) {
          sheets[refStr].push(row)
        } else {
          sheets[refStr] = [row]
        }
      })
    }
    return sheets
  })

  function changeCtrl(uid: string, newCtrl: string) {
    const row = UtaRawData.value?.filter((row) => row.uid === uid)[0]
    if (row) {
      row.ctrl = newCtrl
    }
  }

  function removeRow(uid: string) {
    if (UtaRawData.value) {
      UtaRawData.value = UtaRawData.value.filter((row) => row.uid != uid)
    }
  }

  function removeSheet(sheetName: string) {
    const rows = AllSheets.value[sheetName]
    rows?.forEach((row) => {
      if (UtaRawData.value) {
        UtaRawData.value = UtaRawData.value?.filter((data) => data.uid != row.uid)
      }
    })
  }

  function buildSheet() {
    const sheets = AllSheets.value
    Object.keys(sheets).forEach((sheetName) => {
      const book = utils.book_new()
      if (sheets[sheetName]) {
        const sheet = utils.json_to_sheet(sheets[sheetName])
        utils.book_append_sheet(book, sheet, sheetName)
      }
      writeFile(book, `${selectedStore.value}_${sheetName}.csv`)
    })
  }

  return { UtaRawData, AllSheets, changeCtrl, removeRow, removeSheet, buildSheet }
})
