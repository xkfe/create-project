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

<route type="home" lang="yaml">
style:
  navigationBarTitleText: "hooks示例"
</route>

<template>
  <view class="hooks-container">
    <view class="hooks-item" @click="useConfirmExample">
      useConfirm
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hooks-container {
  --at-apply: w-full h-auto bg-#F5F5F5 p-12 grid grid-cols-2 gap-12;
}
.hooks-item {
  --at-apply: text-center px-12 py-8 font-700 color-#333 rounded-6 shadow-[0px_0px_34px_0px_rgba(0,0,0,0.09)];
}
</style>
