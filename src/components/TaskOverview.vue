<script setup>
import TaskOverviewData from '@/components/TaskOverviewData.vue';
</script>
<template>
  <div class="Task-Overwiev">
        <div class="Task-Overwiev__Infomation">
            <!-- Navigation øverst -->
            <div class="Task-Infomation__nav">
                <p class="h3">Opgaveoverblik</p>
                <p class="p2">...</p>
            </div>

            <!-- Indhold opdelt i tre kolonner -->
            <div class="Task-Overwiev__Infomation-Content">
              <TaskOverviewData :onlyToday="true" />
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
</style>
