<template>
  <div class="d-flex gap-4 justify-content-between align-middle">
    <p>Current Accounts: {{ selectedStore }}</p>
    <div class="btn btn-info btn-sm btn-block" @click="switchStore">Switch</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'

const utaStore = useUtaStore()
const { selectedStore } = storeToRefs(utaStore)
const { changeStore } = utaStore

function switchStore() {
  if (selectedStore.value === 'BMWT') {
    changeStore('WCN')
  } else {
    changeStore('BMWT')
  }
}
</script>

<style scoped></style>
