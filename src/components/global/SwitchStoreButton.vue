<template>
  <div class="btn btn-info btn-sm btn-block" @click="switchStore">Switch</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()
const { selectedStore } = storeToRefs(store)
const { changeStore } = store

function switchStore() {
  if (selectedStore.value === 'BMWT') {
    changeStore('WCN')
  } else {
    changeStore('BMWT')
  }
}
</script>

<style scoped></style>
