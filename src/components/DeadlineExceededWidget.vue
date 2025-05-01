<script setup>
import { onMounted, computed } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';

const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks(); // Fetch tasks when component is mounted
});

const todayStr = new Date().toDateString();

function isToday(date) {
  if (!date) return false;
  const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
  return d.toDateString() === todayStr;
}

// Computed property for overdue deadlines
const totalDeadlines = computed(() =>
  taskStore.tasks.filter(task => {
    const status = task.status.toLowerCase();
    return (isToday(task.deadline) && status === 'igangværende') || status === 'overskredet';
  }).length
);
</script>

<template>
    <div class="deviation-PerMonth">
      <div class="top-section">
        <h3>Overskredet deadline</h3>
        <p class="p1">...</p> <!--Indsæt icon her-->
      </div>
      <div class="content">
        <h2>{{ totalDeadlines }}</h2>
        <p class="p1">Opgaver</p>
      </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.deviation-PerMonth {
  background-color: v.$white;
  height: 25rem;
  width: 35%;
  border-radius: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}
  .top-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  }

.content {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;
  }
</style>
