<script setup>
import { onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

const tasksDonePerMonth = computed(() => {
  const counts = {};

  taskStore.tasks.forEach(task => {
    if (!task.status || task.status.toLowerCase() !== 'udført') return;

    const date = task.deadline;
    if (!date) return;

    const d = date instanceof Date ? date : date.toDate?.() || new Date(date);

    const month = d.toLocaleString('da-DK', { month: 'long' });
    const year = d.getFullYear();
    const label = `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;


    counts[label] = (counts[label] || 0) + 1;
  });

  return counts;
});
</script>

<template>
  <div class="ReportPerMonth">
    <div class="top-section">
    <p class="p1">Rapporter pr. måned</p>
    <p class="p1">...</p> <!--Indsæt icon her-->
    </div>
    <div class="content">
      <ul>
  <li v-for="(count, month) in tasksDonePerMonth" :key="month">
    {{ month }}: {{ count }}
  </li>
</ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.ReportPerMonth{
  background-color: v.$white;
  height: 25rem;
  width: 60%;
  border-radius: 1.5em;

  }

  .top-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  }
</style>