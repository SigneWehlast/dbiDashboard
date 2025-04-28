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
    <div class="auth-container">
      <h2>Opret bruger</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="firstName">Fornavn:</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div class="input-group">
          <label for="lastName">Efternavn:</label>
          <input type="text" v-model="lastName" required />
        </div>
        <div class="input-group">
          <label for="companyName">Firmanavn:</label>
          <input type="text" v-model="companyName" />
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Adgangskode:</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Bekræft adgangskode:</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
        <button type="submit" class="btn">Opret bruger</button>
        <p @click="goToLogin" class="toggle-text">Har du allerede en konto? Log ind her.</p>
      </form>
    </div>
  </template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 25px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: white;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  background-color: rgba(255, 255, 255, 0.4);
}

.btn {
  width: 100%;
  padding: 12px;
  background-color: #ff6b6b;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn:hover {
  background-color: #ff4757;
}

.toggle-text {
  margin-top: 15px;
  cursor: pointer;
  font-size: 14px;
  color: #f8f8f8;
}

.toggle-text:hover {
  text-decoration: underline;
}
</style>
