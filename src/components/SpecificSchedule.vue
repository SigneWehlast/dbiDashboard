<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useObjectStore } from '@/stores/ObjectStore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/configs/firebase';

const scheduleStore = useScheduleStore();
const authStore = useAuthStore();
const objectStore = useObjectStore();

const title = ref('');
const date = ref('');
const errorComment = ref('');
const errorStatus = ref('');
const systemComment = ref('');
const systemStatus = ref('');
const selectedObject = ref('');

const route = useRoute();

onMounted(async () => {
  await scheduleStore.fetchTasks();         

  const taskId = route.params.id;
  const matchingTask = scheduleStore.tasks.find(task => task.id === taskId);

  if (matchingTask) {
    title.value = matchingTask.title || '';
    date.value = matchingTask.deadline instanceof Date
      ? matchingTask.deadline.toISOString().split('T')[0]
      : matchingTask.deadline || '';
    selectedObject.value = matchingTask.object || '';
    errorComment.value = matchingTask.errorComment || '';
    errorStatus.value = matchingTask.errorStatus || '';
    systemComment.value = matchingTask.systemComment || '';
    systemStatus.value = matchingTask.systemStatus || '';
  } else {
    console.warn('Ingen matching task fundet for id:', taskId);
  }
});

const saveTemporary = async () => {
  console.log("Gemmer midlertidig...");
  const uid = authStore.user?.uid;
  if (!uid) {
    console.error('Bruger ikke logget ind, UID ikke tilgængelig');
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'ScheduleForm'), {
      title: title.value,
      deadline: date.value,
      createdAt: new Date(),
      errorComment: errorComment.value,
      errorStatus: errorStatus.value,
      status: 'Igangværende',
      systemComment: systemComment.value,
      systemStatus: systemStatus.value,
      uid: uid
    });
    console.log("Dokument oprettet med ID: ", docRef.id);
    window.alert('Data igangværende er gemt og sendt.');
  } catch (err) {
    console.error('Fejl ved gemning:', err);
  }
};

const saveAndClose = async () => {
  console.log("Gemmer og lukker...");
  const uid = authStore.user?.uid;
  if (!uid) {
    console.error('Bruger ikke logget ind, UID ikke tilgængelig');
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'ScheduleForm'), {
      title: title.value,
      deadline: date.value,
      createdAt: new Date(),
      errorComment: errorComment.value,
      errorStatus: errorStatus.value,
      status: 'Udført',
      systemComment: systemComment.value,
      systemStatus: systemStatus.value,
      uid: uid,
      object: selectedObject.value
    });
    console.log("Dokument oprettet med ID: ", docRef.id);
    window.alert('Data gemt og sendt.');
  } catch (err) {
    console.error('Fejl ved gemning:', err);
  }
};

</script>

<template>
  <div class="schedule-form">
    <div class="display-data">
      <h2>Titel: {{ title }}</h2>
      <h3>Deadline: {{ date }}</h3>

      <h3>Objekt:
        {{
          objectStore.objects.find(obj => obj.id === selectedObject)?.object
        }} - 
        {{
          objectStore.objects.find(obj => obj.id === selectedObject)?.location
        }}
      </h3>

      <h3>Alle systemdele er tilkoblet og funktionsdygtige: {{ errorStatus === 'yes' ? 'Ja' : 'Nej' }}</h3>
        <label class="p1">
          <input class="checkbox-input" type="radio" v-model="errorStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="checkbox-input" type="radio" v-model="errorStatus" value="no" /> Nej
        </label>
      <h3>Kommentar til fejlstatus: {{ errorComment }}</h3>
        <input type="text" v-model="errorComment" />
      

      <h3>Fejlmeldinger udbedret: {{ systemStatus === 'yes' ? 'Ja' : 'Nej' }}</h3>
          <label class="p1">
          <input class="checkbox-input" type="radio" v-model="systemStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="checkbox-input" type="radio" v-model="systemStatus" value="no" /> Nej
        </label>
      <h3>Kommentar til systemstatus: {{ systemComment }}</h3>
       <input type="text" v-model="systemComment" />
    </div>

     <div class="schedule-form__button">
          <button class="p1 p-white schedule-form__button__save" type="button" @click="saveAndClose">Gem og luk</button>
          <button class="p1 p-blue schedule-form__button__save-temporary" type="button" @click="saveTemporary">Gem midlertidig</button>
        </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.schedule-form {
  background-color: v.$white;
  border-radius: 1.5em;
  padding: 4.375rem;
}

.display-data {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  font-size: 1rem;
  line-height: 1.6;
}

.schedule-form {
    background-color: v.$white;
    border-radius: 1.5em;
    padding: 4.375rem;

    &__formular {
        display: flex;
        flex-direction: column;
        gap: 1.5em;
    }

    &__button {
        display: flex;
        gap: 1em;

        &__save {
            background-color: v.$main-blue;
            border-radius: 0.5em;
            border-style: none;
            padding: 0.5em;
        }

        &__save-temporary {
            background-color: v.$white;
            border-color: v.$main-blue;
            border-radius: 0.5em;
            border-style: solid;
            padding: 0.5em;
        }
    }
}

label {
    border-radius: 50%;
}

.checkbox-input {
        border: 2px solid #2B7393;
        border-radius: 50%;
        height: 1.5em;
        width: 1.5em;
    }

input[type="text"] {
    border-color: #2B7393;
    border-radius: 0.5em;
    border-style: solid;
    resize: none;
    height: 6em;
    border-radius: 1.5em;
}
</style>
