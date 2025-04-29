// src/utils/firebaseUtils.js
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import { useAuthStore } from '@/stores/AuthStore';

export const fetchUserData = async (uid) => {
  const authStore = useAuthStore();
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      authStore.setUser(userSnap.data());
      console.log('Brugerdata hentet:', userSnap.data());
    } else {
      console.error('Bruger ikke fundet i databasen');
    }
  } catch (err) {
    console.error('Fejl ved hentning af brugerdata:', err);
  }
};