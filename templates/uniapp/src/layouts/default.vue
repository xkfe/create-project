<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: '', // 或者 styles/variate.scss 中定义的变量名
}
</script>

<script lang="ts">
export default {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，可以去掉微信小程序自定义组件多出的最外层标签
  options: {
    virtualHost: true,
  },
}
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-toast />
    <wd-notify />
    <wd-message-box />
  </wd-config-provider>
</template>
