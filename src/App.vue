<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import ProfileBar from '@/components/ProfileBar.vue';
import NavBar from '@/components/NavBar.vue';
import PageFooter from './components/PageFooter.vue';

const route = useRoute();
const layout = ref('default');

// Reager på ændring i route meta
watch(() => route.meta.layout, (newLayout) => {
  layout.value = newLayout || 'default';
}, { immediate: true });
</script>

<template>
   <div v-if="layout !== 'empty'" class="home-view">
    <NavBar />
    <div class="home-view-container">
      <ProfileBar />
      <RouterView />
      <PageFooter />
    </div>
  </div>

  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  gap: 5em;
  width: 100%;
}

.home-view-container {
  display: flex;
  flex-direction: column;
  gap: 2.5em;
  width: 100%;
}
</style>
