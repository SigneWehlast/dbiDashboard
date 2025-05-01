<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const taskStore = useTaskStore();
const chartGrafik = ref(null);
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
  chartInstance = new Chart(chartGrafik.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: 'rgba(42,114,146,0.8)',
        hoverBackgroundColor: 'rgba(42,114,146,1)',
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 30,
        maxBarThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(42,114,146,0.9)',
          titleColor: 'transparent',
          bodyColor: 'white',
          borderWidth: 0,
          caretSize: 5,
          caretPadding: 5,
          yAlign: 'bottom',
          xAlign: 'left',
          displayColors: false,
          bodyAlign: 'center',
          padding: {
            top: 8,
            right: 15,
            bottom: 8,
            left: 15
          },
          bodyFont: {
            size: 14,
            weight: '500',
            family: 'D-DIN, sans-serif'
          },
          callbacks: {
            label: function (tooltipItem) {
              return ` ${tooltipItem.raw} tasks `;
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
            padding: 10,
            font: {
              size: 13,
              family: 'D-DIN, sans-serif',
              weight: '500'
            },
            color: '#666'
          },
          border: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          max: 7,
          grid: {
            display: true,
            drawBorder: false,
            color: 'rgba(0,0,0,0.05)'
          },
          ticks: {
            display: true,
            padding: 10,
            font: {
              size: 12,
              family: 'D-DIN, sans-serif',
              weight: '500'
            },
            color: '#666'
          },
          border: {
            display: false
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
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
    <div class="content" >
      <canvas ref="chartGrafik"></canvas>
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
  display: flex;
  flex-direction: column;
}

.top-section {
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 1.5em 2em;
}

.content{
  display: flex;
  justify-content: center;
  padding: 0 2em 1.5em 2em;
  flex: 1;
  position: relative;
  height: 100%;
  min-height: 0;
}

.content canvas {
  width: 100% !important;
  height: 100% !important;
  max-height: 100%;
}
</style>
