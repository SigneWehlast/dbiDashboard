<script setup>
import ProfileBar from "../components/ProfileBar.vue";
import NavBar from "../components/NavBar.vue";
import OverviewWidget from "../components/OverviewWidget.vue";
import TaskOverview from "../components/TaskOverview.vue";
</script>

<template>
  <div class="home-view">
    <NavBar />
    <div class="home-view-container">
      <ProfileBar />
      <OverviewWidget />
      <TaskOverview />
    </div>
  </div>
</template>

<style scoped lang="scss">

.home-view {
  display: flex;
  gap: 80px;
  width: 100%;
}

.home-view-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

</style>