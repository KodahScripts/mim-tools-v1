<template>
  <div class="btn btn-info btn-sm btn-block" @click="switchStore">Switch</div>
  <select>
    <option v-for="storename in stores" :value="storename" :key="storename" @click="changeStore($event.target)"  />
  </select>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()
const { selectedStore } = storeToRefs(store)
const { changeStore } = store

  const stores = ref([
    'BMWT', 'WCN', 'KIA'
  ])

function switchStore() {
  if (selectedStore.value === 'BMWT') {
    changeStore('WCN')
  } else {
    changeStore('BMWT')
  }
}
</script>

<style scoped></style>
