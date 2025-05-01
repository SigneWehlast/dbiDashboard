<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const taskStore = useTaskStore();
const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  taskStore.fetchTasks();
});

const monthsOrder = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2000, i, 1);
  return date.toLocaleString('da-DK', { month: 'short' }).replace('.', '').replace(/^./, c => c.toUpperCase());
});
const tasksDonePerMonth = computed(() => {
  const counts = {};

  taskStore.tasks.forEach(task => {
    if (!task.status || task.status.toLowerCase() !== 'udført') return;

    const date = task.deadline;
    if (!date) return;

    const d = date instanceof Date ? date : date.toDate?.() || new Date(date);
    const month = d.toLocaleString('da-DK', { month: 'short' }).replace('.', '');
    const label = month.charAt(0).toUpperCase() + month.slice(1);
    counts[label] = (counts[label] || 0) + 1;
  });

  const sortedCounts = monthsOrder.reduce((acc, month) => {
    acc[month] = counts[month] || 0;
    return acc;
  }, {});

  return sortedCounts;
});

watch(tasksDonePerMonth, (newData) => {
  const labels = Object.keys(newData);
  const data = Object.values(newData);

  if (chartInstance) chartInstance.destroy();

  // Vores Chart.js style
  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: 'rgba(42,114,146)',
        borderRadius: 5,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(42,114,146)',
          titleColor: 'transparent',
          bodyColor: 'white',
          borderWidth: 1,
          caretSize: 3,
          caretPadding: 5,
          yAlign: 'bottom',
          xAlign: 'left',
          displayColors: false,
          bodyAlign: 'center',
          padding: {
            top: 0,
            right: 15,
            bottom: 0,
            left: 15
          },
          bodyFont: {
            size: 16,
            weight: '300',
            family: 'D-DIN, sans-serif'
          },
          callbacks: {
            label: function (tooltipItem) {
              return `   ${tooltipItem.raw}   `;
            }
          }
        }
      },
      hover: {
        mode: 'nearest',
        intersect: true,
        animationDuration: 200
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            display: true,
            rotation: 0,
            align: 'center',
            padding: 5,
            font: {
              size: 15,
              family: 'D-DIN, sans-serif',
            }
          },
          border: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          max: 7,
          grid: {
            display: false
          },
          ticks: {
            display: false
          },
          border: {
            display: false
          }
        }
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
  padding: 2em;
}

.content{
  display: flex;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2em;
}
</style>
