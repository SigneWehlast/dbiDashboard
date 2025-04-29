<script setup>
import { onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});

const todayStr = new Date().toDateString();

function isToday(date) {
  if (!date) return false;
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  return d.toDateString() === todayStr;
}

const totalTasks = computed(() =>
  taskStore.tasks.filter(task => {
    return isToday(task.deadline) || task.status.toLowerCase() === 'overskredet';
  }).length
);

const totalDeadlines = computed(() =>
  taskStore.tasks.filter(task => {
    const status = task.status.toLowerCase();
    return (isToday(task.deadline) && status === 'igangværende') || status === 'overskredet';
  }).length
);

const totalReports = computed(() => taskStore.tasks.length);

// Midlertidige værdier for Rapporter og Objekter
const totalObjects = computed(() => 0);
</script>


<template>
  <div class="widget-menu">
    <div class="widget-menu__box">
      <p class="p1">Opgaver</p>
      <h2>{{ totalTasks }}</h2>
    </div>
    <div class="divider"></div>

    <div class="widget-menu__box">
      <p class="p1">Deadlines</p>
      <h2>{{ totalDeadlines }}</h2>
    </div>
    <div class="divider"></div>

    <div class="widget-menu__box">
      <p class="p1">Rapporter</p>
      <h2>{{ totalReports }}</h2>
    </div>
    <div class="divider"></div>

    <div class="widget-menu__box">
      <p class="p1">Objekter</p>
      <h2>{{ totalObjects }}</h2>
    </div>
  </div>
</template>


<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.widget-menu {
  align-items: center;
  background-color: v.$white;
  border-radius: 1.5em;
  display: flex;
  justify-content: space-between;
  padding: 1.5em 4.3em;

  &__box {
    align-items: center;
    display: flex;
    gap: 2.5em;
    height: 1em;
    justify-content: center;
    text-align: center;
  }
}

.divider {
  height: 5em;
  width: 0.06em;
  background-color: #DADCDC;
}
</style>
