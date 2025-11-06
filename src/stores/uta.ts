import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useGlobalStore } from './global'
import { convertDate } from '@/utils/xlFunctions'
import type { UTADepositRow } from '@/utils/definitions'

enum COLUMN {
  DATE = 1,
  CHECK_NUMBER = 4,
  TOTAL_AMOUNT = 6,
  MERCHANT = 7,
  RESPONSE = 15,
  CONTROL = 21,
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

  return { UtaRawData, UtaData, changeCtrl, removeRow }
})
