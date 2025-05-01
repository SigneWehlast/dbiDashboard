import { defineStore } from 'pinia';
import { ref } from 'vue';
import { db } from '@/configs/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useObjectStore = defineStore('ObjectStore', () => {
  const objects = ref([]);
  const isError = ref(false);
  const isLoading = ref(false);

  async function fetchObjects() {
    isLoading.value = true;
    isError.value = false;

    const auth = getAuth();

    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (!currentUser) {
          console.warn('Ingen bruger er logget ind.');
          isError.value = true;
          isLoading.value = false;
          return resolve();
        }

        try {
          const querySnapshot = await getDocs(collection(db, 'objects'));
          objects.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            location: doc.data().location || '',
            object: doc.data().object || ''
          }));
        } catch (err) {
          console.error('Fejl ved hentning af objekter:', err);
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
