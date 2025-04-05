<!-- <script setup lang="ts">

</script> -->

<template>
  <NavBar />
  
  <transition :name="currentTransition" mode="out-in">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </RouterView>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()
const currentTransition = computed(() => 
  route.meta.transitionName || 'fade'
)
</script>

<style>
/* 添加过渡动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform 0.3s;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 0.3s;
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

.zoom-enter-active, .zoom-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.zoom-enter-from {
  transform: scale(0);
  opacity: 0;
}
.zoom-leave-to {
  transform: scale(1.2);
  opacity: 0;
}
</style>