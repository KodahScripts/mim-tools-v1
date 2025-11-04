import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useGlobalStore } from './global'

const globalStore = useGlobalStore()
const { selectedStore } = storeToRefs(globalStore)

export const useUtaStore = defineStore('uta', () => {
  return {}
})
