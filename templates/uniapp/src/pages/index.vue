<script setup lang="ts">
import { useNotify, useToast } from 'wot-design-uni'

const toast = useToast()
const { showNotify } = useNotify()
</script>

<template>
  <view px-10 py-20 text-center>
    123
  </view>
  <view
    bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
    text="sm teal"
    center
  >
    <wd-button @click="toast.success('操作成功')">
      toast
    </wd-button>
    <wd-button @click="showNotify({ type: 'success', message: '通知内容' })">
      showNotify
    </wd-button>
  </view>
</template>
