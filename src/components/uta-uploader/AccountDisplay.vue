<template>
  <div class="card">
    <div class="card-header">
      <SwitchStoreButton />
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
import { useUtaStore } from '@/stores/uta'

import SwitchStoreButton from '../global/SwitchStoreButton.vue'

const utaStore = useUtaStore()
const { accounts } = storeToRefs(utaStore)
</script>

<style scoped></style>
