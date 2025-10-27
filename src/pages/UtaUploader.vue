<template>
  <p>UTA Uploader</p>
  <p>Current Accounts: {{ selectedStore }}</p>
  {{ accounts }}
  <div @click="switchStore">Switch</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'

const utaStore = useUtaStore()
const { selectedStore, accounts } = storeToRefs(utaStore)
const { changeStore } = utaStore

function switchStore() {
  if (selectedStore.value === 'BMWT') {
    changeStore('WCN')
  } else {
    changeStore('BMWT')
  }
}
</script>
