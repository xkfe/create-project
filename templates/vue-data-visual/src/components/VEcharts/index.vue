<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { toMerged } from 'es-toolkit'
import { castArray } from 'es-toolkit/compat'
import * as defaults from './defaults'

const props = defineProps<{
  option: EChartsOption
}>()

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

provide(THEME_KEY, 'light')

const chartRef = ref<InstanceType<typeof VChart>>()

const chartInstance = computed(() => chartRef.value)
const chartOptions = computed<EChartsOption>(() => {
  return {
    ...props.option,
    // props.options.grid 仅允许一个值，即对象，不允许数组
    grid: toMerged(defaults.grid, props.option.grid || {}),
    legend: toMerged(defaults.legend, props.option.legend || {}),
    tooltip: toMerged(defaults.tooltip, props.option.tooltip || {}),
    xAxis: castArray(props.option.xAxis).map(xAxis => toMerged(defaults.xAxis, xAxis)),
    yAxis: castArray(props.option.yAxis).map(yAxis => toMerged(defaults.yAxis, yAxis)),
  }
})

defineExpose({
  chartInstance,
})
</script>

<template>
  <VChart ref="chartRef" class="chart" :option="chartOptions" v-bind="$attrs" />
</template>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  flex: 1;
}
</style>
