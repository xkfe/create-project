<script setup lang="ts">
import VScaleScreen from 'v-scale-screen'
import Model from '@/components/Model/index.vue'

// import { useRequest } from 'alova/client'
// import { getExampleAPI } from '@/api/modules/example'

// const { loading, data, error, send, abort } = useRequest(getExampleAPI, {
//   immediate: false, // 是否立即发送请求，默认为true
//   force: true,
// })
const preReady = ref(true)
</script>

<template>
  <VScaleScreen width="1920" height="1080" style="background: #02193a">
    <Model />
    <RouterView v-if="preReady" />
  </VScaleScreen>
</template>

<style>
.app-container {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #02193a;

  .app-content {
    overflow: hidden;
  }
}
</style>
