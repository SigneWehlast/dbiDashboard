<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '@/stores/ScheduleStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useObjectStore } from '@/stores/ObjectStore';

const taskStore = useTaskStore();
const authStore = useAuthStore();
const objectStore = useObjectStore();

const startDate = ref('');
const endDate = ref('');
const selectedUserUid = ref('');
const filteredTasks = ref([]);

onMounted(async () => {
  await Promise.all([
    taskStore.fetchTasks(),
    authStore.fetchAllUsers(),
    objectStore.fetchObjects()
  ]);
});

function filterByDate() {
  filteredTasks.value = [];

  const start = startDate.value ? new Date(startDate.value) : null;
  const end = endDate.value ? new Date(endDate.value) : null;

  const tasksToFilter = taskStore.tasks.filter(task => {
    if (task.status.toLowerCase() !== 'udført') return false;

    const taskDate = new Date(task.deadline);
    if (start && taskDate < start) return false;
    if (end && taskDate > end) return false;
    if (selectedUserUid.value && task.uid !== selectedUserUid.value) return false;

    return true;
  });

  filteredTasks.value = tasksToFilter;
}

function clearFilters() {
  startDate.value = '';
  endDate.value = '';
  filteredTasks.value = [];
  selectedUserUid.value = '';
}

</script>

<template>
  <form class="report-form">
    <div class="report-form__filter">
      <p class="p1">Vis 50 af {{ filteredTasks.length }} (indsæt ikon)</p>
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
        <select class="p1">
          <option class="p1">Eksempel</option>
        </select>
      </label>
      <label>
        <p class="p1">Objekter</p>
        <select class="p1">
          <option class="p1">Eksempel</option>
        </select>
      </label>
      <label>
        <p class="p1">Bruger</p>
        <select class="p1" v-model="selectedUserUid">
          <option class="p1" value="">Alle</option>
          <option class="p1"
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
        <input class="checkbox-input" type="checkbox" name="afvigelse" value="afvigelse">
        Afvigelse
      </label>
      <label class="p1">
        <input class="checkbox-input" type="checkbox" name="midlertidige" value="midlertidige">
        Midlertidige
      </label>
      <label class="p1">
        <input class="checkbox-input" type="checkbox" name="kommentar" value="kommentar">
        Kommentar
      </label>
      <label class="p1">
        <input class="checkbox-input" type="checkbox" name="inkluderer arkiverede" value="inkludere arkiverede">
        Inkluderer arkiverede
      </label>
    </div>

    <div class="report-form__button">
      <button class="p1 p-white report-form__button__search" type="button" @click="filterByDate">Søg</button>
      <button class="p1 p-blue report-form__button__white" type="button">Download CSV</button>
      <button class="p1 p-blue report-form__button__white" type="button" @click="clearFilters">Ryd filter</button>
    </div>
  </form>

  <!-- Resultattabel -->
  <div v-if="filteredTasks.length > 0">
    <h2>Fundne rapporter</h2>
    <table >
      <thead>
        <tr>
          <th class="h3">Titel</th>
          <th class="h3">Dato</th>
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
    margin: 2em 0 2em 0;

    &__search {
      background-color: v.$main-blue;
      border-radius: 0.5em;
      border-style: none;
      padding: 0.5em;
      width: 10%;
    }

    &__white {
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
      gap: 0.5em;
      height: 2em;
    }
  }

  &__filter {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1em;
  }
}

input {
  border-radius: 0.5em;
  border: 1px solid v.$main-blue;
  height: 3em;
  padding: 0;
  width: 100%;
}

select {
  border-radius: 0.5em;
  border: 1px solid v.$main-blue;
  height: 3.08em;
  width: 100%;
}

label {
  box-sizing: border-box;
  margin-bottom: 1em;
  width: calc(33% - 1em);
}

.checkbox-input {
  appearance: none;
  border: 2px solid v.$main-blue;
  border-radius: 50%;
  height: 1.2em;
  margin: 0;
  width: 1.2em;
}

table {
  background-color: v.$white;
  border-collapse: collapse;
  border-left: 1px solid v.$main-blue;
  border-right: 1px solid v.$main-blue;
  margin-top: 1em;
  text-align: left;
  width: 100%;
}

th, td {
  border-bottom: 1px solid v.$main-blue;
  border-top: 1px solid v.$main-blue;
  padding: 0.75em;
}

.h3 {
    color: v.$dark-grey;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
    margin: 0;
}
</style>
