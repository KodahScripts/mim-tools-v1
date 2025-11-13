<template>
  <div class="card mt-4 text-center">
    <div class="card-header ps-5 pe-5">
      <div class="d-flex justify-content-center p-2 fs-5 fw-bold">
        <div class="col text-start">{{ sheetName }}</div>
        <div class="col-1 text-end">
          <small class="btn btn-sm rounded-circle" @click="deleteSheet(sheetName)">X</small>
        </div>
      </div>
    </div>
    <div class="card-body ps-5 pe-5">
      <div
        class="row pt-2 pb-2 mb-2 line-item"
        v-for="(row, index) in rows"
        :class="{ shaded: index % 2 === 0 }"
        :key="row.uid"
      >
        <ValDisplayVert>
          <template #lbl>CHECK</template>
          <template #val>{{ row.chk }}</template>
        </ValDisplayVert>
        <ValDisplayVert>
          <template #lbl>AMOUNT</template>
          <template #val>{{ row.total }}</template>
        </ValDisplayVert>
        <ValDisplayVert>
          <template #lbl>ACCOUNT</template>
          <template #val>{{ row.merch.acct }}</template>
        </ValDisplayVert>
        <ValDisplayVert>
          <template #lbl>CONTROL</template>
          <template #val>
            <EditInput :id="row.uid" :previousValue="row.ctrl" />
          </template>
        </ValDisplayVert>
        <div class="col-1 align-self-center">
          <small class="btn btn-danger btn-sm rounded-circle" @click="deleteRow(row.uid)">X</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'

import ValDisplayVert from '../global/ValDisplayVert.vue'
import EditInput from '../global/EditInput.vue'

const store = useUtaStore()
const { AllSheets } = storeToRefs(store)
const { deleteSheet, deleteRow } = store
const props = defineProps<{
  sheetName: string
}>()

const rows = computed(() => {
  return AllSheets.value[props.sheetName]
})
</script>

<style scoped>
.line-item {
  align: center;
  border-radius: 1rem;
  border: 1px solid #ccc;
}

.line-item:hover {
  background-color: #c1cfde;
  cursor: pointer;
}

.shaded {
  background-color: #dfeaf5;
}

.btn-danger {
  font-size: 0.5rem;
}
</style>
