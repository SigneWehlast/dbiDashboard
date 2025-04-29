<script setup>
import { ref } from 'vue';
import { auth, db } from '@/configs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    alert('Indtast venligst email og adgangskode');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Hent brugerens data
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      console.log('Brugerdata:', userDoc.data());
    } else {
      console.error('Brugerdokument ikke fundet!');
    }

    alert('Login succesfuld!');
    router.push('/');
  } catch (error) {
    console.error('Fejl ved login:', error);
    alert('Fejl: ' + error.message);
  }
};

const goToRegister = () => {
  router.push('/Signup');
};
</script>

<template>
    <div class="auth-wrapper">
      <div class="auth-container">
        <h2>Velkommen!</h2>
        <form @submit.prevent="handleLogin" class="auth-form">
          <input
            type="email"
            v-model="email"
            placeholder="E-mail"
            required
            class="input-field p2"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Kodeord"
            required
            class="input-field p2"
          />
          <button type="submit" class="login-button p2">Log på</button>
          <p class="forgot-password p1" @click="goToRegister">Glemt adgangskode?</p>
        </form>
      </div>
    </div>
  </template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.auth {

  &-wrapper {
    align-items: center;
    background-color: v.$background-color;
    display: flex;
    height: 100vh;
    justify-content: center;
  }

  &-container {
    background: v.$white;
    border-radius: 1.25em;
    box-shadow: 0 0 1.25em rgba(0, 0, 0, 0.05);
    padding: 3em 2em;
    text-align: center;
    width: 25em;
  }

  &-form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
}

.input-field {
  height: 2em;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 0 1rem;
  background-color: #fafafa;
}

.login-button {
  background-color: v.$main-blue;
  border: none;
  border-radius: 12px;
  color: v.$white;
  cursor: pointer;
  padding: 14px;
  transition: background-color 0.3s;
}

.forgot-password {
  cursor: pointer;
  margin-top: 1rem;
}
</style>
