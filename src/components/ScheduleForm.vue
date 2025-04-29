<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/ScheduleStore'
import { useAuthStore } from '@/stores/AuthStore'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/configs/firebase'

// Brug af Pinia store
const taskStore = useTaskStore()
const authStore = useAuthStore()
const title = ref('')
const date = ref('')
const errorComment = ref('')
const errorStatus = ref('')
const systemComment = ref('')
const systemStatus = ref('')

// Funktion til at gemme midlertidigt
const saveTemporary = async () => {
  const uid = authStore.user?.uid  // Bruger uid fra authStore
  console.log('authStore.user:', authStore.user)  // Debug linje, kontrol af brugerdata
  if (!uid) {
    console.error('Bruger ikke logget ind, UID ikke tilgængelig')
    return
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
    })
    console.log('Data gemt midlertidigt')
  } catch (err) {
    console.error('Fejl ved gemning:', err)
  }
}

// Funktion til at gemme og lukke
const saveAndClose = async () => {
  const uid = authStore.user?.uid  // Bruger uid fra authStore
  console.log('authStore.user:', authStore.user)  // Debug linje, kontrol af brugerdata
  if (!uid) {
    console.error('Bruger ikke logget ind, UID ikke tilgængelig')
    return
  }

  try {
    await addDoc(collection(db, 'ScheduleForm'), {
      title: title.value,
      deadline: date.value,
      createdAt: new Date(),
      errorComment: errorComment.value,
      errorStatus: errorStatus.value,
      status: 'Done',
      systemComment: systemComment.value,
      systemStatus: systemStatus.value,
      uid: uid
    })
    console.log('Data gemt og lukket')
  } catch (err) {
    console.error('Fejl ved gemning:', err)
  }
}
</script>

<template>
  <div class="schedule-form">
    <h3>Overordnet egenkontrol af ABA-anlæg</h3>
    <form class="schedule-form__formular">
      <label class="p1" for="title">Titel</label>
      <input type="text" id="title" v-model="title" placeholder="Indtast titel" />

      <label class="p1" for="date">Dato</label>
      <input type="date" id="date" v-model="date" />

      <p class="p1">Alle systemdele er tilkoblet og fuldt funktionsdygtige og kun aftalte enheder er frakoblet</p>
      <label class="p1">
        <input class="checkbox-input" type="checkbox" v-model="errorStatus" value="yes" /> Ja
      </label>
      <label class="p1">
        <input class="checkbox-input" type="checkbox" v-model="errorStatus" value="no" /> Nej
      </label>
      <label class="p1" for="comment">Kommentar</label>
      <input type="text" v-model="errorComment" />

      <p class="p1">Evt. fejlmeldinger er udbedret eller under udbedring?</p>
      <label class="p1">
        <input class="checkbox-input" type="checkbox" v-model="systemStatus" value="yes" /> Ja
      </label>
      <label class="p1">
        <input class="checkbox-input" type="checkbox" v-model="systemStatus" value="no" /> Nej
      </label>
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
    padding: 2em; 

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

.p-blue {
    color: #2B7393;
}

.p-white {
    color: #FFFFFF;
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
}
</style>
