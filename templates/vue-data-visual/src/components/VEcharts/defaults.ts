import type { EChartsOption } from 'echarts'

export const grid = { top: 30, left: 16, bottom: 16, right: 16, containLabel: true } as Exclude<EChartsOption['grid'], undefined>

export const legend = {
  inactiveColor: '#92A1A9',
} as Exclude<EChartsOption['legend'], undefined>

export const tooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
    label: {
      backgroundColor: '#02C9F2',
    },
  },
  // padding: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderWidth: 0,
  appendToBody: true,
} as Exclude<EChartsOption['tooltip'], undefined>

export const xAxis = {
  axisTick: { show: false },
  axisLabel: {
    color: '#fff',
    fontSize: 12,
    margin: 10,
    // fontFamily: 'Source Han Sans CN',
    // fontWeight: 'bold',
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(38,139,255,0.1)',
      width: 2,
    },
  },
  splitLine: {
    lineStyle: { color: 'rgba(38,139,255,0.2)' },
  },
} as Exclude<EChartsOption['xAxis'], undefined>

export const yAxis = {
  nameGap: 14,
  nameTextStyle: {
    // fontFamily: 'Source Han Sans CN',
    fontSize: 12,
  },
  axisLabel: {
    color: '#fff',
    fontSize: 12,
    // fontFamily: 'Source Han Sans CN',
    // fontWeight: 'bold',
    margin: 11,
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: 'rgba(38,139,255,0.1)',
      width: 2,
    },
  },
  splitLine: {
    lineStyle: { color: 'rgba(38,139,255,0.2)' },
  },
  axisPointer: {
    show: false,
  },
} as Exclude<EChartsOption['yAxis'], undefined>
