<script setup lang="ts">
import SwiperListItem from '@/components/swiper-list-item/swiper-list-item.vue'

const tabList = ['测试1', '测试2', '测试3', '测试4']
const current = ref(0)
</script>

<route lang="yaml">
style:
  navigationBarTitleText: "z-padding demo"
</route>

<template>
  <view class="demos-page h-full">
    <z-paging-swiper>
      <template #top>
        <wd-tabs v-model="current" animated swipeable>
          <wd-tab v-for="(item, index) in tabList" :key="index" :title="`${item}`">
            <SwiperListItem :tab-index="index" :current-index="current" />
          </wd-tab>
        </wd-tabs>
      </template>
    </z-paging-swiper>
  </view>
</template>

<style>
.wd-tabs{
  --at-apply: flex flex-col h-full;
}
.wd-tabs__container {
  flex: 1
}
.wd-tab__body {
  height: 100%;
}
</style>
