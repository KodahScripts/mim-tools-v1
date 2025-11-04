import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { Account } from '@/utils/definitions'

const ACCT: Account = {
  BMWT: {
    vari: '3304',
    fixed: '3225',
    fee: '3331C',
  },
  WCN: {
    vari: '3040',
    fixed: '2250',
    fee: '3324',
  },
}

export const useGlobalStore = defineStore('global', () => {
  const selectedStore = ref('BMWT')

  const accounts = computed(() => {
    return ACCT[selectedStore.value]
  })

  function changeStore(storeAbbr: string) {
    selectedStore.value = storeAbbr
  }

  return { selectedStore, accounts, changeStore }
})
