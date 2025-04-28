<script setup>
import { ref, computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  onlyToday: {
    type: Boolean,
    default: false
  }
})

const tasks = ref([
  { title: "ABA anlæg (Månedlig egenkontrol) BR18/7.5.1.3", deadline: "23.03.2025", status: "Udført" },
  { title: "ABA anlæg (Månedlig egenkontrol) BR18/7.5.1.3", deadline: "28.04.2025", status: "Udført" },
  { title: "ABA Månedskontrol 6.1", deadline: "19.02.2025", status: "Overskredet" },
  { title: "ABA Månedskontrol 6.1", deadline: "28.04.2025", status: "Overskredet" },
  { title: "ABV anlæg (Månedlig egenkontrol) BR18/7.5.8.1", deadline: "28.02.2025", status: "Overskredet" },
  { title: "Tjek ventilationssystem (Ugentlig rutine)", deadline: "30.04.2025", status: "Igangværende" },
  { title: "Tjek ventilationssystem (Ugentlig rutine)", deadline: "28.04.2025", status: "Igangværende" }
]);

function formatDate(date) {
  return date.toLocaleDateString('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const today = formatDate(new Date())

const filteredTasks = computed(() => {
  if (props.onlyToday) {
    return tasks.value.filter(task => task.deadline === today)
  }
  return tasks.value
})

</script>

<template>
    <div class="task-overview__information__name">
        <p class="p2 heading-bar">Titel</p>
        <div v-for="task in filteredTasks" :key="task.title">
            <p class="p1">{{ task.title }}</p>
        </div>
    </div>

    <div class="task-overview__information__deadline">
        <p class="p2 heading-bar">Deadline</p>
        <div v-for="task in filteredTasks" :key="task.deadline">
            <p class="p1">{{ task.deadline }}</p>
        </div>
    </div>

    <div class="task-overview__information__status">
        <p class="p2 heading-bar">Status</p>
        <div v-for="task in filteredTasks" :key="task.title" class="status-container">
            <span class="status-indicator"
                :class="{ 'status-done': task.status === 'Udført', 'status-overdue': task.status === 'Overskredet', 'status-todo': task.status === 'Igangværende' }">
            </span>
            <p class="p1">{{ task.status }}</p>
        </div>
    </div>
</template>
<style scoped lang="scss">
.task-overview {

  &__information {
  
    &__name {
      display: flex;
      flex-direction: column;
      gap: 1.25em;
      width: 55%;
    }

    &__deadline {
      display: flex;
      gap: 1.25em;
      flex-direction: column;
      width: 30%;
    }

    &__status {
      display: flex;
      flex-direction: column;
      gap: 1.25em;
      width: 15%;
    }
  }
}

.status {
  
  &-container {
    align-items: center;
    display: flex;
    gap: 0.5em;
  }

  &-indicator {
    border-radius: 50%;
    flex-shrink: 0;
    height: 0.6em;
    width: 0.6em;
  }

  &-done {
    background-color: #5AEA62;
  }

  &-overdue {
    background-color: #FF3838;
  }

  &-todo {
    background-color: #FFF081;
  }
}

.heading-bar {
  border-bottom: 1px solid #DADCDC;
  border-top: 1px solid #DADCDC;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
