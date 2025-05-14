<script setup>
import { ref, onMounted } from 'vue';
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


onMounted(async () => {
  await objectStore.fetchObjects();
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
      <div class="schedule-form__formular__item">
        <label class="p1" for="title">Alle systemdele er tilkoblet og fuldt funktionsdygtige og kun aftalte enheder er frakoblet?</label>
        <label class="p1">
        <input class="checkbox-input" type="radio" v-model="errorStatus" value="yes" /> Ja
      </label>
      <label class="p1">
        <input class="checkbox-input" type="radio" v-model="errorStatus" value="no" /> Nej
      </label>
      <p class="p1">Kommentar</p>
      <textarea type="text" id="title" v-model="title"></textarea>
      </div>
      <div class="schedule-form__formular__item">
      <p class="p1">Evt. fejlmeldinger er udbedret eller under udbedring?</p>
      <label class="p1">
        <input class="checkbox-input" type="radio" v-model="systemStatus" value="yes" /> Ja
      </label>
      <label class="p1">
        <input class="checkbox-input" type="radio" v-model="systemStatus" value="no" /> Nej
      </label>

      <label class="p1" for="comment">Kommentar</label>
      <textarea v-model="systemComment"></textarea>
    </div>

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
        gap: 4em;
        margin-top: 4em;

        &__item {
            display: flex;
            flex-direction: column;
            gap: 1em;
        }
    }

    &__button {
        display: flex;
        gap: 1em;

        &__save {
            background-color: v.$main-blue;
            border-radius: .5em;
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
  display: flex;
  gap: .5em;
    border-radius: 50%;
}

.checkbox-input {
  appearance: none;
  border: 2px solid v.$main-blue;
  border-radius: 50%;
  height: 2.6em;
  margin: 0;
  width: 2.6em;
}

input[type="text"] {
    border-color: #2B7393;
    border-radius: 0.5em;
    border-style: solid;
    resize: none;
    height: 6em;
    border-radius: 1.5em;
}

textarea {
    border-color: #2B7393;
    border-radius: 0.5em;
    border-style: solid;
    resize: none;
    height: 6em;
    border-radius: 1.5em;
    padding: 1.5em;
    vertical-align: top;
}
</style>
