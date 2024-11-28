<script setup lang="ts">
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import LottieView from 'ufuse/src/components/LottieView/index.vue'
import { loadLottieJSON } from 'ufuse/src/utils/loadLottieJSON'
// 体积是 JSON 的 1/8
import lottie404 from '@/assets/lottie/404/404-1.lottie'

const header = loadLottieJSON(import.meta.glob('@/assets/lottie/title/**/*', { eager: true }))
</script>

<template>
  <div>
    <div class="h-50% w-full flex flex-col items-center justify-center">
      <LottieView :data="header" :segments="[60, 90]" loop />
      <DotLottieVue class="h-500 w-500" loop autoplay :src="lottie404" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
