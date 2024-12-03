<script setup lang="ts">
import gsap from 'gsap'
import LeftPanel1 from './components/left-panel-1.vue'
import LeftPanel2 from './components/left-panel-2.vue'
import LeftPanel3 from './components/left-panel-3.vue'
import RightPanel1 from './components/right-panel-1.vue'
import RightPanel2 from './components/right-panel-2.vue'
import RightPanel3 from './components/right-panel-3.vue'

definePage({
  meta: {
    isMenu: true,
    menuSort: 1,
    name: '运营中心',
  },
})

const leftPanelRef = ref<HTMLElement | null>(null)
const rightPanelRef = ref<HTMLElement | null>(null)

function playPanelAnimation() {
  // 获取左侧和右侧面板的所有子元素
  const leftPanels = leftPanelRef.value?.children
  const rightPanels = rightPanelRef.value?.children
  if (!leftPanels || !rightPanels) return

  // 左侧面板从左侧依次进入
  gsap.from(leftPanels, {
    x: -300,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out',
  })

  // 右侧面板从右侧依次进入
  gsap.from(rightPanels, {
    x: 300,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power4.out',
  })
}
onMounted(() => {
  playPanelAnimation()
})
</script>

<template>
  <main class="home-wrapper">
    <section ref="leftPanelRef" class="absolute left-10 flex flex-col gap-20">
      <LeftPanel1 />
      <LeftPanel2 />
      <LeftPanel3 />
    </section>

    <section ref="rightPanelRef" class="absolute right-10 flex flex-col gap-20">
      <RightPanel1 />
      <RightPanel2 />
      <RightPanel3 />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.home-wrapper {
  --at-apply: relative;
}
</style>
