<template>
  <input type="text" :id="id" :placeholder="previousValue" @change="handleChange($event)" />
</template>

<script setup lang="ts">
import { useUtaStore } from '@/stores/uta'

const props = defineProps<{
  id: string
  previousValue: string
}>()

const store = useUtaStore()
const { changeCtrl } = store

const handleChange = (event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    changeCtrl(props.id, event.target.value)
  }
}
</script>

<style scoped>
input {
  border-radius: 0.6rem;
  border: none;
  text-align: center;
}
</style>
