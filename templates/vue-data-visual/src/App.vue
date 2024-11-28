<script setup lang="ts">
import { ready as preloadReady } from './preload'
import { useContain } from '@/hooks/useContain'

import LayoutHeader from '@/layout/Header.vue'
// import WebGLModel from '@/components/WebGLModel/index.vue'

// import { useRequest } from 'alova/client'
// import { getExampleAPI } from '@/api/modules/example'

// const { loading, data, error, send, abort } = useRequest(getExampleAPI, {
//   immediate: false, // 是否立即发送请求，默认为true
//   force: true,
// })
const preReady = ref(false)
const appContentRef = ref<HTMLElement>()

Promise.all([preloadReady]).then(() => {
  preReady.value = true
})

useContain({
  el: appContentRef,
  designWidth: 1920,
  designHeight: 1080,
})
</script>

<template>
  <div class="app-container">
    <div ref="appContentRef" class="app-content">
      <LayoutHeader />
      <!-- <WebGLModel /> -->
      <RouterView v-if="preReady" v-slot="{ Component }">
        <Transition name="fade-scale">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style>
.app-container {
  width: 100%;
  height: 100%;
  position: absolute;
}

.app-container .app-content {
  position: relative;
  overflow: hidden;
  background-image: url('@/assets/images/container-bg.jpg');
}
</style>
