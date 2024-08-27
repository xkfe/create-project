<script setup lang="ts">
import { useNotify, useToast } from 'wot-design-uni'
import { getExampleApi } from '@/api/modules/example'
import { useHandleData } from '@/hooks/useHandleData'

const toast = useToast()
const { showNotify } = useNotify()

function testApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('promise resolve')
    }, 1000)
  })
}

function deleteHandle() {
  useHandleData(testApi, { id: 1 }, '删除')
}

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
style:
  navigationBarTitleText: "首页"
</route>

<template>
  <view px-2 py-20>
    <view
      mx-auto h-56 w-300 center overflow-hidden rounded-8 transition-all duration-200 ease-in-out
      shadow="[0_2px_10px_rgba(0,0,0,.1)]"
      flex="~ col"
      border="~ 1 solid #E8E8E8"
      bg="#FFF"
      hover="rounded-10 scale-110"
    >
      <view
        class="bg-custom-gradient"
        bg="transparent clip-text!"
        text="20 center"
        font="600 [--font-family-base]"
        color="[rgba(0,169,142,0.3)]"
      >
        unocss attributify example
      </view>
    </view>

    <view mt-30 flex gap-5 text-center>
      <wd-button @click="toast.success('操作成功')">
        toast
      </wd-button>
      <wd-button type="success" @click="showNotify({ type: 'success', message: '通知内容' })">
        showNotify
      </wd-button>

      <wd-button type="warning" @click="deleteHandle">
        useHandleData
      </wd-button>
    </view>
  </view>
</template>

<style>
.bg-custom-gradient {
  background: linear-gradient(120deg, rgb(0, 169, 142) 30%, #009ff7);
}

.animation {
  border-radius: 100%;
  animation: ripple 0.6s linear infinite;
}
@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 169, 142,0.1), 0 0 0 30px rgba(0, 169, 142,0.1), 0 0 0 40px rgba(0, 169, 142,0.1), 0 0 0 60px rgba(0, 169, 142,0.1);
  }

  100% {
    box-shadow: 0 0 0 20px rgba(0, 169, 142,0.1), 0 0 0 40px rgba(0, 169, 142,0.1), 0 0 0 60px rgba(0, 169, 142,0.1), 0 0 0 80px rgba(255, 255, 255, 0);
  }
}
</style>
