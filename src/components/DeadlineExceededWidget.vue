<script setup>
import { onMounted, computed } from 'vue';
import { useScheduleStore } from '@/stores/ScheduleStore';

const scheduleStore = useScheduleStore();

onMounted(() => {
  scheduleStore.fetchTasks();
});

const todayStr = new Date().toDateString();

//tjekker om datoen er i dag
function isToday(date) {
  if (!date) return false;
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  return d.toDateString() === todayStr;
}

//skriver antal af overskredne deadlines + igangværende, hvis det er i dag
const totalDeadlines = computed(() =>
  scheduleStore.tasks.filter(task => {
    const status = task.status.toLowerCase();
    return (isToday(task.deadline) && status === 'igangværende') || status === 'overskredet';
  }).length
);
</script>

<template>
    <div class="deviation-permonth">
      <div class="deviation-permonth__top-section">
        <h3>Overskredet deadline</h3>
        <p class="p1">...</p>
      </div>
      <div class="deviation-permonth__content">
        <h2>{{ totalDeadlines }}</h2>
        <p class="p1">Opgaver</p>
      </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.deviation-permonth {
  align-items: center;
  background-color: v.$white;
  border-radius: 1.5em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 25rem;
  justify-content: flex-start;
  padding: 2rem;
  width: 35%;

  &__top-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  }

  &__content {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 7rem;
  }
}
</style>
