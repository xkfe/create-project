<script lang="ts" setup>
const value = ref(new Date())
</script>

<template>
  <el-calendar v-model="value" />
</template>
