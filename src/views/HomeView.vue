<script setup>
import OverviewWidget from "../components/OverviewWidget.vue";
import TaskOverview from "../components/TaskOverview.vue";
</script>

<template>
  <div class="home-view__overview">
      <OverviewWidget />
      <TaskOverview />
  </div>
</template>

<style scoped lang="scss">
.home-view__overview {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

</style>