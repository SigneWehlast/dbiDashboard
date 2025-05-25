import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/configs/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//funktionen eksporteres + der oprettes et pinia store
export const useObjectStore = defineStore('ObjectStore', () => {
  const objects = ref([]);
  const isError = ref(false);
  const isLoading = ref(false);

  async function fetchObjects() {
    isLoading.value = true;
    isError.value = false;

    const auth = getAuth();

    //tjekker om en bruger er logget ind, før dataen vises
    //promise gør, at der ventes på at login og data er klar før den afsluttes
    return new Promise((resolve) => {
      //lytter efter ændrigner i login
      onAuthStateChanged(auth, async (currentUser) => {
        if (!currentUser) {
          console.warn('No user logged in');
          isError.value = true;
          isLoading.value = false;
          return resolve();
        }

        try {
          //henter dataen fra Firestore, hvis en bruger er logget ind
          const querySnapshot = await getDocs(collection(db, 'objects'));
          objects.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            location: doc.data().location || '',
            object: doc.data().object || ''
          }));
        } catch (err) {
          console.error('Error while getting objects:', err);
          isError.value = true;
        } finally {
          isLoading.value = false;
          resolve();
        }
      });
    });
  };

  return {
    objects,
    isLoading,
    isError,
    fetchObjects
  };
});
