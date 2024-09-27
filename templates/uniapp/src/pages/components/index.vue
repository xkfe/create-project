<script setup lang="ts">
function navigateTo(url: string) {
  uni.navigateTo({ url })
}
</script>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "组件示例",
    "disableScroll": false
  }
}
</route>

<template>
  <view class="components-page">
    <view class="components-container">
      <view class="card" @click="navigateTo('/pages/components/demos/z-padding')">
        z-paging
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.components-page {
  --at-apply: h-full bg-#F5F5F5;
}
.components-container {
  --at-apply: w-full h-auto p-12 grid grid-cols-2 gap-12;
}
</style>
