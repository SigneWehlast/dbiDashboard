<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
    <div class="schedule-overview">
    <h1>Skemaer</h1>
    <button class="p2 btn-skema">+ Nyt Skema</button>
    </div>

    <div class="task-overview">
        <div class="task-overview__information">
            <!-- Navigation øverst -->
            <div class="task-overview__information__nav">
            <SearchBar />
                <p class="p2">Filtre</p>
            </div>

            <!-- Indhold opdelt i tre kolonner -->
            <div class="task-overview__information__content">
              <TaskOverviewData />
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.task-overview{
  background-color: v.$white;
  border-radius: 1.5em;
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 4em 0em 4em 0em;
  width: 100%;


  &__information {
    background-color: v.$white;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;

    &__nav {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.6em;
    }

    &__content {
      display: flex;
      flex: 1;
      flex-direction: row;
    }
  }
}

.schedule-overview{
    display: flex;
    justify-content: space-between;
    padding-bottom: 5em;
    padding-top: 5em;
}

.btn-skema{
    background-color: v.$main-blue;
    border-style: none;
    border-radius: 1em;
    color: v.$white;
    height: 75%;
    width: 25%;
}
</style>
