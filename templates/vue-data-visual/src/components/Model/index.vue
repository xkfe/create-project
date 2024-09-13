<script setup lang="ts">
import iframeUrl from '/unity-model/index.html?url'

onMounted(() => {
  const iframe = document.querySelector('.unity-frame') as HTMLIFrameElement
  iframe.src = iframeUrl
})
</script>

<template>
  <div class="model-container">
    <iframe class="unity-frame" scrolling="no" src="" width="100%" height="100%" style="display: none" onload="this.style.display='block'" />
  </div>
</template>

<style>
.model-container {
  --offset-y: 10px;

  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  transform: translateY(calc(-1 * var(--offset-y)));
}
</style>
