<script setup>
import { ref, computed, watch } from 'vue';
import { defineProps } from 'vue';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isAuthReady } = storeToRefs(authStore);

//prop som bruges i taskoverview, så der kun ses skemaer fra i dag
const props = defineProps({
  onlyToday: {
    type: Boolean,
    default: false
  }
});

const store = useScheduleStore();
const sortKey = ref('title');
const sortOrder = ref('asc');

//holder øje med nye skemaer
watch(isAuthReady, (ready) => {
  if (ready) {
    store.fetchTasks();
  }
}, { immediate: true });

const today = new Date().toISOString().split('T')[0];

//henter skemaer der er i dag, er igangværende og overskredet
const filteredSchedules = computed(() => {
  if (props.onlyToday) {
    return store.tasks.filter(task => {
      const taskDate = task.deadline?.split('T')[0];
      return (
        taskDate === today || task.status === 'Igangværende' || task.status === 'Overskredet'
      );
    });
  }
  return store.tasks;
});

//sorterer
const sortedSchedules = computed(() => {
  const tasks = filteredSchedules.value.slice();

  return tasks.sort((a, b) => {
    let itemA = a[sortKey.value]?.toString().toLowerCase() || '';
    let itemB = b[sortKey.value]?.toString().toLowerCase() || '';

    if (sortKey.value === 'deadline') {
      itemA = new Date(a.deadline);
      itemB = new Date(b.deadline);
    }

    if (itemA < itemB) return sortOrder.value === 'asc' ? -1 : 1;
    if (itemA > itemB) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });
});

//funktionen den kører når der sorteres
function toggleSort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

//laver datoen om til dd/mm/åå
function formatDate(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}.${month}.${year}`;
}
</script>

<template>
  <div class="task-overview">
    <div class="task-overview__information-name">
      <p class="p2 heading-bar" @click="toggleSort('title')">
        <span class="task-overview__sort-header">
          Titel
          <img src="/src/assets/icons/chevron-up-solid.svg" alt="Sorteringspil" class="sort-icon"
            :class="{ active: sortKey === 'title', rotated: sortKey === 'title' && sortOrder === 'desc' }" />
        </span>
      </p>

      <div v-if="isAuthReady" v-for="task in sortedSchedules" :key="task.id + '-title'">
    <router-link :to="`/Specific/${task.id}`"class="p1 routerlink">
      {{ task.title }}
    </router-link>     
    </div>
      <p v-else class="p1">Indlæser...</p>
    </div>

    <div class="task-overview__information-deadline">
      <p class="p2 heading-bar" @click="toggleSort('deadline')">
        <span class="task-overview__sort-header">
          Deadline
          <img src="/src/assets/icons/chevron-up-solid.svg" alt="Sorteringspil" class="sort-icon"
            :class="{ active: sortKey === 'deadline', rotated: sortKey === 'deadline' && sortOrder === 'desc' }" />
        </span>
      </p>
      <div v-if="isAuthReady" v-for="task in sortedSchedules" :key="task.id + '-deadline'">
        <p class="p1">{{ formatDate(task.deadline) }}</p>
      </div>
      <p v-else class="p1">Indlæser...</p>
    </div>

    <div class="task-overview__information-status">
      <p class="p2 heading-bar" @click="toggleSort('status')">
        <span class="task-overview__sort-header">
          Status
          <img src="/src/assets/icons/chevron-up-solid.svg" alt="Sorteringspil" class="sort-icon"
            :class="{ active: sortKey === 'status', rotated: sortKey === 'status' && sortOrder === 'desc' }" />
        </span>
      </p>
      <div v-if="isAuthReady" v-for="task in sortedSchedules" :key="task.id + '-status'" class="status-container">
        <span class="status-indicator" :class="{
          'status-done': task.status === 'Udført',
          'status-overdue': task.status === 'Overskredet',
          'status-todo': task.status === 'Igangværende'
        }">
        </span>
        <p class="p1">{{ task.status }}</p>
      </div>
      <p v-else class="p1">Indlæser...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.task-overview {
  &__information {
    &-name {
      display: flex;
      flex-direction: column;
      gap: 1.25em;
      width: 55%;
    }

    &-deadline {
      display: flex;
      gap: 1.25em;
      flex-direction: column;
      width: 30%;
    }

    &-status {
      display: flex;
      flex-direction: column;
      gap: 1.25em;
      width: 15%;
    }
  }

  &__sort-header {
      align-items: center;
      display: inline-flex;
      gap: 0.4em; 
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
    background-color: v.$done;
  }

  &-overdue {
    background-color: v.$deadline;
  }

  &-todo {
    background-color: v.$todo;
  }
}

.sort-icon {
  width: 1em;
  opacity: 0.3;

  &.active {
    opacity: 1;
  }

  &.rotated {
    transform: rotate(180deg);
  }
}
</style>
