<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Registrér nødvendige komponenter
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const taskStore = useTaskStore();
const chartCanvas = ref(null);
let chartInstance = null;

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

// Opdater chart når data ændrer sig
watch(tasksDonePerMonth, (newData) => {
  const labels = Object.keys(newData);
  const data = Object.values(newData);

  if (chartInstance) chartInstance.destroy(); // Fjern tidligere instans

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Antal udførte opgaver',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
</script>


<template>
  <div class="ReportPerMonth">
    <div class="top-section">
    <p class="p1">Rapporter pr. måned</p>
    <p class="p1">...</p> <!--Indsæt icon her-->
    </div>
    <div class="content">
      <canvas ref="chartCanvas"></canvas>
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