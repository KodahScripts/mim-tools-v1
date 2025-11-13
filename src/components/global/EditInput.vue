<template>
  <div class="row">
    <label v-if="label" :for="id" class="col">{{ label }}</label>
    <input
      type="text"
      :id="id"
      :placeholder="previousValue"
      @change="handleChange($event)"
      class="col"
    />
  </div>
</template>

<script setup lang="ts">
import { useUtaStore } from '@/stores/uta'

const props = defineProps<{
  id: string
  previousValue: string
  label?: {
    type: string | null
    default: null
  }
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
label {
  font-size: 0.7rem;
  padding: 1rem;
}
input {
  border-radius: 0.6rem;
  border: none;
  text-align: center;
  font-size: 0.8rem;
}
</style>
