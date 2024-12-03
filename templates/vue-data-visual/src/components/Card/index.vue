<script setup lang="ts">

</script>

<template>
  <div class="card">
    <section class="card-header" />
    <section class="card-body">
      <span class="angle angle-top" />
      <span class="angle angle-bottom" />
      <span class="angle angle-left" />
      <span class="angle angle-right" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.card-body {
  --at-apply: relative z-10 flex justify-center items-center w-300 h-300 bg-#fff;
}
.angle {
  --at-apply: absolute w-20 h-20 bg-#fff;
}
</style>
