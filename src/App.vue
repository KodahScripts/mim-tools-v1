<template>
  <div class="d-flex justify-content-evenly align-items-center">
    <h1>MAG Toolbox</h1>
    <NavButton link="vw-calc">VW Inventory Calculator</NavButton>
    <NavButton link="uta-upload">UTA Uploader</NavButton>
    <NavButton link="cc-upload">CC Uploader</NavButton>
    <NavButton link="emp-match">Employee Match</NavButton>
  </div>
  <div class="mt-4">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavButton from '@/components/global/NavButton.vue'
</script>
