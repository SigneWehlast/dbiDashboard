import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/configs/firebase';
import { collection,getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

//funktionen eksporteres + der oprettes et pinia store
export const useScheduleStore = defineStore('ScheduleStore', () => {
  //reaktive referencer
  const tasks = ref([]);
  const isLoading = ref(false);
  const isError = ref(false);

  //funktion der opretter en reaktiv værdi, hvor funktionen returnerer en ny værdi, når tasks.value ændrer sig
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
  //asynkron funktion med argumentet uid
  async function checkAndUpdateTaskStatus(uid) {
    const today = new Date();

    try {
      //henter data fra firestore, hvor uid matcher brugeren
      const q = query(collection(db, 'ScheduleForm'), where('uid', '==', uid));
      //venter på at hente alt der matcher 
      const querySnapshot = await getDocs(q);

      //går gennem alle skemaer og tjekker om de skal opdateres
      const updates = querySnapshot.docs.map(async (taskDoc) => {
        //henter data på skemaerne
        const task = taskDoc.data();

        if (task.status !== 'Udført' && task.deadline) {
          //laver deadline om til en dato, så det kan ses, om den er overskredet
          const deadlineDate = new Date(task.deadline);

          if (deadlineDate < today) {
            //opdaterer opgaven i firestore. Der ventes på, at den er opdateret før den går videre
            await updateDoc(doc(db, 'ScheduleForm', taskDoc.id), {
              status: 'Overskredet'
            });
          }
        }
      });

      //Venter på alle opdateringer er udført. Updates skal være afsluttet
      await Promise.all(updates);
    } catch (err) {
      console.error('Error with updating schedules to overdue:', err);
    }
  }

  //henter skemaer fra den bruger, der er logget ind
  async function fetchTasks() {
    isLoading.value = true;
    isError.value = false;

    //tjekker hvem der er logget ind
    const auth = getAuth();

    //tjekker om brugeren er logget ind
    return new Promise((resolve) => {
      //lytter på ændringer i login
      onAuthStateChanged(auth, async (currentUser) => {
        if (!currentUser) {
          console.warn('No user logged in');
          isError.value = true;
          isLoading.value = false;
          return resolve();
        }

        //gemmer brugeren der er logget ind i uid
        const uid = currentUser.uid;

        //henter dataen fra skemaerne fra Firestore til den bruger, der er tilknyttet skemaerne
        try {
          //opdaterer gamle skemaer til overskredet
          await checkAndUpdateTaskStatus(uid);

          //henter data fra firestore, hvor uid matcher brugeren
          const q = query(collection(db, 'ScheduleForm'), where('uid', '==', uid));
          //venter på at hente alt der matcher 
          const querySnapshot = await getDocs(q);

          //skemaerne laves om til objekter og gemmes i tasks
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
          console.error('Error while fetching tasks:', err);
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
