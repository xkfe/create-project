<!--
 * @Author: 小凯同学
 * @Date: 2025-03-10 19:11:21
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 22:09:57
 * @Description:
-->
<script setup lang="ts">
// import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// element language
const locale = computed(() => zhCn)

// element assemblySize
const assemblySize = computed(() => 'default')

// element button config
const buttonConfig = reactive({ autoInsertSpace: false })
</script>

<template>
  <el-config-provider :locale="locale" :size="assemblySize" :button="buttonConfig">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
