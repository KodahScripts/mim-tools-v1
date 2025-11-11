<template>
  <div class="card mt-4 text-center">
    <div class="d-flex justify-content-center p-2 fs-5 fw-bold">
      <div class="col text-start">{{ sheetName }}</div>
      <div class="col-1 text-end">
        <small class="btn btn-sm rounded-circle" @click="removeSheet(sheetName)">X</small>
      </div>
    </div>
    <div class="card-header ps-5 pe-5">
      <div class="row fw-bold">
        <div class="col">DATE</div>
        <div class="col">CHECK #</div>
        <div class="col">AMOUNT</div>
        <div class="col">ACCOUNT</div>
        <div class="col">STATUS</div>
        <div class="col">REFERENCE #</div>
        <div class="col-1"></div>
      </div>
    </div>
    <div class="card-body ps-5 pe-5">
      <div
        class="row pt-2 pb-2 line-item mb-2"
        v-for="(row, index) in rows"
        :class="{ shaded: index % 2 === 0 }"
        :key="row.uid"
      >
        <div class="col">{{ row.date }}</div>
        <div class="col">{{ row.chk }}</div>
        <div class="col">{{ row.total }}</div>
        <div class="col">{{ row.merch.acct }}</div>
        <div class="col">{{ row.resp }}</div>
        <div class="col"><EditInput :id="row.uid" :previousValue="row.ctrl" /></div>
        <div class="col-1">
          <small class="btn btn-danger btn-sm rounded-circle" @click="removeRow(row.uid)">X</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'

import EditInput from '../global/EditInput.vue'

const store = useUtaStore()
const { AllSheets } = storeToRefs(store)
const { removeSheet, removeRow } = store
const props = defineProps<{
  sheetName: string
}>()

const rows = computed(() => {
  return AllSheets.value[props.sheetName]
})
</script>

<style scoped>
.line-item {
  border-radius: 1rem;
  border: 1px solid #ccc;
}
/* 
.line-item::before {
  content: '[X]';
  position: relative;
  top: 0;
  left: 1rem;
} */

.line-item:hover {
  background-color: #c1cfde;
  cursor: pointer;
}

.shaded {
  background-color: #dfeaf5;
}
</style>
