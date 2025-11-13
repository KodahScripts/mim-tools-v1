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
          <div class="col" v-if="UtaRawData">
            <div class="btn btn-info" @click="buildSheet">DOWNLOAD</div>
          </div>
        </div>
      </div>
      <div class="col-5">
        <AccountDisplay />
      </div>
    </div>
    <div class="row">
      <div
        class="mb-5 col-lg-6"
        v-if="UtaRawData"
        v-for="sheetName in Object.keys(AllSheets)"
        :key="sheetName"
      >
        <DepositCard :sheetName="sheetName" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUtaStore } from '@/stores/uta'
import { useGlobalStore } from '@/stores/global'
import { convertDate } from '@/utils/xlFunctions'
import { UTA_COLUMN } from '@/utils/definitions'

import AccountDisplay from '@/components/uta-uploader/AccountDisplay.vue'
import UploadXlButton from '@/components/global/UploadXlButton.vue'
import DepositCard from '@/components/uta-uploader/DepositCard.vue'

const store = useUtaStore()
const { UtaRawData, AllSheets } = storeToRefs(store)
const { buildSheet } = store

const globalStore = useGlobalStore()
const { getMerchantType } = globalStore

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data.slice(1).map((row, index) => {
    const date = convertDate(Number(row[UTA_COLUMN.DATE]))
    const merch = getMerchantType(String(row[UTA_COLUMN.MERCHANT]))
    return {
      uid: `UTA-${index}`,
      date,
      chk: String(row[UTA_COLUMN.CHECK_NUMBER]),
      total: Number(row[UTA_COLUMN.TOTAL_AMOUNT]).toFixed(2),
      merch,
      resp: String(row[UTA_COLUMN.RESPONSE]),
      ctrl:
        String(row[UTA_COLUMN.CONTROL]).length > 6
          ? String(row[UTA_COLUMN.CONTROL]).slice(-6)
          : String(row[UTA_COLUMN.CONTROL]),
    }
  })
}

function handleClear() {
  UtaRawData.value = null
}
</script>
