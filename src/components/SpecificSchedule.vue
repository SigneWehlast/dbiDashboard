<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useScheduleStore } from '@/stores/ScheduleStore';
import { useAuthStore } from '@/stores/AuthStore';
import { useObjectStore } from '@/stores/ObjectStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { useRouter } from 'vue-router';

const scheduleStore = useScheduleStore();
const authStore = useAuthStore();
const objectStore = useObjectStore();
const router = useRouter();

const title = ref('');
const date = ref('');
const errorComment = ref('');
const errorStatus = ref('');
const systemComment = ref('');
const systemStatus = ref('');
const selectedObject = ref('');
const scheduleId = ref('');

const route = useRoute();

onMounted(async () => {
  await scheduleStore.fetchTasks();

  //finder skemaet der passer på det id, der er klikket på
  const idFromRoute = route.params.id;
  const matchingSchedule = scheduleStore.tasks.find(task => task.id === idFromRoute);

  //laver det til reaktive værdier, som kan ændres
  if (matchingSchedule) {
    scheduleId.value = matchingSchedule.id;
    title.value = matchingSchedule.title || '';
    date.value = matchingSchedule.deadline instanceof Date
      ? matchingSchedule.deadline.toISOString().split('T')[0]
      : matchingSchedule.deadline || '';
    selectedObject.value = matchingSchedule.object || '';
    errorComment.value = matchingSchedule.errorComment || '';
    errorStatus.value = matchingSchedule.errorStatus || '';
    systemComment.value = matchingSchedule.systemComment || '';
    systemStatus.value = matchingSchedule.systemStatus || '';
  } else {
    console.warn('Ingen skemaer fundet for id:', idFromRoute);
  }
});

//gemmer midlertidigt og sender til Firestore med status som igangværende
const saveTemporary = async () => {
  const uid = authStore.user?.uid;
  if (!uid || !scheduleId.value) {
    console.error('Bruger ikke logget ind eller taskId mangler');
    return;
  }

  try {
    const docRef = doc(db, 'ScheduleForm', scheduleId.value);
    await updateDoc(docRef, {
      title: title.value,
      deadline: date.value,
      errorComment: errorComment.value,
      errorStatus: errorStatus.value,
      status: 'Igangværende',
      systemComment: systemComment.value,
      systemStatus: systemStatus.value,
      uid: uid
    });
    window.alert('Data opdateret (midlertidig).');
    router.push('/Schedule');
  } catch (err) {
    console.error('Fejl ved opdatering:', err);
  }
};

//Gemmer i Firestore med status som udført
const saveAndClose = async () => {
  const uid = authStore.user?.uid;
  if (!uid || !scheduleId.value) {
    console.error('Bruger ikke logget ind eller taskId mangler');
    return;
  }

  try {
    const docRef = doc(db, 'ScheduleForm', scheduleId.value);
    await updateDoc(docRef, {
      title: title.value,
      deadline: date.value,
      errorComment: errorComment.value,
      errorStatus: errorStatus.value,
      status: 'Udført',
      systemComment: systemComment.value,
      systemStatus: systemStatus.value,
      uid: uid,
      object: selectedObject.value
    });
    window.alert('Data opdateret og sendt.');
    router.push('/Schedule');
  } catch (err) {
    console.error('Fejl ved opdatering:', err);
  }
};
</script>

<template>
  <div class="schedule-form">
    <form class="schedule-form__formular">
      <div class="schedule-form__formular-item">
        <h3> {{ title }}</h3>

        <div class="schedule-form__formular-item-date">
          <div class="schedule-form__label-date">
            <p class="p1">Dato:</p>
            <p class="schedule-form__readonly-text">{{ date }}</p>
          </div>

          <div class="schedule-form__label-date">
            <p class="p1">Objekt:</p>
            <p class="schedule-form__readonly-text">
              {{ objectStore.objects.find(obj => obj.id === selectedObject)?.object }} -
              {{ objectStore.objects.find(obj => obj.id === selectedObject)?.location }}
            </p>
          </div>
        </div>
      </div>

      <div class="schedule-form__formular-item">
        <h3>Alle systemdele er tilkoblet og funktionsdygtige</h3>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="errorStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="errorStatus" value="no" /> Nej
        </label>

        <label class="p1" for="errorComment">Kommentar til fejlstatus</label>
        <textarea type="text" v-model="errorComment"></textarea>
      </div>

      <div class="schedule-form__formular-item">
        <h3>Fejlmeldinger udbedret</h3>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="systemStatus" value="yes" /> Ja
        </label>
        <label class="p1">
          <input class="schedule-form__checkbox-input" type="radio" v-model="systemStatus" value="no" /> Nej
        </label>
        <label class="p1" for="systemComment">Kommentar til systemstatus</label>
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

    &__formular {
        display: flex;
        flex-direction: column;
        gap: 4em;

        &-item {
            display: flex;
            flex-direction: column;
            gap: 1em;

            &-date {
                display: flex;
                flex-direction: column;
            }
        }
    }

    &__label-date {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1em;
    }

    &__readonly-text {
        color: v.$dark-grey;
        font-family: v.$main-font;
        font-size: 25px;
        font-weight: 200;
        margin: 0;
        padding: 0.5em 0;
    }

    &__button {
        display: flex;
        gap: 1em;

        &--save {
            background-color: v.$main-blue;
            border-radius: 0.5em;
            border-style: none;
            cursor: pointer;
            padding: 0.5em;
            transition: all 0.3s ease;

            &:hover {
                background-color: darken(v.$main-blue, 5%);
                box-shadow: 0 4px 12px rgba(43, 115, 147, 0.2);
                transform: translateY(-2px);

            }

            &:active {
                transform: translateY(0);
            }
        }

        &--save-temporary {
            background-color: v.$white;
            border-color: v.$main-blue;
            border-radius: 0.5em;
            border-style: solid;
            cursor: pointer;
            padding: 0.5em;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(43, 115, 147, 0.1);
                background-color: rgba(43, 115, 147, 0.05);
            }

            &:active {
                transform: translateY(0);
            }
        }
    }
}

textarea {
    border-color: v.$main-blue;
    border-radius: 0.5em;
    border-style: solid;
    height: 6em;
    padding: 1.5em;
    resize: none;
    vertical-align: top;
}

label {
    align-items: center;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: .5em;
    margin-bottom: 1em;
}

.schedule-form__checkbox-input {
    appearance: none;
    background-color: v.$white;
    border: 2px solid v.$main-blue;
    border-radius: 50%;
    cursor: pointer;
    height: 2.5em;
    margin: 0;
    position: relative;
    transition: all 0.2s ease;
    width: 2.5em;

    &:checked {
        background-color: v.$white;
        &::after {
            content: '';
            background-color: v.$main-blue;
            border-radius: 50%;
            height: 1.2em;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 1.2em;
        }
    }

    &:hover {
        border-color: darken(v.$main-blue, 10%);
    }
}
</style>
