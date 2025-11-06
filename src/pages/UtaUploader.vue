<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <p class="lead">UTA Uploader</p>
        </div>
        <div class="row">
          <div class="col">
            <UploadXlButton id="uta-report" @fileData="handleUpload" @clearData="handleClear" />
          </div>
        </div>
      </div>
      <div class="col-5">
        <AccountDisplay />
      </div>
    </div>
    <div class="card mt-4 text-center" v-if="UtaRawData">
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
          v-for="(row, index) in UtaData"
          :class="{ shaded: index % 2 === 0 }"
        >
          <div class="col">{{ row.date }}</div>
          <div class="col">{{ row.chk }}</div>
          <div class="col">{{ row.total }}</div>
          <div class="col">{{ row.merch.acct }}</div>
          <div class="col">{{ row.resp }}</div>
          <div class="col"><EditInput :id="row.uid" :previousValue="row.ctrl" /></div>
          <div class="col-1">
            <small class="btn btn-danger btn-sm" @click="removeRow(row.uid)">X</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'

import AccountDisplay from '@/components/uta-uploader/AccountDisplay.vue'
import UploadXlButton from '@/components/global/UploadXlButton.vue'
import EditInput from '@/components/global/EditInput.vue'

const store = useUtaStore()
const { UtaRawData, UtaData } = storeToRefs(store)
const { removeRow } = store

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data
}

function handleClear() {
  UtaRawData.value = null
}
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
