<script setup>
import ProfileBar from '@/components/ProfileBar.vue';
import NavBar from '@/components/NavBar.vue';
import PageFooter from './components/PageFooter.vue';
</script>

<template>
    <div class="home-view">
      <NavBar />
      <div class="home-view-container">
        <ProfileBar />
        <RouterView />
    </div>

    </div>

<div>
  <PageFooter />
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
