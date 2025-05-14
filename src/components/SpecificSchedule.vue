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

const route = useRoute(); // ← Hent route parametre

onMounted(async () => {
  await objectStore.fetchObjects();         
  await scheduleStore.fetchTasks();         

  const taskId = route.params.id; // ← Hent ID fra URL
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
  const uid = authStore.user?.uid;
  if (!uid) {
    console.error('Bruger ikke logget ind, UID ikke tilgængelig');
    return;
  }

  try {
    await addDoc(collection(db, 'ScheduleForm'), {
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
    window.alert('Data igangværende er gemt og sendt.');
  } catch (err) {
    console.error('Fejl ved gemning:', err);
  }
};

const saveAndClose = async () => {
  const uid = authStore.user?.uid;
  if (!uid) {
    console.error('Bruger ikke logget ind, UID ikke tilgængelig');
    return;
  }

  try {
    await addDoc(collection(db, 'ScheduleForm'), {
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
    window.alert('Data gemt og sendt.');
  } catch (err) {
    console.error('Fejl ved gemning:', err);
  }
};
</script>


<template>
    <div class="schedule-form">
      <h3>Overordnet egenkontrol af ABA-anlæg</h3>
      <form class="schedule-form__formular">
        
        <!-- Titel -->
        <label class="p1" for="title">Titel</label>
        <input type="text" id="title" v-model="title" readonly /> <!-- Læs kun -->
  
        <!-- Dato -->
        <label class="p1" for="date">Dato</label>
        <input type="date" id="date" v-model="date" readonly /> <!-- Læs kun -->
  
        <!-- Vælg objekt -->
        <label class="p1" for="object">Vælg objekt</label>
        <select id="object" v-model="selectedObject" disabled> <!-- Disabled select -->
          <option value="" disabled selected>Vælg et objekt</option>
          <option v-for="object in objectStore.objects" :key="object.id" :value="object.id" :selected="object.id === selectedObject">
            {{ object.object }} - {{ object.location }}
          </option>
        </select>
  
        <!-- Fejlstatus -->
        <p class="p1">Alle systemdele er tilkoblet og fuldt funktionsdygtige og kun aftalte enheder er frakoblet</p>
        <label class="p1">
          <input class="checkbox-input" type="radio" v-model="errorStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="checkbox-input" type="radio" v-model="errorStatus" value="no" /> Nej
        </label>
  
        <!-- Fejlkommentar -->
        <label class="p1" for="comment">Kommentar</label>
        <input type="text" v-model="errorComment" />
  
        <!-- Systemstatus -->
        <p class="p1">Evt. fejlmeldinger er udbedret eller under udbedring?</p>
        <label class="p1">
          <input class="checkbox-input" type="radio" v-model="systemStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="checkbox-input" type="radio" v-model="systemStatus" value="no" /> Nej
        </label>
  
        <!-- Systemkommentar -->
        <label class="p1" for="comment">Kommentar</label>
        <input type="text" v-model="systemComment" />
  
        <div class="schedule-form__button">
          <button class="p1 p-white schedule-form__button__save" type="button" @click="saveAndClose">Gem og luk</button>
          <button class="p1 p-blue schedule-form__button__save-temporary" type="button" @click="saveTemporary">Gem midlertidig</button>
        </div>
      </form>
    </div>
  </template>
  
  

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

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
