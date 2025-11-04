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
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'

import AccountDisplay from '@/components/uta-uploader/AccountDisplay.vue'
import UploadXlButton from '@/components/global/UploadXlButton.vue'

const reportData: Ref<JSON | null> = ref(null)

function handleUpload(data: JSON) {
  reportData.value = data
}

function handleClear() {
  reportData.value = null
}
</script>
