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
      data,
      backgroundColor: 'rgba(42,114,146)', // Standard farve på søjler
      borderRadius: 5,  // Border radius for søjlerne
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Skjul legend (forklaring af datasæt)
      },
      tooltip: {
        enabled: true, // Sørg for at tooltip er aktiveret
        callbacks: {
          // Tilpasset callback, som kun viser tallet på tooltip
          label: function(tooltipItem) {
            const value = tooltipItem.raw;
            return `${value}`; // Vis kun tallet
          }
        },
        backgroundColor: 'rgba(42,114,146)', // Baggrundsfarve på tooltip
        titleColor: 'transparent', // Fjern titel
        bodyColor: 'white', // Sæt tekstfarve til hvid
        borderWidth: 1, // Borderbredde på tooltip
        padding: 10, // Afstand fra kantene af tooltip
        caretSize: 5, // Størrelsen af tap/spidsen i bunden
        caretPadding: 8, // Afstand fra tap til tooltip-bunden
        yAlign: 'bottom', // Sørg for at tooltip'en er vertikalt centreret
        xAlign: 'left', // Juster tooltip'en lidt mod venstre i forhold til søjlen
        displayColors: false, // Skjul den lille firkant i hover
        bodyAlign: 'center', // Sørg for at tallet er centreret i tooltip
      },
    },
    hover: {
      mode: 'nearest', // Hover på den nærmeste søjle
      intersect: true, // Kun når man "rører" søjlen
      animationDuration: 200, // Hover animationstid
    },
    scales: {
      x: {
        grid: {
          display: false, // Fjern gridlines på X-aksen
        },
        // Fjern axis line på X-aksen
        border: {
          display: false, // Skjul axis line på X-aksen
        }
      },
      y: {
        beginAtZero: true,
        max: 7,
        grid: {
          display: false, // Fjerner gridlines på Y-aksen
        },
        ticks: {
          display: false // Skjuler Y-aksens tick labels (data)
        },
        border: {
          display: false, // Skjul axis line på X-aksen
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
  }
</style>