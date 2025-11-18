<template>
  <div class="row">
    <label v-if="label" :for="id" class="col">{{ label }}</label>
    <input
      type="text"
      :id="id"
      :placeholder="previousValue"
      @change="handleChange(id, $event)"
      class="col"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

defineProps<{
  id: string
  previousValue: string
  label?: {
    type: string | null
    default: null
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleChange = (id: string, event: Event) => {
  if (event.target instanceof HTMLInputElement) {
    emit('update:modelValue', { id, val: event.target.value })
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
