<script setup lang="ts">
import LottieView from 'ufuse/src/components/LottieView/index.vue'
import { loadLottieJSON } from 'ufuse/src/utils/loadLottieJSON'

const header = loadLottieJSON(import.meta.glob('@/assets/lottie/title/**/*', { eager: true }))

console.log('header :>> ', header)
</script>

<template>
  <div class="layout-header">
    <div class="absolute left-0 top-8 h-full w-full">
      <LottieView class="absolute left-0 top-0 z-0 h-full w-full" :data="header" :segments="[60, 90]" loop />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  position: relative;
  width: 100%;
  height: $layoutHeaderHeight;
}
</style>
