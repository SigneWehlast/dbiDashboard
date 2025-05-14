<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useObjectStore } from '@/stores/ObjectStore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { useRouter } from 'vue-router';

const router = useRouter();

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
    window.alert('Data igangværende er gemt og sendt.');
    router.push('/Schedule');
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
    window.alert('Data gemt og sendt.');
    router.push('/Schedule');
  } catch (err) {
    console.error('Fejl ved gemning:', err);
  }
};
</script>

<template>
  <div class="schedule-form">
    <form class="schedule-form__formular">
      <div class="schedule-form__formular-item">

        <label class="p1" for="title">Titel</label>
        <textarea type="text" id="title" v-model="title"></textarea>

        <div class="schedule-form__formular-item-date">
          <label class="p1 schedule-form__label-date" for="date">Dato
            <input type="date" id="date" v-model="date" />
          </label>

          <label class="p1 schedule-form__label-date" for="object">Vælg objekt
            <select id="object" v-model="selectedObject">
              <option value="" disabled selected>Vælg et objekt</option>
              <option v-for="object in objectStore.objects" :key="object.id" :value="object.id">
                {{ object.object }} - {{ object.location }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div class="schedule-form__formular-item">
        <p class="p1">Alle systemdele er tilkoblet og fuldt funktionsdygtige og kun aftalte enheder er frakoblet</p>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="errorStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="errorStatus" value="no" /> Nej
        </label>

        <label class="p1" for="comment">Kommentar</label>
        <textarea type="text" v-model="errorComment"></textarea>
      </div>

      <div class="schedule-form__formular-item">
        <p class="p1">Evt. fejlmeldinger er udbedret eller under udbedring?</p>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="systemStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="systemStatus" value="no" /> Nej
        </label>
        <label class="p1" for="comment">Kommentar</label>
        <textarea type="text" v-model="systemComment"></textarea>
      </div>

      <div class="schedule-form__button">
        <button class="p1 p-white schedule-form__button--save" type="button" @click="saveAndClose">Gem og luk</button>
        <button class="p1 p-blue schedule-form__button--save-temporary" type="button" @click="saveTemporary">Gem midlertidig</button>
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

    &__button {
        display: flex;
        gap: 1em;

        &--save {
            background-color: v.$main-blue;
            border-radius: 0.5em;
            border-style: none;
            padding: 0.5em;
        }

        &--save-temporary {
            background-color: v.$white;
            border-color: v.$main-blue;
            border-radius: 0.5em;
            border-style: solid;
            padding: 0.5em;
        }
    }

    &__formular {
        display: flex;
        flex-direction: column;
        gap: 3em;

        &-item {
            display: flex;
            flex-direction: column;
            gap: 3em;
        }

        &-item-date {
        display: flex;
        flex-direction: row;
        }

    }

    &__label-date {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__checkbox-input {
      appearance: none;
      border: 2px solid v.$main-blue;
      border-radius: 50%;
      height: 2.5em;
      margin: 0;
      width: 2.5em;
    }
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

label {
  box-sizing: border-box;
  margin-bottom: 1em;
  width: calc(33.333% - 0.667em);
  display: flex;
  gap: .5em;
  border-radius: 50%;
  flex-direction: row;
  align-items: center;
}

#date {
  height: 3em;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 0 1rem;
  background-color: #fafafa;
  box-sizing: border-box;
}

#object {
  height: 3em;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 0 1rem;
  background-color: #fafafa;
  box-sizing: border-box;
}

input[type="date"] {
  display: flex;
  font-family: v.$main-font;
  font-size: 25px;
  font-weight: 200;
  color: v.$dark-grey;
}

select {
  display: flex;
  font-family: v.$main-font;
  font-size: 25px;
  font-weight: 200;
  color: v.$dark-grey;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
}
</style>
