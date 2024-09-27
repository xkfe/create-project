<script setup>
// import zPaging from 'z-paging/components/z-paging/z-paging.vue'

const props = defineProps(['tabIndex', 'currentIndex'])

const pagingRef = ref(null)
const dataList = ref([])

// 当前组件是否已经加载过了
const firstLoaded = ref(false)
// 是否滚动到当前页
const isCurrentPage = ref(false)

watch(
  () => props.currentIndex,
  (newVal) => {
    if (newVal === props.tabIndex) {
      if (!firstLoaded.value) {
        setTimeout(() => {
          isCurrentPage.value = true
        }, 100)
      }
    }
  },
  { immediate: true },
)

function queryList(pageNo, pageSize) {
  console.log('pageNo, pageSize :>> ', pageNo, pageSize)
  const mockList = Array.from(({ length: 30 }), (_, i) => ({ title: i, detail: `测试信息${i}` }))
  pagingRef.value.complete(mockList)
}
</script>

<template>
  <view class="content">
    <!--  :enable-back-to-top="currentIndex===tabIndex" 在微信小程序上可以多加这一句，因为默认是允许点击返回顶部的，但是这个页面有多个scroll-view，会全部返回顶部，所以需要控制是当前index才允许点击返回顶部 -->
    <!-- 如果当前页已经加载过数据或者当前切换到的tab是当前页，才展示当前页数据（懒加载） -->
    <z-paging v-if="firstLoaded || isCurrentPage" ref="pagingRef" v-model="dataList" :fixed="false" @query="queryList">
      <view v-for="(item, index) in dataList" :key="index" class="item">
        <view class="item-title">
          {{ item.title }}
        </view>
        <view class="item-detail">
          {{ item.detail }}
        </view>
        <view class="item-line" />
      </view>
    </z-paging>
  </view>
</template>

<style>
/* 注意:父节点需要固定高度，z-paging的height:100%才会生效 */
.content {
height: 100%;
}

.item {
  position: relative;
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rpx 30rpx;
}

.item-detail {
  padding: 5rpx 15rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: white;
  background-color: #007AFF;
}

.item-line {
  position: absolute;
  bottom: 0rpx;
  left: 0rpx;
  height: 1px;
  width: 100%;
  background-color: #eeeeee;
}
</style>
