<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row mb-5">
          <p class="lead">{{ selectedStore }} UTA Uploader</p>
          <div class="row">
            <div class="col">
              <SwitchStoreButton />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <UploadXlButton id="uta-report" @fileData="handleUpload" @clearData="handleClear" />
          </div>
          <div class="col" v-if="UtaRawData">
            <div class="btn btn-info" @click="buildSheet">DOWNLOAD ALL</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div
        class="col-lg-6"
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
import { COLUMN } from '@/utils/definitions'

import AccountDisplay from '@/components/uta-uploader/AccountDisplay.vue'
import UploadXlButton from '@/components/global/UploadXlButton.vue'
import DepositCard from '@/components/uta-uploader/DepositCard.vue'
import SwitchStoreButton from '@/components/global/SwitchStoreButton.vue'

const utaStore = useUtaStore()
const { UtaRawData, AllSheets } = storeToRefs(utaStore)
const { buildSheet } = utaStore

const globalStore = useGlobalStore()
const { selectedStore } = storeToRefs(globalStore)
const { getMerchantType } = globalStore

function handleUpload(data: Array<string | number | boolean>[]) {
  UtaRawData.value = data.slice(1).map((row, index) => {
    const date = convertDate(Number(row[COLUMN.UTA.DATE]))
    const merch = getMerchantType(String(row[COLUMN.UTA.MERCHANT]))
    const flag = { delete: false }
    return {
      uid: `UTA-${index}`,
      date,
      chk: String(row[COLUMN.UTA.CHECK_NUMBER]),
      total: Number(row[COLUMN.UTA.TOTAL_AMOUNT]).toFixed(2),
      merch,
      resp: String(row[COLUMN.UTA.RESPONSE]),
      ctrl:
        String(row[COLUMN.UTA.CONTROL]).length > 6
          ? String(row[COLUMN.UTA.CONTROL]).slice(-6)
          : String(row[COLUMN.UTA.CONTROL]),
      flag,
    }
  })
}

function handleClear() {
  UtaRawData.value = null
}
</script>
