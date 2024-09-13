<script setup lang="ts">
import VScaleScreen from 'v-scale-screen'
import { useRequest } from 'alova/client'
import { getExampleAPI } from '@/api/modules/example'

// 使用alova实例创建method并传给useRequest即可发送请求
const { loading, data, error, send, abort } = useRequest(getExampleAPI, {
  immediate: false, // 是否立即发送请求，默认为true
  force: true,
})

function handleSend() {
  abort()
  send()
}
function handleUpdate() {
  data.value = { title: 'new title' }
}
</script>

<template>
  <VScaleScreen width="1920" height="1080" style="background: #02193a">
    <div>
      <div v-if="loading">
        Loading...
      </div>
      <div v-else-if="error">
        {{ error }}
      </div>
      <div>
        <div>请求结果: {{ data }}</div>
        <button class="button" @click="handleSend">
          手动发送请求
        </button>
        <button class="button" @click="handleUpdate">
          手动修改data
        </button>
      </div>
    </div>
  </VScaleScreen>
</template>

<style>
.screen-wrapper {
  /* background: #f5f5f5; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  width: 100px;
  height: 50px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin: 10px;
  background: teal;
}
</style>
