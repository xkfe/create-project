<script setup lang="ts">
import { useMessage } from 'wot-design-uni'
import { useConfirm } from '@/hooks/useConfirm'

const messageBox = useMessage()
function useConfirmExample() {
  useConfirm({
    title: '温馨提示',
    message: '退出',
    messageBox,
  }).then((res) => {
    console.log('res :>> ', res)
  }).catch((error) => {
    console.log('error :>> ', error)
  })
}
</script>

<route lang="yaml">
style:
  navigationBarTitleText: "hooks示例"
</route>

<template>
  <view class="hooks-page">
    <view class="hooks-container">
      <view class="card" @click="useConfirmExample">
        useConfirm
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hooks-page {
  --at-apply: h-full bg-#F5F5F5;
}
.hooks-container {
  --at-apply: w-full h-auto p-12 grid grid-cols-2 gap-12;
}
</style>
