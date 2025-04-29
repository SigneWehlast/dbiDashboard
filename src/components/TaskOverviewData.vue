<script setup>
import { ref, computed, onMounted } from 'vue'
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'

const props = defineProps({
  onlyToday: {
    type: Boolean,
    default: false
  }
})

const store = useTaskStore()

onMounted(() => {
    console.log('Fetching tasks...')
  store.fetchTasks()
})

function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const today = new Date().toISOString().split('T')[0]

const filteredTasks = computed(() => {
  if (props.onlyToday) {
    return store.tasks.filter(task => task.deadline === today)
  }
  return store.tasks
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
