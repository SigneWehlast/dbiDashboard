<script setup>
import { ref } from 'vue';

const tasks = ref([
    { title: 'ABA anlæg (Månedlig egenkontrol) BR18/7.5.1.3', deadline: '23.03.2025', status: 'Udført' },
    { title: 'ABA Månedskontrol 6.1', deadline: '19.02.2025', status: 'Overskredet' },
    { title: 'ABV anlæg (Månedlig egenkontrol) BR18/7.5.8.1', deadline: '28.02.2025', status: 'Overskredet' }
]);
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
                <div class="Task-Infomation__Name">
                    <p class="p2 heading-bar">Titel</p>
                    <div v-for="task in tasks" :key="task.title">
                        <p class="p1">{{ task.title }}</p>
                    </div>
                </div>

                <div class="Task-Overwiev__Infomation-Deadline">
                    <p class="p2 heading-bar">Deadline</p>
                    <div v-for="task in tasks" :key="task.deadline">
                        <p class="p1">{{ task.deadline }}</p>
                    </div>
                </div>

                <div class="Task-Overwiev__Infomation-Status">
                    <p class="p2 heading-bar">Status</p>
                    <div v-for="task in tasks" :key="task.title" class="status-container">
                        <span class="status-indicator"
                            :class="{ 'status-done': task.status === 'Udført', 'status-overdue': task.status === 'Overskredet' }">
                        </span>
                        <p class="p1">{{ task.status }}</p>
                    </div>
                </div>
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
.Task-Infomation__nav{
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

.Task-Overwiev__Infomation-Content {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.Task-Infomation__Name {
  display: flex;
  flex-direction: column;
  width: 55%;
  gap: 20px;

}

.Task-Overwiev__Infomation-Deadline{
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 20px;
}

.Task-Overwiev__Infomation-Status {
  display: flex;
  flex-direction: column;
  width: 15%;
  gap: 20px;
}

.status-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-done {
  background-color: #5AEA62;
}

.status-overdue {
  background-color: #FF3838;
}

.heading-bar{
  border-top: 1px solid #DADCDC;
  border-bottom: 1px solid #DADCDC;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
