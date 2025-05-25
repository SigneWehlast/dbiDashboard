<script setup>
import { ref } from 'vue';
import { auth, db } from '@/configs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

//hvis ingen email eller password
const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Enter email and password');
    return;
  }

  try {
    //firebase email og password
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Hent brugerens data
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      console.log('Userdata:', userDoc.data());
    } else {
      console.error('Userdata not found');
    }

    alert('Login succesful!');
    router.push('/');
  } catch (error) {
    console.error('Error with login:', error);
    alert('Error: ' + error.message);
  }
};

const goToSignup = () => {
  router.push('/Signup');
};
</script>

<template>
    <div class="auth-wrapper">
      <div class="auth-wrapper__container">
        <h2>Velkommen!</h2>
        <form @submit.prevent="handleLogin" class="auth-wrapper__form">
          <input
            type="email"
            v-model="email"
            placeholder="E-mail"
            required
            class="auth-wrapper__input-field p2"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Kodeord"
            required
            class="auth-wrapper__input-field p2"
          />
          <button type="submit" class="auth-wrapper__login-button p2">Log på</button>
          <p class="auth-wrapper__forgot-password p1" @click="goToSignup">Opret bruger</p>
        </form>
      </div>
    </div>
  </template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.auth-wrapper {
    align-items: center;
    background-color: v.$background-color;
    display: flex;
    height: 100vh;
    justify-content: center;

  &__container {
    background: v.$white;
    border-radius: 1.25em;
    box-shadow: 0 0 1.25em rgba(0, 0, 0, 0.05);
    padding: 3em 2em;
    text-align: center;
    width: 25em;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  &__input-field {
    background-color: v.$background-input;
    border-radius: 12px;
    border: 1px solid v.$border-input;
    height: 2em;
    padding: 0 1rem;
    color: v.$dark-grey;
  }

  &__login-button {
    background-color: v.$main-blue;
    border: none;
    border-radius: 12px;
    color: v.$white;
    cursor: pointer;
    padding: 14px;
    transition: background-color 0.3s;
  }

  &__forgot-password {
    cursor: pointer;
    margin-top: 1rem;
  }
}
</style>
