<script setup>
import { onMounted, computed } from 'vue';
import { useScheduleStore } from '@/stores/ScheduleStore';

//bruger schedule store
const scheduleStore = useScheduleStore();

//henter alle skemaerne
onMounted(async () => {
  await scheduleStore.fetchTasks();
});

//filtrerer og viser kun de skemaer, der er udført
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
          <router-link :to="`/Specific/${task.id}`" class="p1 routerlink">
          {{ task.title }}
          </router-link>               
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
  border-radius: 1.5em;
  margin-top: 1em;
  text-align: left;
  width: 100%;
}

th, td {
  padding: 0.75em 0;
}
</style>
