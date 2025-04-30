<script setup>
import { onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';

const taskStore = useTaskStore();

onMounted(async () => {
  await taskStore.fetchTasks();
});

const completedTasks = computed(() =>
  taskStore.tasks.filter(task => task.status.toLowerCase() === 'udført')
);
</script>

<template>
  <table>
      <thead>
        <tr>
          <th class="h3">Skema</th>
          <th class="h3">Dato</th>
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
  border-left: 1px solid v.$main-blue;
  border-right: 1px solid v.$main-blue;
  margin-top: 1em;
  text-align: left;
  width: 100%;

}

th, td {
  border-bottom: 1px solid v.$main-blue;
  border-top: 1px solid v.$main-blue;
  padding: 0.75em;
}

.h3 {
    color: v.$dark-grey;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin: 0;
}
</style>
