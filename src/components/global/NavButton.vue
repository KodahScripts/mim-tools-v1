<template>
  <RouterLink
    :to="`/${link}`"
    class="btn btn-outline-info btn-sm btn-block"
    :class="{ active: currentPath }"
  >
    <slot></slot>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{
  link: string
}>()

const currentPath = computed(() => {
  return route.path === `/${props.link}`
})
</script>
