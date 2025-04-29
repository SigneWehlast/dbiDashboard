<script setup>
import { ref } from 'vue';
import { auth, db } from '@/configs/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const firstName = ref('');
const lastName = ref('');
const companyName = ref('');
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Adgangskoderne stemmer ikke overens.');
    return;
  }

  try {
    console.log('Starter brugeroprettelse...');
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    console.log('Bruger oprettet:', user.uid);

    // Gem brugerdata i Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      companyName: companyName.value,
      createdAt: new Date()
    });

    console.log('Brugerdata gemt i Firestore');

    alert('Bruger oprettet!');
    router.push('/');
  } catch (error) {
    console.error('Fejl ved registrering:', error);
    alert('Fejl: ' + error.message);
  }
};

const goToLogin = () => {
  router.push('/');
};
</script>

<template>
  <div class="auth">
    <div class="auth-container">
      <h2>Opret bruger</h2>
      <form @submit.prevent="handleRegister">
        <div class="auth-container__input-group">
          <label for="firstName">Fornavn:</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div class="auth-container__input-group">
          <label for="lastName">Efternavn:</label>
          <input type="text" v-model="lastName" required />
        </div>
        <div class="auth-container__input-group">
          <label for="companyName">Firmanavn:</label>
          <input type="text" v-model="companyName" />
        </div>
        <div class="auth-container__input-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="auth-container__input-group">
          <label for="password">Adgangskode:</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="auth-container__input-group">
          <label for="confirmPassword">Bekræft adgangskode:</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit" class="auth-container__btn">Opret bruger</button>
        <p @click="goToLogin" class="toggle-text">Har du allerede en konto? Log ind her.</p>
      </form>
    </div>
  </div>
  </template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.auth {
  display: flex;
  justify-content: center;

  &-container {
    align-items: center;
    background: v.$white;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    color: v.$dark-grey;
    display: flex;
    flex-direction: column;
    width: 40%;
    padding: 1.5em;
    text-align: center;

    &__input-group {
      margin-bottom: 1em;
      text-align: left;
    }

    &__btn {
      background-color: v.$main-blue;
      border: none;
      border-radius: 6px;
      color: v.$white;
      cursor: pointer;
      font-size: 16px;
      padding: 0.8em;
      width: 100%;

      &:hover {
        background-color: #A4CBE0;
        color: v.$dark-grey;
      }
    }
  }
}

label {
  font-size: 14px;
  margin-bottom: 0.3em;
  display: block;
}

input {
  border: 2px solid v.$main-blue;
  border-radius: 6px;
  color: v.$dark-grey;
  font-size: 16px;
  outline: none;
  padding: 0.7em;
}

.toggle-text {
  margin-top: 1em;
  cursor: pointer;
  font-size: 14px;
  color: v.$dark-grey;
}

</style>
