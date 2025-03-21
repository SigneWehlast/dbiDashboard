<script setup>
import ProfileBar from "../components/ProfileBar.vue";
import NavBar from "../components/NavBar.vue";
import OverviewWidget from "../components/OverviewWidget.vue";
import TaskOverwiev from "../components/TaskOverwiev.vue";
</script>

<template>
  <div class="home-view">
    <NavBar />
    <ProfileBar />

    <OverviewWidget />

  <TaskOverwiev />
  </div>
</template>

<style scoped lang="scss">

.home-view {
  display: flex;
  gap: 80px;
}

</style>