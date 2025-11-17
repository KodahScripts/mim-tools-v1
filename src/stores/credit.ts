import { ref, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useGlobalStore } from './global'
import type { UTADepositRow, UploadSheet } from '@/utils/definitions'

export const useCreditStore = defineStore('credit', () => {
  const globalStore = useGlobalStore()
  const { selectedStore } = storeToRefs(globalStore)
  const { createReceiptNumber } = globalStore

  const CreditRawData: Ref<UTADepositRow[] | null> = ref(null)

  return {
    CreditRawData,
  }
})
