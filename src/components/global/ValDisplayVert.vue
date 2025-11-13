<template>
  <div class="col align-self-center">
    <div class="d-flex flex-column text-center" id="display">
      <div>
        <slot name="lbl"></slot>
      </div>
      <div>
        <slot name="val"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
#display {
  font-size: 0.7rem;
}
</style>
