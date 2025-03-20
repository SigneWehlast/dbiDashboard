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
            <div class="Task-Overwiev__Menubar">
                <p class="body-text">Opgaveoverblik</p>
                <p class="body-text">...</p>
            </div>

            <div class="Task-Overwiev__Infomation-Head">
                <p class="body-text">Titel</p>
                <p class="body-text">Deadline</p>
                <p class="body-text">Status</p>
            </div>

            <div v-for="task in tasks" :key="task.title" class="Task-Overwiev__Infomation-Field">
                <p>{{ task.title }}</p>
                <p>{{ task.deadline }}</p>
                <p>
                    <span class="status-indicator"
                        :class="{ 'status-done': task.status === 'Udført', 'status-overdue': task.status === 'Overskredet' }">
                    </span>
                    {{ task.status }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/main.scss';
</style>
