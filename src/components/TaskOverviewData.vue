<script setup>
import { ref, computed, onMounted, defineEmits } from 'vue'
import { db } from '@/configs/firebase'
import { collection, getDocs } from 'firebase/firestore'

const emit = defineEmits()

// Props
const props = defineProps({
  onlyToday: {
    type: Boolean,
    default: false
  }
})

// Tasks fra Firestore
const tasks = ref([])

// Formatér dato
function formatDate(date) {
  return date.toLocaleDateString('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const today = formatDate(new Date())

// Beregn de filtrerede tasks
const filteredTasks = computed(() => {
  if (props.onlyToday) {
    const filtered = tasks.value.filter(task => task.deadline === today)
    return filtered
  }
  return tasks.value
})

// Hent data fra Firestore
const fetchTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "ScheduleForm"))
    tasks.value = querySnapshot.docs.map(doc => ({
      title: doc.data().title,
      deadline: formatDate(new Date(doc.data().deadline)),
      status: doc.data().status
    }))
  } catch (error) {
    console.error("Fejl ved hentning af opgaver:", error)
  }
}

// Kør når komponenten loader
onMounted(() => {
  fetchTasks()

  // Emit taskCount og deadlineCount når data er hentet
  emit('updateData', {
    taskCount: tasks.value.length,
    deadlineCount: filteredTasks.value.length
  })
})

// Beregn antallet af opgaver og deadlines
const taskCount = computed(() => tasks.value.length)
const deadlineCount = computed(() => filteredTasks.value.length)
</script>


<template>
  <div class="Task-Infomation__Name">
    <p class="p2 heading-bar">Titel</p>
    <div v-for="task in filteredTasks" :key="task.title">
      <p class="p1">{{ task.title }}</p>
    </div>
  </div>

  <div class="Task-Overwiev__Infomation-Deadline">
    <p class="p2 heading-bar">Deadline</p>
    <div v-for="task in filteredTasks" :key="task.deadline">
      <p class="p1">{{ task.deadline }}</p>
    </div>
  </div>

  <div class="Task-Overwiev__Infomation-Status">
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
.Task-Infomation__Name {
  display: flex;
  flex-direction: column;
  width: 55%;
  gap: 20px;
}

.Task-Overwiev__Infomation-Deadline {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 20px;
}

.Task-Overwiev__Infomation-Status {
  display: flex;
  flex-direction: column;
  width: 15%;
  gap: 20px;
}

.status-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-done {
  background-color: #5AEA62;
}

.status-overdue {
  background-color: #FF3838;
}

.status-todo {
  background-color: #FFF081;
}

.heading-bar {
  border-top: 1px solid #DADCDC;
  border-bottom: 1px solid #DADCDC;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
