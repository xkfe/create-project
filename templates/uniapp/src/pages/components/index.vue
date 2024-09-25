<script setup lang="ts">

</script>

<route lang="yaml">
style:
  navigationBarTitleText: "组件示例"
</route>

<template>
  <view class="components-page">
    <view class="components-container">
      <view class="card">
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
