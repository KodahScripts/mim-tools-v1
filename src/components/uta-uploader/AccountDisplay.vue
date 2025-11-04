<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex gap-4 justify-content-between align-middle">
        <CurrentStoreDisplay />
        <SwitchStoreButton />
      </div>
    </div>
    <div class="card-body">
      <p class="row fw-bold">
        <span class="col-8">Account Name</span><span class="col-4">Account Number</span>
      </p>
      <p class="row">
        <span class="col-8">Variable</span><span class="col-4">{{ accounts?.vari }}</span>
      </p>
      <p class="row">
        <span class="col-8">Fixed</span><span class="col-4">{{ accounts?.fixed }}</span>
      </p>
      <p class="row">
        <span class="col-8">CC Fee</span><span class="col-4">{{ accounts?.fee }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'

import SwitchStoreButton from '../global/SwitchStoreButton.vue'
import CurrentStoreDisplay from './CurrentStoreDisplay.vue'

const store = useGlobalStore()
const { accounts } = storeToRefs(store)
</script>

<style scoped></style>
