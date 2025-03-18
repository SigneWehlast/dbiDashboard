<script setup>
import ProfileBar from "../components/ProfileBar.vue";
import NavBar from "../components/NavBar.vue";
</script>

<template>
  <div class="home-view">
    <NavBar />
    <ProfileBar />
  </div>
</template>

<style scoped lang="scss">

.home-view {
  display: flex;
  gap: 80px;
}

</style>