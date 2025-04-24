<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
</script>

<template>
    <div class="Skema-Overwiev">
    <h1 class="h1">Skemaer</h1>
    <button class="p2 btn-skema">Nyt Skema</button>
    </div>

    <div class="Task-Overwiev">
        <div class="Task-Overwiev__Infomation">
            <!-- Navigation øverst -->
            <div class="Task-Infomation__nav">
                <p class="h3">Indsæt search comp her</p>
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
  height: 523px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.Task-Overwiev__Infomation {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 314px;
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
