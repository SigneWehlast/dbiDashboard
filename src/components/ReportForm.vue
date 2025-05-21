<script setup>
import { ref, onMounted, computed } from 'vue';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useObjectStore } from '@/stores/ObjectStore';

const scheduleStore = useScheduleStore();
const authStore = useAuthStore();
const objectStore = useObjectStore();

const startDate = ref('');
const endDate = ref('');
const selectedUserUid = ref('');
const selectedSchedule = ref('');
const selectedObjectId = ref('');
const filteredTasks = ref([]);

// alle udførte skemaer vises i filtreringen
const filterSchedules = computed(() => {
  const titles = scheduleStore.tasks
    .filter(task => task.status.toLowerCase() === 'udført')
    .map(task => task.title);
  return [...new Set(titles)];
});

// filtrering af objekter
const filterObjects = computed(() => {
  return objectStore.objects.map(obj => ({
    id: obj.id,
    title: obj.object
  }));
});

onMounted(async () => {
  await Promise.all([
    scheduleStore.fetchTasks(),
    authStore.fetchAllUsers(),
    objectStore.fetchObjects()
  ]);
});

// Filtrering baseret på dato, bruger, skema og objekt
function filterByDate() {
  filteredTasks.value = [];

  const start = startDate.value ? new Date(startDate.value) : null;
  const end = endDate.value ? new Date(endDate.value) : null;

  const tasksToFilter = scheduleStore.tasks.filter(task => {
    if (task.status.toLowerCase() !== 'udført') return false;

    const taskDate = new Date(task.deadline);
    if (start && taskDate < start) return false;
    if (end && taskDate > end) return false;
    if (selectedUserUid.value && task.uid !== selectedUserUid.value) return false;
    if (selectedSchedule.value && task.title !== selectedSchedule.value) return false;
    if (selectedObjectId.value && task.object !== selectedObjectId.value) return false;

    return true;
  });

  filteredTasks.value = tasksToFilter;
}

function clearFilters() {
  startDate.value = '';
  endDate.value = '';
  filteredTasks.value = [];
  selectedUserUid.value = '';
  selectedSchedule.value = '';
  selectedObjectId.value = '';
}
</script>

<template>
  <form class="report-form">
    <div class="report-form__filter">
      <p class="p1">Vis {{ filteredTasks.length }} rapporter</p>
    </div>

    <div class="report-form__wrapper">
      <label>
        <p class="p1">Fra dato</p>
        <input class="p1" type="date" v-model="startDate">
      </label>
      <label>
        <p class="p1">Til dato</p>
        <input class="p1" type="date" v-model="endDate">
      </label>
      <label>
        <p class="p1">Skema</p>
        <select class="p1" v-model="selectedSchedule">
          <option class="p1" value="">Alle</option>
          <option
            class="p1"
            v-for="title in filterSchedules"
            :key="title"
            :value="title"
          >
            {{ title }}
          </option>
        </select>
      </label>
      <label>
        <p class="p1">Objekt</p>
        <select class="p1" v-model="selectedObjectId">
          <option class="p1" value="">Alle</option>
          <option
            class="p1"
            v-for="object in filterObjects"
            :key="object.id"
            :value="object.id"
          >
            {{ object.title }}
          </option>
        </select>
      </label>
      <label>
        <p class="p1">Bruger</p>
        <select class="p1" v-model="selectedUserUid">
          <option class="p1" value="">Alle</option>
          <option
            class="p1"
            v-for="user in authStore.allUsers"
            :key="user.uid"
            :value="user.uid"
          >
            {{ user.fullName }}
          </option>
        </select>
      </label>
    </div>

    <div class="report-form__checkbox">
      <label class="p1">
        <input class="report-form__checkbox-input" type="checkbox" name="afvigelse" value="afvigelse">
        Afvigelse
      </label>
      <label class="p1">
        <input class="report-form__checkbox-input" type="checkbox" name="midlertidige" value="midlertidige">
        Midlertidige
      </label>
      <label class="p1">
        <input class="report-form__checkbox-input" type="checkbox" name="kommentar" value="kommentar">
        Kommentar
      </label>
      <label class="p1">
        <input class="report-form__checkbox-input" type="checkbox" name="inkluderer arkiverede" value="inkludere arkiverede">
        Inkluderer arkiverede
      </label>
    </div>

    <div class="report-form__button">
      <button class="p1 p-white report-form__button--search" @click.prevent="filterByDate">
        Filtrer
      </button>
      <button class="p1 p-blue report-form__button--white" type="button">Download CSV</button>
      <button class="p1 p-blue report-form__button--white" @click.prevent="clearFilters">
        Nulstil
      </button>
    </div>
  </form>

  <div v-if="filteredTasks.length > 0">
    <h2>Fundne rapporter</h2>
    <table>
      <thead>
        <tr>
          <th class="p2 heading-bar">Titel</th>
          <th class="p2 heading-bar">Dato</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in filteredTasks" :key="task.id">
          <td class="p1">{{ task.title }}</td>
          <td class="p1">{{ task.deadline }}</td>
        </tr>
      </tbody>
    </table>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.report-form {
  &__button {
    display: flex;
    gap: 1em;
    margin: 2em 0;

    &--search {
      background-color: v.$main-blue;
      border-radius: 0.5em;
      border-style: none;
      padding: 0.5em;
      width: 10%;
    }

    &--white {
      background-color: v.$white;
      border-color: v.$main-blue;
      border-radius: 0.5em;
      border-style: solid;
      padding: 0.5em;
    }
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
  }

  &__checkbox {
    display: flex;
    flex-direction: column;

    & label {
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: 0.5em;
      height: 2em;
    }
  }

  &__filter {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1em;
  }

  &__checkbox-input {
    appearance: none;
    background-color: v.$white;
    border: 2px solid v.$main-blue;
    border-radius: 50%;
    height: 2.5em;
    margin: 0;
    width: 2.5em;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;

    &:checked {
      background-color: v.$white;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1.2em;
        height: 1.2em;
        background-color: v.$main-blue;
        border-radius: 50%;
      }
    }

    &:hover {
      border-color: darken(v.$main-blue, 10%);
    }
  }
}

input {
  background-color: v.$background-input;
  border-radius: 12px;
  border: 1px solid v.$border-input;
  padding: 0 1rem;
  box-sizing: border-box;
  height: 3em;
}

select {
  background-color: v.$background-input;
  border-radius: 12px;
  border: 1px solid v.$border-input;
  box-sizing: border-box;
  height: 3em;
  padding: 0 1rem;
}

label {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  width: calc(33.333% - 0.667em);
}

table {
  background-color: v.$white;
  border-collapse: collapse;
  margin-top: 1em;
  text-align: left;
  border-radius: 1.5em;
  width: 100%;
}

th, td {
  padding: 0.75em 0;
}

input[type="date"] {
  color: v.$dark-grey;
  font-family: v.$main-font;
  font-size: 25px;
  font-weight: 200;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
}
</style>
