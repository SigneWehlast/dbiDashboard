import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/configs/firebase';
import { collection,getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useScheduleStore = defineStore('ScheduleStore', () => {
  const tasks = ref([]);
  const isLoading = ref(false);
  const isError = ref(false);

  const overdueTasks = computed(() =>
    tasks.value.filter(task => task.status === 'Overskredet')
  );

  //viser skeamer, der er overskredet i notifikationerne
  async function showOverdueNotifications(tasksList) {
    const overdue = tasksList.filter(t => t.status === 'Overskredet');

    if (overdue.length > 0) {
      const task = overdue[0];

      new Notification('Opgave overskredet!', {
        body: `Titel: ${task.title}\nDeadline: ${task.deadline}\nStatus: ${task.status}`,
        requireInteraction: true
      });
    }
  }

  //skift til overskredet, når en opgave ikke er udført den dag
  async function checkAndUpdateTaskStatuses(uid) {
    const today = new Date();

    try {
      const q = query(collection(db, 'ScheduleForm'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);

      const updates = querySnapshot.docs.map(async (taskDoc) => {
        const task = taskDoc.data();

        if (task.status !== 'Udført' && task.deadline) {
          const deadlineDate = new Date(task.deadline);

          if (deadlineDate < today) {
            await updateDoc(doc(db, 'ScheduleForm', taskDoc.id), {
              status: 'Overskredet',
            });
          }
        }
      });

      await Promise.all(updates);
    } catch (err) {
      console.error('Fejl ved opdatering af overskredne opgaver:', err);
    }
  }

  async function fetchTasks() {
    isLoading.value = true;
    isError.value = false;

    const auth = getAuth();

    //tjekke om brugeren er logget ind
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (!currentUser) {
          console.warn('Ingen bruger er logget ind.');
          isError.value = true;
          isLoading.value = false;
          return resolve();
        }

        const uid = currentUser.uid;

        //henter dataen fra skemaerne fra Firestore til den bruger, der er på skemaerne
        try {
          await checkAndUpdateTaskStatuses(uid);

          const q = query(collection(db, 'ScheduleForm'), where('uid', '==', uid));
          const querySnapshot = await getDocs(q);

          tasks.value = querySnapshot.docs.map(doc => ({
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
            userId: doc.data().userId || '',
            object: doc.data().object || ''
          }));

          await showOverdueNotifications(tasks.value);

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
    overdueTasks
  };
});
