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
    const sortedSheets: UploadSheet = {}
    if (UtaRawData.value) {
      UtaRawData.value.forEach((row) => {
        let refStr = `UTA${row.date}${row.merch.code}`
        if (row.resp === 'DENIED') refStr += '-DEN'
        if (row.resp === 'REFERRAL') refStr += '-REF'
        if (row.resp === 'DELETED') refStr += '-DEL'
        if (sheets[refStr]) {
          sheets[refStr].push(row)
        } else {
          sheets[refStr] = [row]
        }
      })

      const keys = Object.keys(sheets)
      keys.sort()

      keys.forEach((key) => {
        sortedSheets[key] = sheets[key]
      })
    }
    return sortedSheets
  })

  function getRow(uid: string) {
    return UtaRawData.value?.filter((row) => row.uid === uid)[0]
  }

  function changeCtrl(uid: string, newCtrl: string) {
    const row = getRow(uid)
    if (row) {
      row.ctrl = newCtrl
    }
  }

  function deleteRow(uid: string) {
    const row = getRow(uid)
    if (row) {
      row.resp = 'DELETED'
    }
  }

  function deleteSheet(sheetName: string) {
    const sheet = AllSheets.value[sheetName]
    sheet?.forEach((deposit) => {
      const row = getRow(deposit.uid)
      if (row) {
        row.resp = 'DELETED'
      }
    })
  }

  function removeRow(uid: string) {
    if (UtaRawData.value) {
      UtaRawData.value = UtaRawData.value.filter((row) => row.uid != uid)
    }
  }

  function removeSheet(sheetName: string) {
    const sheet = AllSheets.value[sheetName]
    sheet?.forEach((row) => {
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
        const data = sheets[sheetName].map((row) => {
          const ref = sheetName.includes('-') ? sheetName : `${sheetName}-1`
          return {
            reference: ref,
            receipt: ref,
            glAccount: row.merch.acct,
            amount: row.total,
            control: row.ctrl,
            description: '',
          }
        })
        const sheet = utils.json_to_sheet(data)
        utils.book_append_sheet(book, sheet, sheetName)
      }
      writeFile(book, `${selectedStore.value}_${sheetName}.csv`)
    })
  }

  return {
    UtaRawData,
    AllSheets,
    changeCtrl,
    getRow,
    deleteSheet,
    deleteRow,
    removeRow,
    removeSheet,
    buildSheet,
  }
})
