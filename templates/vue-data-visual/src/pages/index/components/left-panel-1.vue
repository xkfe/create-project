<script setup lang="ts">
// import Card from '@/components/Card/index.vue'
import vPull from 'ufuse/src/directives/vPull'
import VEcharts from '@/components/VEcharts/index.vue'

const option = {
  legend: {
    data: ['Sales'],
  },
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Sales',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
    },
  ],
}
</script>

<template>
  <div v-pull="{ delay: 300 }" class="h-300 w-300">
    <!-- <Card /> -->
    <VEcharts :option="option" />
  </div>
</template>

<style lang="scss" scoped>

</style>
