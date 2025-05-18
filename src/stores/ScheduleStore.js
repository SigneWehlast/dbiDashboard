import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/configs/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useScheduleStore = defineStore('ScheduleStore', () => {
  const tasks = ref([]);
  const isLoading = ref(false);
  const isError = ref(false);

  const overskredneTasks = computed(() =>
    tasks.value.filter(task => task.status === 'Overskredet')
  );

  // Brug Notification API direkte (uden service worker)
  async function showOverskredneNotifications(tasksList) {
    if (!('Notification' in window)) {
      console.warn('Browseren understøtter ikke Notification API.');
      return;
    }

    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    if (permission !== 'granted') {
      console.warn('Notifikationstilladelse ikke givet.');
      return;
    }

    const overskredne = tasksList.filter(t => t.status === 'Overskredet');

    if (overskredne.length > 0) {
      const task = overskredne[0];

      new Notification('Opgave overskredet!', {
        body: `Titel: ${task.title}\nDeadline: ${task.deadline}\nStatus: ${task.status}`,
        icon: '/icons/icon-192.png',
        requireInteraction: true
      });
    }
  }

  // Funktion til at hente opgaver
  async function fetchTasks() {
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

        const uid = currentUser.uid;

        try {
          const querySnapshot = await getDocs(collection(db, 'ScheduleForm'));
          tasks.value = querySnapshot.docs
            .filter(doc => doc.data().uid === uid)
            .map(doc => ({
              id: doc.id,
              title: doc.data().title || '',
              deadline: doc.data().deadline || '',
              status: doc.data().status || '',
              createdAt: doc.data().createdAt?.toDate() || null,
              errorComment: doc.data().errorComment || '',
              errorStatus: doc.data().errorStatus || '',
              systemComment: doc.data().systemComment || '',
              systemStatus: doc.data().systemStatus || '',
              uid: doc.data().uid || '',
              object: doc.data().object || ''
            }));

          // Vis notifikation for én overskredet opgave
          await showOverskredneNotifications(tasks.value);

        } catch (err) {
          console.error('Fejl ved hentning af tasks:', err);
          isError.value = true;
        } finally {
          isLoading.value = false;
          resolve();
        }
      });
    });
  }

  return {
    tasks,
    isLoading,
    isError,
    fetchTasks,
    overskredneTasks
  };
});
