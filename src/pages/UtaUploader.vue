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
          <div class="col" v-if="UtaData">
            <div class="btn btn-info" @click="buildSheet">DOWNLOAD</div>
          </div>
        </div>
      </div>
      <div class="col-5">
        <AccountDisplay />
      </div>
    </div>
    <div
      class="mb-5"
      v-if="UtaRawData"
      v-for="sheetName in Object.keys(AllSheets)"
      :key="sheetName"
    >
      <DepositCard :sheetName="sheetName" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'

import AccountDisplay from '@/components/uta-uploader/AccountDisplay.vue'
import UploadXlButton from '@/components/global/UploadXlButton.vue'
import DepositCard from '@/components/uta-uploader/DepositCard.vue'

const store = useUtaStore()
const { UtaRawData, UtaData, AllSheets } = storeToRefs(store)
const { removeRow, removeSheet, buildSheet } = store

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data
}

function handleClear() {
  UtaRawData.value = null
}
</script>
