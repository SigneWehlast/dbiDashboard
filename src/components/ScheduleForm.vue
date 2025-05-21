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

//gemmer et skema på brugeren
const saveTemporary = async () => {
  const uid = authStore.user?.uid;
  if (!uid) {
    console.error('Bruger ikke logget ind, UID ikke tilgængelig');
    return;
  }

  //det der udfyldes i skemaet og sendes ind i Firestore med igangværende
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
    router.push('/Schedule');
  } catch (err) {
    console.error('Fejl ved gemning:', err);
  }
};

//det der udfyldes i skemaet og sendes ind i Firestore med udført
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

        <h3>Titel</h3>
        <label class="p1" for="title"></label>
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
        <h3>Alle systemdele er tilkoblet og fuldt funktionsdygtige og kun aftalte enheder er frakoblet</h3>
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
        <h3>Evt. fejlmeldinger er udbedret eller under udbedring?</h3>
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

    &__formular {
        display: flex;
        flex-direction: column;
        gap: 7em;

        &-item {
            display: flex;
            flex-direction: column;
            gap: 1em;

            &-date {
                display: flex;
                flex-direction: row;
            }
        }
    }

    &__label-date {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    &__button {
        display: flex;
        gap: 1em;

        &--save {
            background-color: v.$main-blue;
            border-radius: 0.5em;
            border-style: none;
            padding: 0.5em;
            transition: all 0.3s ease;
            cursor: pointer;

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
                background-color: rgba(43, 115, 147, 0.05);
                box-shadow: 0 4px 12px rgba(43, 115, 147, 0.1);
                transform: translateY(-2px);
            }

            &:active {
                transform: translateY(0);
            }
        }
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

.schedule-form__checkbox-input {
    appearance: none;
    border: 2px solid v.$main-blue;
    border-radius: 50%;
    height: 2.5em;
    margin: 0;
    width: 2.5em;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    background-color: v.$white;

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

#date {
    height: 3em;
    border-radius: 12px;
    border: 1px solid v.$border-input;
    padding: 0 1rem;
    background-color: v.$background-input;
    box-sizing: border-box;
}

#object {
    height: 3em;
    border-radius: 12px;
    border: 1px solid v.$border-input;
    padding: 0 1rem;
    background-color: v.$background-input;
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
