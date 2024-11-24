<script setup lang="ts">
import microApp from '@micro-zoe/micro-app'
import { MicroAppName } from '@/config'

const MODEL_INDEX_URL = '/unity-model/index.html'

function sendUnityData() {
  microApp.setData(MicroAppName, { modelVal: '来自父应用的数据' })
}
function handleModelData(e: any) {
  console.log('microApp :>> ', microApp)
  console.log('来自子应用的数据：', e.detail.data?.modelVal)
}
</script>

<template>
  <div class="model-container">
    <button class="absolute left-1/2 top-100 z-10 translate-x--1/2 cursor-pointer bg-teal px-12 py-20 text-20 color-white" @click="sendUnityData">
      传递给子应用数据
    </button>
    <micro-app :name="MicroAppName" :url="MODEL_INDEX_URL" keep-alive @datachange="handleModelData" />
  </div>
</template>

<style>
.model-container {
  --offset-y: 10px;

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transform: translateY(calc(-1 * var(--offset-y)));
}
</style>
