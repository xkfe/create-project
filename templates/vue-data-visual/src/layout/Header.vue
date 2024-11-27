<script setup lang="ts">
// lottie 动画
// import LottieView from 'ufuse/src/components/LottieView/index.vue'
// import { loadLottieJSON } from 'ufuse/src/utils/loadLottieJSON'
// const header = loadLottieJSON(import.meta.glob('@/assets/lottie/title/**/*', { eager: true }))
import gsap from 'gsap'

const route = useRoute()
const GLOBAL_TITLE = computed(() => import.meta.env.VITE_GLOBAL_TITLE)

watch(route, async () => {
  await nextTick()
  gsap.to('.layout-header', {
    opacity: 1,
    y: 0,
    duration: 1.4,
    ease: 'power4.inOut',
  })
}, { immediate: true })
</script>

<template>
  <div class="layout-header">
    <h1 class="global-title">
      <span v-for="(item, index) in GLOBAL_TITLE" :key="index">{{ item }}</span>
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.layout-header {
  position: relative;
  width: 100%;
  height: $layoutHeaderHeight;
  opacity: 0;
  transform: translateY(-$layoutHeaderHeight);
  background: url('@/assets/images/container-header-bg.png') no-repeat center 0;
}

.global-title {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-weight: 500;
  font-family: YouSheBiaoTiHei;
  letter-spacing: 2px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    background-image: linear-gradient(to bottom, #ffffff 20%, #6bc9ff 100%);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
}
</style>
