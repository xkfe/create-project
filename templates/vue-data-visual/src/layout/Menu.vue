<script setup lang="ts">
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()
const menuItemRefs = ref<HTMLElement[]>([])
const menuIcons = [
  [
    new URL('@/assets/images/menu-icon-active.png', import.meta.url).href,
    new URL('@/assets/images/menu-icon.png', import.meta.url).href,
  ],
  [
    new URL('@/assets/images/menu-icon-active.png', import.meta.url).href,
    new URL('@/assets/images/menu-icon.png', import.meta.url).href,
  ],
  [
    new URL('@/assets/images/menu-icon-active.png', import.meta.url).href,
    new URL('@/assets/images/menu-icon.png', import.meta.url).href,
  ],
  [
    new URL('@/assets/images/menu-icon-active.png', import.meta.url).href,
    new URL('@/assets/images/menu-icon.png', import.meta.url).href,
  ],
]
const routes = computed(() => router.getRoutes()?.filter(item => item.meta?.isMenu).sort((a, b) => (a.meta.menuSort || 0) - (b.meta.menuSort || 0)))
const finalRoutes = computed(() => {
  return routes.value.map((item, index) => ({
    ...item,
    meta: {
      ...item.meta,
      icon: menuIcons[index],
    },
  }))
})

function changeMenu(item) {
  router.push(item.path)
}

function playMenuAnimation() {
  gsap.fromTo(
    menuItemRefs.value,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      delay: 1.1,
    },
  )
}
onMounted(() => {
  playMenuAnimation()
})
</script>

<template>
  <ul class="layout-menu">
    <li v-for="item in finalRoutes" ref="menuItemRefs" :key="item.path" class="menu-item" :class="{ active: item.path === route.path }" @click="changeMenu(item)">
      <div class="icon-wrap">
        <img :src="item.meta?.icon?.[0]" alt="menu-icon" class="menu-icon" :class="{ hidden: item.path !== route.path }">
        <img :src="item.meta?.icon?.[1]" alt="menu-icon" class="menu-icon" :class="{ hidden: item.path === route.path }">
        <img src="@/assets/images/menu-icon-roll.png" alt="icon-roll" class="icon-roll" :class="{ hidden: item.path !== route.path }">
      </div>
      <h3 class="menu-item-title">
        {{ item.meta.name }}
      </h3>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.layout-menu {
  --at-apply: flex gap-50;
  .menu-item {
    --at-apply: flex flex-col items-center cursor-pointer;
    &:hover .icon-wrap {
      transform: translateY(-12px);
    }
  }
  .menu-item-title {
    --at-apply: flex flex-col items-center mt-18 text-center font-700 color-#b7caff transition-all
      transition-duration-300;
  }
  .icon-wrap {
    --at-apply: w-80 h-80 flex items-center justify-center relative rounded-1/2 backdrop-blur-4;
    transition: all 0.3s;
  }
  .menu-icon {
    --at-apply: w-full h-full absolute top-0 left-0;
  }
  .icon-roll {
    --at-apply: w-104 h-104 max-w-unset absolute top--12 left--12 opacity-0;
  }
  .active {
    .icon-wrap {
      transform: translateY(-12px);
    }
    .icon-roll {
      transition: opacity 0.3s;
      animation: rotate 5s linear infinite;
      opacity: 1;
    }
    .menu-item-title {
      color: #bdf8ff;
      transform: scale(1.25);
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
