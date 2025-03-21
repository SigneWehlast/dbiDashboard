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
                <p class="body-text">Opgaveoverblik</p>
                <p class="body-text">...</p>
            </div>

            <!-- Indhold opdelt i tre kolonner -->
            <div class="Task-Overwiev__Infomation-Content">
                <div class="Task-Infomation__Name">
                    <p class="body-text heading-bar">Titel</p>
                    <div v-for="task in tasks" :key="task.title">
                        <p>{{ task.title }}</p>
                    </div>
                </div>

                <div class="Task-Overwiev__Infomation-Deadline">
                    <p class="body-text heading-bar">Deadline</p>
                    <div v-for="task in tasks" :key="task.deadline">
                        <p>{{ task.deadline }}</p>
                    </div>
                </div>

                <div class="Task-Overwiev__Infomation-Status">
                    <p class="body-text heading-bar">Status</p>
                    <div v-for="task in tasks" :key="task.title" class="status-container">
                        <span class="status-indicator"
                            :class="{ 'status-done': task.status === 'Udført', 'status-overdue': task.status === 'Overskredet' }">
                        </span>
                        <p>{{ task.status }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
@import '../assets/main.scss';
</style>
