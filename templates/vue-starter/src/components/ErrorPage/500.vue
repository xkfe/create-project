<!--
 * @Author: 小凯同学
 * @Date: 2025-03-10 21:01:47
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 22:17:20
 * @Description:
-->
<script setup lang="ts" name="500">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="not-container">
    <img src="" class="not-img" alt="500">
    <div class="not-detail">
      <h2>500</h2>
      <h4>抱歉，您的网络不见了~🤦‍♂️🤦‍♀️</h4>
      <el-button type="primary" @click="router.back">
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './index.scss';
</style>
