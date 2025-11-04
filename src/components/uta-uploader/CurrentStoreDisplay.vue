<template>
  <div class="lead">{{ selectedStore }}</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/global'

const store = useGlobalStore()
const { selectedStore } = storeToRefs(store)
</script>

<style scoped></style>
