import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
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

export const useUtaStore = defineStore('uta', () => {
  const globalStore = useGlobalStore()
  const { getMerchantType } = globalStore
  const UtaRawData: Ref<Array<string | number | boolean>[] | null> = ref(null)

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

  return { UtaRawData, UtaData }
})
