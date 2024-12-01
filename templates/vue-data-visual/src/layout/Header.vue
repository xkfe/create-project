<script setup lang="ts">
import gsap from 'gsap'

const GLOBAL_TITLE = computed(() => import.meta.env.VITE_GLOBAL_TITLE)

const layoutHeaderRef = ref<HTMLElement | null>(null)
const spanCharRefs = ref<HTMLSpanElement[]>([])

function playHeaderAnimation() {
  gsap.to(layoutHeaderRef.value, {
    opacity: 1,
    y: 0,
    duration: 1.4,
    ease: 'power4.inOut',
  })
}

function playTextAnimation() {
  gsap.fromTo(
    spanCharRefs.value,
    { opacity: 0, y: -40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.06,
      delay: 1.1,
    },
  )
}

// watch(route, async () => {
//   await nextTick()
//   playHeaderAnimation()
//   playTextAnimation()
// }, { immediate: true })

onMounted(() => {
  playHeaderAnimation()
  playTextAnimation()
})
</script>

<template>
  <div ref="layoutHeaderRef" class="layout-header">
    <h1 class="header-title" :data-text="GLOBAL_TITLE">
      <span v-for="(item, index) in GLOBAL_TITLE" ref="spanCharRefs" :key="index" class="char">{{ item }}</span>
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

.header-title {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  font-size: 48px;
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
