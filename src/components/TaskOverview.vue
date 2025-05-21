<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
</script>
<template>
  <div class="task-overview">
        <div class="task-overview__information">
            <div class="task-overview__information-nav">
                <h3>Opgaveoverblik</h3>
                <p class="p2">...</p>
            </div>

            <div class="task-overview__information-content">
              <TaskOverviewData :onlyToday="true" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.task-overview {
  align-items: center;
  border-radius: 1.5em;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 1em 0 1em 0;

  &__information {
    background-color: v.$white;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 1.5em;
    padding: 1.5em 2em;

    &-nav {
      display: flex;
      justify-content: space-between;
    }
  }

}
</style>
