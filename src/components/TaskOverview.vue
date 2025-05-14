<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
</script>
<template>
  <div class="task-overview">
        <div class="task-overview__information">
            <!-- Navigation øverst -->
            <div class="task-overview__information__nav">
                <h3>Opgaveoverblik</h3>
                <p class="p2">...</p>
            </div>

            <!-- Indhold opdelt i tre kolonner -->
            <div class="task-overview__information__content">
              <TaskOverviewData :onlyToday="true" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.task-overview {
  align-items: center;
  border-radius: 1.5em;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 1.5em 0 1.5em 0;

  &__information {
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    border-radius: 1.5em;
    padding: 1.5em 2em;

    &__nav {
      display: flex;
      justify-content: space-between;
    }
  }

}
</style>
