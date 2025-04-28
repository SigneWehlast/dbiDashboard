<script setup>
import { ref } from 'vue'
import { db } from '@/configs/firebase'
import { collection, addDoc } from 'firebase/firestore'

// Formular-states
const title = ref("")
const deadline = ref("")
const systemStatus = ref("")
const systemComment = ref("")
const errorStatus = ref("")
const errorComment = ref("")

// Gem funktioner
const saveForm = async (type) => {
  let status = type === 'save' ? 'Udført' : 'Igangværende'

  const today = new Date()
  const deadlineDate = new Date(deadline.value)

  if (status !== "Udført" && deadlineDate < today) {
    status = "Overskredet"
  }

  const formData = {
    title: title.value,
    deadline: deadline.value,
    status,
    systemStatus: systemStatus.value,
    systemComment: systemComment.value,
    errorStatus: errorStatus.value,
    errorComment: errorComment.value,
    createdAt: new Date()
  }

  try {
    await addDoc(collection(db, "ScheduleForm"), formData)
    alert("Data gemt!")
    resetForm()
  } catch (error) {
    console.error("Fejl ved gemning:", error)
    alert("Noget gik galt, prøv igen.")
  }
}

// Nulstil formularen
const resetForm = () => {
  systemStatus.value = ""
  systemComment.value = ""
  errorStatus.value = ""
  errorComment.value = ""
  deadline.value = ""
}
</script>

<template>
    <div class="schedule-form">
      <h3>Overordnet egenkontrol af ABA-anlæg</h3>
      <form class="schedule-form__formular" @submit.prevent>
        <label>Titel</label>
        <input type="text" v-model="title" />
  
        <label>Deadline</label>
        <input type="date" v-model="deadline" />
  
        <p class="p1">Alle systemdele er tilkoblet og fuldt funktionsdygtige...</p>
        <label class="p1">
          <input class="checkbox-input" type="radio" value="yes" v-model="systemStatus" />
          Ja
        </label>
        <label class="p1">
          <input class="checkbox-input" type="radio" value="no" v-model="systemStatus" />
          Nej
        </label>
        <textarea v-model="systemComment" rows="3" placeholder="Kommentar"></textarea>
  
        <p class="p1">Evt. fejlmeldinger er udbedret eller under udbedring?</p>
        <label class="p1">
          <input class="checkbox-input" type="radio" value="yes" v-model="errorStatus" />
          Ja
        </label>
        <label class="p1">
          <input class="checkbox-input" type="radio" value="no" v-model="errorStatus" />
          Nej
        </label>
        <textarea v-model="errorComment" rows="3" placeholder="Kommentar"></textarea>
  
        <div class="schedule-form__button">
          <button type="button" class="p1 p-white schedule-form__button__save" @click="saveForm('save')">Gem og luk</button>
          <button type="button" class="p1 p-blue schedule-form__button__save-temporary" @click="saveForm('temp')">Gem midlertidig</button>
        </div>
      </form>
    </div>
  </template>
  

<style scoped lang="scss">


.schedule-form {
    background-color: #FFFFFF;
    border-radius: 1.5em;
    padding: 2em; //ikke rigtig

    &__formular {
        display: flex;
        flex-direction: column;
        gap: 1.5em; //ikke rigtig
    }

    &__button {
        display: flex;
        gap: 1em; //ikke rigtig

        &__save {
            background-color: #2B7393;
            border-radius: 0.5em;
            border-style: none;
            padding: 0.5em;
        }

        &__save-temporary {
            background-color: #FFFFFF;
            border-color: #2B7393;
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
        cursor: pointer;
    }

textarea {
    border-color: #2B7393;
    border-radius: 0.5em;
    border-style: solid;
    resize: none;
}
</style>