<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
import SearchBar from '@/components/SearchBar.vue';
</script>

<template>
    <div class="Skema-Overwiev">
    <h1>Skemaer</h1>
    <button class="p2 btn-skema">+ Nyt Skema</button>
    </div>

    <div class="Task-Overwiev">
        <div class="Task-Overwiev__Infomation">
            <!-- Navigation øverst -->
            <div class="Task-Infomation__nav">
            <SearchBar />
                <p class="p2">Filtre</p>
            </div>

            <!-- Indhold opdelt i tre kolonner -->
            <div class="Task-Overwiev__Infomation-Content">
              <TaskOverviewData />
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.Task-Overwiev {
  background-color: #ffffff;
  border-radius: 25px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  padding-top: 2em;
}

.Task-Overwiev__Infomation {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
}

.Task-Infomation__nav {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

.Task-Overwiev__Infomation-Content {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.Skema-Overwiev{
    display: flex;
    justify-content: space-between;
    padding-bottom: 5em;
    padding-top: 5em;
}

.btn-skema{
    width: 234px;
    height: 71px;
    background-color: #2B7393;
    border-radius: 25px;
}
</style>
