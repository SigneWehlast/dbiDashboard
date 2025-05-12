<script setup>
import { onMounted, computed } from 'vue';
import { scheduleStore } from '@/stores/ScheduleStore';

const scheduleStore = scheduleStore();

onMounted(async () => {
  await scheduleStore.fetchTasks();
});

const completedTasks = computed(() =>
  scheduleStore.tasks.filter(task => task.status.toLowerCase() === 'udført')
);
</script>

<template>
  <table>
      <thead>
        <tr>
          <th class="p2 heading-bar">Skema</th>
          <th class="p2 heading-bar">Dato</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in completedTasks" :key="task.id">
          <td class="p1">{{ task.title }}</td>
          <td class="p1">{{ task.deadline }}</td>
        </tr>
      </tbody>
    </table>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

table {
  background-color: v.$white;
  border-collapse: collapse;
  margin-top: 1em;
  text-align: left;
  border-radius: 1.5em;
  width: 100%;
}

th, td {
  padding: 0.75em 0;
}

.heading-bar {
  border-bottom: 1px solid #DADCDC;
  border-top: 1px solid #DADCDC;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
