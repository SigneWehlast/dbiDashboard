<script setup>
import { onMounted, computed } from 'vue';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useObjectStore } from '@/stores/ObjectStore';

const scheduleStore = useScheduleStore();
const objectStore = useObjectStore();

//henter skemaer og objekter, når siden er indlæst
onMounted(() => {
  scheduleStore.fetchTasks();
  objectStore.fetchObjects();
});

const todayStr = new Date().toDateString();

//tjekker om datoen er i dag
function isToday(date) {
  if (!date) return false;
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  return d.toDateString() === todayStr;
}

//finder alle skemaer, der er overskredet
const totalTasks = computed(() =>
  scheduleStore.tasks.filter(task => {
    return isToday(task.deadline) || task.status.toLowerCase() === 'overskredet';
  }).length
);

//skriver antal af overskredne deadlines + igangværende, hvis det er i dag
const totalDeadlines = computed(() =>
  scheduleStore.tasks.filter(task => {
    const status = task.status.toLowerCase();
    return (isToday(task.deadline) && status === 'igangværende') || status === 'overskredet';
  }).length
);

//alle udførte rapporter
const totalReports = computed(() =>
  scheduleStore.tasks.filter(task => task.status === 'Udført').length
);

//alle objekter
const totalObjects = computed(() => objectStore.objects.length);
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
  background-color: v.$header-color;
  height: 5em;
  width: 0.06em;
}
</style>
