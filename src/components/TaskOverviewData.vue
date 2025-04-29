<script setup>
import { ref, computed, watch } from 'vue'
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/ScheduleStore'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAuthReady } = storeToRefs(authStore)

const props = defineProps({
  onlyToday: {
    type: Boolean,
    default: false
  }
})

const store = useTaskStore()

watch(isAuthReady, (ready) => {
  if (ready) {
    store.fetchTasks()
  }
}, { immediate: true })

const today = new Date().toISOString().split('T')[0]

const filteredTasks = computed(() => {
  if (props.onlyToday) {
    return store.tasks.filter(task => {
      const taskDate = task.deadline?.split('T')[0]
      return taskDate === today || task.status === 'Overskredet'
    })
  }
  return store.tasks
})

//Tager dato og omskriver til DD/MM/YYYY
function formatDate(dateString) {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('T')[0].split('-')
  return `${day}.${month}.${year}`
}
</script>

<template>
  <div class="task-overview__information__name">
    <p class="p2 heading-bar">Titel</p>
    <div v-if="isAuthReady" v-for="task in filteredTasks" :key="task.title">
      <p class="p1">{{ task.title }}</p>
    </div>
    <p v-else class="p1">Indlæser...</p>
  </div>

  <div class="task-overview__information__deadline">
    <p class="p2 heading-bar">Deadline</p>
    <div v-if="isAuthReady" v-for="task in filteredTasks" :key="task.deadline">
      <p class="p1">{{ formatDate(task.deadline) }}</p>
    </div>
    <p v-else class="p1">Indlæser...</p>
  </div>

  <div class="task-overview__information__status">
    <p class="p2 heading-bar">Status</p>
    <div v-if="isAuthReady" v-for="task in filteredTasks" :key="task.title" class="status-container">
      <span class="status-indicator"
            :class="{ 'status-done': task.status === 'Udført', 'status-overdue': task.status === 'Overskredet', 'status-todo': task.status === 'Igangværende' }">
      </span>
      <p class="p1">{{ task.status }}</p>
    </div>
    <p v-else class="p1">Indlæser...</p>
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
