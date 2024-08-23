<script setup lang="ts">
import { useNotify, useToast } from 'wot-design-uni'
import { getExampleApi } from '@/api/modules/example'

const toast = useToast()
const { showNotify } = useNotify()

onMounted(() => {
  // cancel request
  getExampleApi().then((res) => {
    console.log(res)
  })

  setTimeout(() => {
    getExampleApi()
  }, 0)
})
</script>

<route type="home" lang="yaml">
layout: default
style:
  navigationBarTitleText: "首页"
</route>

<template>
  <view
    bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
    text="20 teal"
    center
  >
    123
  </view>
  <view flex flex-col gap-10 px-10 py-20 text-center>
    <wd-button @click="toast.success('操作成功')">
      toast
    </wd-button>
    <wd-button @click="showNotify({ type: 'success', message: '通知内容' })">
      showNotify
    </wd-button>
  </view>
</template>
