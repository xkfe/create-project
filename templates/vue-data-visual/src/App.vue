<script setup lang="ts">
import { useContain } from '@/hooks/useContain'
import Model from '@/components/Model/index.vue'

// import { useRequest } from 'alova/client'
// import { getExampleAPI } from '@/api/modules/example'

// const { loading, data, error, send, abort } = useRequest(getExampleAPI, {
//   immediate: false, // 是否立即发送请求，默认为true
//   force: true,
// })
const preReady = ref(true)
const appContentRef = ref<HTMLElement>()

useContain({
  el: appContentRef,
  designWidth: 1920,
  designHeight: 1080,
})
</script>

<template>
  <div class="app-container">
    <div ref="appContentRef" class="app-content">
      <Model />
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
  background-color: #02193a;
}

.app-container .app-content {
  overflow: hidden;
}
</style>
