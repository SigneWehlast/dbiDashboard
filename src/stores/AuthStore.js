// src/stores/AuthStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    companyName: '',
    createdAt: null,
    email: '',
    firstName: '',
    lastName: '',
    uid: ''
  });

  // Funktion til at sætte brugerdata
  const setUser = (userData) => {
    user.value = userData;
  };

  // Funktion til at rydde brugerdata
  const clearUser = () => {
    user.value = {
      companyName: '',
      createdAt: null,
      email: '',
      firstName: '',
      lastName: '',
      uid: ''
    };
  };

  // Hent brugerdata fra Firestore
  const fetchUserData = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser(userSnap.data());
        console.log('Brugerdata hentet:', userSnap.data());
      } else {
        console.error('Bruger ikke fundet i databasen');
      }
    } catch (err) {
      console.error('Fejl ved hentning af brugerdata:', err);
    };
  };

  // Firebase Auth - overvåg loginstatus
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      console.log('Bruger er logget ind:', firebaseUser);
      fetchUserData(firebaseUser.uid); // Hent og opdater brugerdata ved login
    } else {
      console.log('Ingen bruger logget ind');
      clearUser(); // Tøm user-data hvis ingen bruger er logget ind
    }
  });

  return {
    user,
    setUser,
    clearUser,
    fetchUserData
  };
});
